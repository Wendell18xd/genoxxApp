import {useEffect, useState} from 'react';
import {Foto} from '../../../../../../domain/entities/Foto';
import {useCamera} from '../../../../foto/hooks/useCamera';
import {useFotosStore} from '../../../../foto/store/useFotosStore';
import {format} from 'date-fns';
import {FormikHelpers, FormikProps} from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import {grabarFotosMaterialesObras} from '../../../../../../actions/gestionObras/fotos.obras';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {validarGpsActivo} from '../../../../../helper/checkGPS';
import {useLocationStore} from '../../../../../store/location/useLocationStore';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useObrasStore} from '../../../store/useObrasStore';
import {Keyboard} from 'react-native';

export interface initialValuesProps {
  nro_guia: string;
  fecha_ejecucion: string;
  hora_ejecucion: string;
  fotos: Foto[];
}

const initialValues: initialValuesProps = {
  nro_guia: '',
  fecha_ejecucion: format(new Date(), 'yyyy-MM-dd'),
  hora_ejecucion: format(new Date(), 'HH:mm'),
  fotos: [],
};

export const useDetalleMaterialesCampoScreen = (
  formikRef: React.RefObject<FormikProps<initialValuesProps> | null>,
) => {
  const {fotos, handleDelete, isRendering, handleCamera} = useCamera();
  const {onReset: onResetFotos, setInitialParams, setFotos} = useFotosStore();
  const [visible, setVisible] = useState(false);
  const [indexSeleccionado, setIndexSeleccionado] = useState(0);
  const [formValues, setFormValues] = useState(initialValues);
  const navigation = useNavigation();
  const {getLocation} = useLocationStore();
  const {user} = useAuthStore();
  const {obra} = useObrasStore();
  const [isSaving, setIsSaving] = useState(false);

  const getValidationSchema = () =>
    Yup.object().shape({
      nro_guia: Yup.string().required('Ingrese el número de guía'),
      fecha_ejecucion: Yup.string().required(
        'Seleccione una fecha de ejecución',
      ),
      hora_ejecucion: Yup.string().required('Ingrese la hora de ejecución'),
    });

  const abrirVisor = (index: number) => {
    setIndexSeleccionado(index);
    setVisible(true);
  };

  const syncFotosWithFormik = () => {
    const setFieldValue = formikRef?.current?.setFieldValue;
    if (setFieldValue) {
      setFieldValue('fotos', fotos);
    }
  };

  const handleDeleteFoto = (
    index: number,
    values: initialValuesProps,
    setFieldValue: FormikHelpers<initialValuesProps>['setFieldValue'],
  ) => {
    const nuevas = [...values.fotos];
    nuevas.splice(index, 1);
    setFieldValue('fotos', nuevas);
    handleDelete(index);
  };

  const handleChangeDescriptionFoto = (
    index: number,
    values: initialValuesProps,
    text: string,
    setFieldValue: FormikHelpers<initialValuesProps>['setFieldValue'],
  ) => {
    const nuevas = [...values.fotos];
    nuevas[index] = {
      ...nuevas[index],
      comentario: text,
    };
    setFieldValue('fotos', nuevas);
    setFotos(nuevas);
  };

  const mutation = useMutation({
    mutationFn: grabarFotosMaterialesObras,
    onSuccess: data => {
      const {datos: estado, mensaje} = data;

      if (estado === 1) {
        Toast.show({
          type: 'success',
          text1: 'Material Recepcionado correctamente',
        });

        //* Navego hacia atras desde la pantalla de camara
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error al recepcionar material',
          text2: mensaje,
        });
      }
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Error al recepcionar material',
        text2: error.message,
      });
    },
  });

  const handleSaveMaterialesCampo = async (values: initialValuesProps) => {
    setIsSaving(true);
    Keyboard.dismiss();
    try {
      const gpsActivo = await validarGpsActivo();
      if (!gpsActivo) {
        setIsSaving(false);
        return;
      }
      const location = await getLocation();
      mutation.mutateAsync(
        {
          vg_empr_codigo: user?.empr_codigo || '',
          vg_usua_codigo: user?.usua_codigo || '',
          vl_regi_codigo: obra?.regi_codigo || '',
          vl_coord_x: location?.latitude.toString() || '',
          vl_coord_y: location?.longitude.toString() || '',
          vl_tipo_archivo: 'TD06',
          vl_origen_archivo: '',
          vl_fotos: values.fotos.map(foto => foto.foto),
          vl_fotos_comentarios: values.fotos.map(foto => foto.comentario),
          vl_nro_guia: values.nro_guia,
        },
        {
          onSettled: () => setIsSaving(false),
        },
      );
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  useEffect(() => {
    setInitialParams({
      minFotos: 1,
      maxFotos: 50,
    });
    setFormValues(prev => ({
      ...prev,
      fecha_ejecucion: format(new Date(), 'yyyy-MM-dd'),
      hora_ejecucion: format(new Date(), 'HH:mm'),
    }));
  }, []);

  useEffect(() => {
    syncFotosWithFormik();
  }, [fotos]);

  return {
    //* Propiedades
    initialValues: formValues,
    isRendering,
    visible,
    indexSeleccionado,
    isSaving,

    //* Metodos
    getValidationSchema,
    handleCamera,
    onResetFotos,
    abrirVisor,
    setVisible,
    handleDeleteFoto,
    handleChangeDescriptionFoto,
    handleSaveMaterialesCampo,
  };
};
