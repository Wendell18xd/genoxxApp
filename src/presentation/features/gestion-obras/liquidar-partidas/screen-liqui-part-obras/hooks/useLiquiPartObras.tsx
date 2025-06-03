import * as Yup from 'yup';
import {useActividadPartidaStore} from '../../../../buscadores/buscador-actividad-partida/store/useActividadPartidaStore';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LiquiPartObrasStackParam} from '../../navigations/LiquiPartObrasStackNavigation';
import {useObrasStore} from '../../../store/useObrasStore';
import {useMainStore} from '../../../../../store/main/useMainStore';
import {Menu} from '../../../../../../types/menus';
const initialValues = {
  fecha_liquidacion: new Date().toISOString().slice(0, 10),
  cod_actividad: '',
  actividad: '',
  cantidad: '',
  observacion: '',
};

export const useLiquiPartObras = () => {
  const {setOnSelect, setInitialValues, reset} = useActividadPartidaStore();
  const {obra} = useObrasStore();
  const navigation = useNavigation<NavigationProp<LiquiPartObrasStackParam>>();
  const {drawerKey} = useMainStore();
  const txt_tipo =
    drawerKey === Menu.LIQUIDACION_PARTIDAS_OBRAS_ENERGIA ? 'ENERGIA' : '';

  const getValidationSchema = () =>
    Yup.object().shape({
      fecha_liquidacion: Yup.string().required('Seleccione una fecha'),
      actividad: Yup.string().required('Seleccione una actividad'),
      cantidad: Yup.number().required('Ingrese una cantidad'),
    });

  const handleSelectActividad = (
    actividad: string,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    if (actividad && actividad.length > 0) {
      setFieldValue('actividad', '');
      setFieldValue('cod_actividad', '');
      reset();
    } else {
      setOnSelect(item => {
        setFieldValue('actividad', `${item.cod_para} - ${item.nom_para}`);
        setFieldValue('cod_actividad', `${item.cod_para}`);
      });
      setInitialValues({
        vl_regi_codigo: obra?.regi_codigo || '',
        vl_part_negocio: obra?.proy_codigo || '',
        vl_tipo: txt_tipo,
      });
      navigation.navigate('BuscadorActividadPartidaScreen');
    }
  };

  const handleSavePartida = (values: any, resetForm: any) => {
    console.log(values);
    resetForm();
  };

  return {
    //* Propiedades
    initialValues,
    //* Metodos
    getValidationSchema,
    handleSavePartida,
    handleSelectActividad,
  };
};
