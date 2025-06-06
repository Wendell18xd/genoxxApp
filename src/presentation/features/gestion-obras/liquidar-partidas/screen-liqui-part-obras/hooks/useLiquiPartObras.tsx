import * as Yup from 'yup';
import {useActividadPartidaStore} from '../../../../buscadores/buscador-actividad-partida/store/useActividadPartidaStore';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useObrasStore} from '../../../store/useObrasStore';
import {useMainStore} from '../../../../../store/main/useMainStore';
import {Menu} from '../../../../../../types/menus';
import {sanitizarDecimalInput} from '../../../../../helper/inputUtils';
import {useMutation} from '@tanstack/react-query';
import {grabarPartidaObras} from '../../../../../../actions/obras/partidas.obras';
import Toast from 'react-native-toast-message';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {obtenerMesYAnio} from '../../../../../helper/timeUtils';
import {useLiquiPartStore} from '../../store/useLiquiPartStore';
import {useRef} from 'react';
import { LiquidacionObrasStackParam } from '../../../navigations/LiquidacionObrasStackNavigation';

const initialValues = {
  fecha_liquidacion: new Date().toISOString().slice(0, 10),
  cod_actividad: '',
  actividad: '',
  cantidad: '',
  observacion: '',
  dificultad: '',
};

const mapUnidadesMedida = {
  U: 'U - URBANO',
  UD: 'UD - URBANO CON DIFICULTAD',
  R: 'R - RURAL',
  RD: 'RD - RURAL CON DIFICULTAD',
};

export const useLiquiPartObras = () => {
  const {setOnSelect, setInitialValues, reset} = useActividadPartidaStore();
  const {setIsRefetchLiquidacion} = useLiquiPartStore();
  const {obra} = useObrasStore();
  const {user} = useAuthStore();
  const navigation = useNavigation<NavigationProp<LiquidacionObrasStackParam>>();
  const {drawerKey} = useMainStore();
  const resetFormRef = useRef<() => void>(() => {});
  const txt_tipo =
    drawerKey === Menu.LIQUIDACION_PARTIDAS_OBRAS_ENERGIA ? 'ENERGIA' : '';

  const getValidationSchema = () =>
    Yup.object().shape({
      fecha_liquidacion: Yup.string().required('Seleccione una fecha'),
      actividad: Yup.string().required('Seleccione una actividad'),
      cantidad: Yup.number().required('Ingrese una cantidad'),
    });

  const handleChangeCantidad = (
    text: string,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    let valorLimpio = sanitizarDecimalInput(text, 2);
    setFieldValue('cantidad', valorLimpio);
  };

  const handleSelectActividad = (
    actividad: string,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    if (actividad && actividad.length > 0) {
      setFieldValue('actividad', '');
      setFieldValue('cod_actividad', '');
      setFieldValue('dificultad', '');
      reset();
    } else {
      setOnSelect(item => {
        setFieldValue('actividad', `${item.cod_para} - ${item.nom_para}`);
        setFieldValue('cod_actividad', `${item.cod_para}`);
        setFieldValue('dificultad', `${item.dificultad}`);
      });
      setInitialValues({
        vl_regi_codigo: obra?.regi_codigo || '',
        vl_part_negocio: obra?.proy_codigo || '',
        vl_tipo: txt_tipo,
      });
      navigation.navigate('BuscadorActividadPartidaScreen');
    }
  };

  const mutation = useMutation({
    mutationFn: grabarPartidaObras,
    onSuccess: data => {
      const {datos: estado, mensaje} = data;

      if (estado === 1) {
        Toast.show({
          type: 'success',
          text1: 'Partida grabada correctamente',
        });
        setIsRefetchLiquidacion(true);
        resetFormRef.current();
      } else if (estado === 2) {
        Toast.show({
          type: 'error',
          text1: 'La partida no tiene cantidad proyectada',
          text2: mensaje,
        });
      } else if (estado === 4) {
        Toast.show({
          type: 'error',
          text1:
            'Tu usuario no cuenta con código de trabajador. Comunicarlo a sistemas.',
          text2: mensaje,
        });
      } else if (estado === 3) {
        Toast.show({
          type: 'error',
          text1: 'La cantidad ingresada excede el presupuesto.',
          text2: mensaje,
        });
      } else if (estado === 9) {
        Toast.show({
          type: 'error',
          text1: 'Periodo se encuentra cerrado. Intente en otro periodo',
          text2: mensaje,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error al grabar la partida',
          text2: mensaje,
        });
      }
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Error al grabar la partida',
        text2: error.message,
      });
    },
  });

  const handleSavePartida = async (
    values: typeof initialValues,
    resetForm: () => void,
  ) => {
    resetFormRef.current = resetForm;
    mutation.mutate({
      vg_empr_codigo: user?.empr_codigo || '',
      vg_usua_codigo: user?.usua_codigo || '',
      vl_regi_codigo: obra?.regi_codigo || '',
      vl_fecha_produccion: values.fecha_liquidacion,
      vl_mes_obra_ind: obtenerMesYAnio(values.fecha_liquidacion).mes,
      vl_anno_obra_ind: obtenerMesYAnio(values.fecha_liquidacion).anio,
      vl_tipo_perfil: user?.usua_tipo || '',
      vl_codi_perfil: user?.usua_perfil || '',
      vl_cod_trabajo: values.cod_actividad,
      vl_can_trabajo: values.cantidad,
      vl_observacion: values.observacion,
      vl_dificultad: values.dificultad,
      vl_tipo_obra: txt_tipo,
    });
  };

  return {
    //* Propiedades
    initialValues,
    mutation,
    mapUnidadesMedida,
    txt_tipo,

    //* Metodos
    getValidationSchema,
    handleSavePartida,
    handleSelectActividad,
    handleChangeCantidad,
  };
};
