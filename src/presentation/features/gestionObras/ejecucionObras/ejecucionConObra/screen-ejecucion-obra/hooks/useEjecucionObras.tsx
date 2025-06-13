import {FormikErrors} from 'formik';
import {useRef, useState} from 'react';
import {Option} from 'react-native-paper-dropdown';
import {useEjecucionObrasStore} from '../../../store/useEjecucionObrasStore';
import {mapToDropdown} from '../../../../../../../infrastructure/mappers/mapToDropdown';
import {useObrasStore} from '../../../../store/useObrasStore';
import {sanitizarDecimalInput} from '../../../../../../helper/inputUtils';
import {useFotosStore} from '../../../../../foto/store/useFotosStore';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LiquidacionObrasStackParam} from '../../../../navigations/LiquidacionObrasStackNavigation';
import {ToastNativo} from '../../../../../../helper/utils';
import {useLocationStore} from '../../../../../../store/location/useLocationStore';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {saveObraEjecutada} from '../../../../../../../actions/gestionObras/ejecucion.obras';
import Toast from 'react-native-toast-message';
import {useAuthStore} from '../../../../../../store/auth/useAuthStore';
import * as Yup from 'yup';
import {Obra} from '../../../../../../../domain/entities/Obra';

interface initialParams {
  tipo_registro: string;
  agrupacion: string;
  actividad: string;
  tramo: string;
  cantidad: number;
  comentario: string;
  cierre: string;
}

const initialValues: initialParams = {
  actividad: '',
  agrupacion: '',
  tipo_registro: '',
  cantidad: 0,
  comentario: '',
  tramo: '',
  cierre: '',
};

export const useEjecucionObras = () => {
  const {obra} = useObrasStore();
  const {actividades, mapDropFamilia} = useEjecucionObrasStore();
  const {fotos, setInitialParams} = useFotosStore();
  const [mapDropSubFamilia, setMapDropSubFamilia] = useState<Option[]>([]);
  const [mapDropActividad, setMapDropActividad] = useState<Option[]>([]);
  const [medida, setMedida] = useState('');
  const navigation =
    useNavigation<NavigationProp<LiquidacionObrasStackParam>>();
  const {getLocation} = useLocationStore();
  const {user} = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();
  const valuesFormik = useRef<initialParams>(initialValues);

  const getValidationSchema = () =>
    Yup.object().shape({
      tipo_registro: Yup.string().required('Seleccione el tipo de registro'),
      agrupacion: Yup.string().required('Seleccione la agrupación'),
      actividad: Yup.string().required('Seleccione una actividad'),
      comentario: Yup.string().required('Ingrese un comentario'),
    });

  const handelSelectedDropDown = (
    param: string,
    value: string | undefined,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => Promise<void | FormikErrors<initialParams>>,
    values: initialParams,
  ) => {
    if (param === 'tipo_registro') {
      const filtrarSubFamilia = actividades?.subfamilia.filter(
        item => item.familia === value,
      );
      if (filtrarSubFamilia) {
        setMapDropSubFamilia(
          mapToDropdown(filtrarSubFamilia, 'subfamilia', 'subfamilia'),
        );
        setMapDropActividad([]);
        setFieldValue('agrupacion', '');
        setFieldValue('actividad', '');
        setMedida('');
      }
    }

    if (param === 'agrupacion') {
      const filtrarActividad = actividades?.actividades_orden.filter(
        item =>
          item.familia === values.tipo_registro &&
          item.subfamilia === value &&
          item.cont_campo05 === obra?.proy_codigo,
      );
      if (filtrarActividad) {
        setMapDropActividad(
          mapToDropdown(filtrarActividad, 'cont_campo01', 'cont_parametro'),
        );
      }
    }

    if (param === 'actividad') {
      const filtrarActividad = actividades?.actividades_orden.find(
        item => item.cont_parametro === value,
      );
      if (filtrarActividad) {
        setMedida(filtrarActividad.medida);
        setFieldValue('cierre', filtrarActividad.cont_campo06);
      }
    }

    setFieldValue(param, value);
  };

  const handleChangeCantidad = (
    text: string,
    setFieldValue: (field: string, value: any) => void,
    param: string,
  ) => {
    setFieldValue(param, sanitizarDecimalInput(text, 2));
  };

  const handleCamera = () => {
    setInitialParams({
      maxFotos: 3,
      minFotos: 1,
    });
    navigation.navigate('CustomCameraScreen');
  };

  const mutation = useMutation({
    mutationFn: saveObraEjecutada,
    onSuccess: data => {
      const {estado, mensaje} = data;
      if (estado === 1) {
        Toast.show({
          type: 'success',
          text1: 'Se registro correctamente',
        });

        if (valuesFormik.current.cierre === 'CIERRE') {
          queryClient.setQueryData<Obra[]>(['obrasAsignadas'], oldData => {
            if (!oldData) {
              return oldData;
            }

            return oldData.map(item =>
              item.regi_codigo === obra?.regi_codigo
                ? {...item, estado_ejecucion: '1'}
                : item,
            );
          });
        }

        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error al grabar',
          text2: mensaje,
        });
      }
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Error al grabar',
        text2: error.message,
      });
    },
  });

  const handleSave = async (values: initialParams) => {
    const arrFotos = fotos.map(foto => foto.foto);

    if (arrFotos.length < 1) {
      ToastNativo({
        titulo: 'Fotos obligatorias',
        mensaje: 'Debe capturar al menos 1 foto',
      });
      return;
    }

    try {
      setIsSaving(true);
      const location = await getLocation();

      if (!location) {
        setIsSaving(false);
        return;
      }

      valuesFormik.current = values;
      mutation.mutate(
        {
          vg_empr_codigo: user?.empr_codigo || '',
          vg_usua_perfil: user?.usua_perfil || '',
          vl_cantidad: values?.cantidad.toString() || '',
          vl_obse_ejecutado: values.comentario,
          vl_cierre: values?.cierre || '',
          vl_cod_actividad: values?.actividad || '',
          vl_regi_codigo: obra?.regi_codigo || '',
          vl_tramo: values?.tramo || '',
          vl_coord_x: location?.latitude.toString() || '',
          vl_coord_y: location?.longitude.toString() || '',
          vl_fotos: arrFotos,
        },
        {onSettled: () => setIsSaving(false)},
      );
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  return {
    //* Propiedades
    initialValues,
    mapDropFamilia,
    mapDropSubFamilia,
    mapDropActividad,
    medida,
    isSaving,
    cantidadFotos: fotos.length,

    //* Metodos
    handelSelectedDropDown,
    handleChangeCantidad,
    handleSave,
    handleCamera,
    getValidationSchema,
  };
};
