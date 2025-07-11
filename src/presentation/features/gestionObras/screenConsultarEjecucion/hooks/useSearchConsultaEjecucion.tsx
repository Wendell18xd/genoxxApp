import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import {EjecucionObrasStackParam} from '../../navigations/EjecucionObrasStackNavigation';
import {ListarConsultaEjecucionRequest} from '../../../../../infrastructure/interfaces/gestionObras/consultarEjecucion/listarConsultaEjecucion.request';
import {useRef} from 'react';
import * as Yup from 'yup';
import {useQuery} from '@tanstack/react-query';
import {
  getlistarConsultaEjecucion,
  listadoProyectosObras,
  listarActividadesObras,
} from '../../../../../actions/gestionObras/consultaEjecucion.obras';
import {Option} from 'react-native-paper-dropdown';
import {mapToDropdown} from '../../../../../infrastructure/mappers/mapToDropdown';
import {ConsultaEjecucion} from '../../../../../domain/entities/ConsultaEjecucion';
import {useConsultaEjecucionStore} from '../../store/useConsultaEjecucionStore';

interface SearchConsultaEjecucionFormValues {
  txt_fecha_inicio: string;
  txt_fecha_final: string;
  cbo_elegido: string;
  vl_proy_tipo?: string; // Opcional para proyectos
  txt_buscar: '';
  txt_actividad: '';
  txt_hora: '';
}

const initialValues: SearchConsultaEjecucionFormValues = {
  txt_fecha_inicio: new Date().toISOString().slice(0, 10),
  txt_fecha_final: new Date().toISOString().slice(0, 10),
  cbo_elegido: '',
  vl_proy_tipo: '',
  txt_buscar: '',
  txt_actividad: '',
  txt_hora: '',
};

const tiposItem: Option[] = [
  {
    label: 'NRO ORDEN',
    value: 'NR01',
  },
  {
    label: 'NRO ORDEN2',
    value: 'NR02',
  },
  {
    label: 'ACTIVIDAD',
    value: 'ACTI',
  },
  {
    label: 'HORA',
    value: 'HORA',
  },
  {
    label: 'COMENTARIO',
    value: 'OBS',
  },
];

export const useSearchConsultaEjecucion = () => {
  const {user} = useAuthStore();
  const navigation = useNavigation<NavigationProp<EjecucionObrasStackParam>>();
  const {setConsulta} = useConsultaEjecucionStore();

  const filtrosRef = useRef<ListarConsultaEjecucionRequest>({
    vg_empr_codigo: user?.empr_codigo || '',
    txt_fecha_inicio: '',
    txt_fecha_final: '',
    vl_codi_perfil: user?.usua_perfil || '',
    cbo_elegido: '',
    txt_buscar: '',
    txt_actividad: '',
    txt_hora: '',
  });

  // const actividadesRef = useRef<ListarActividadesRequest>({
  //   vg_empr_pais: user?.empr_pais || '',
  // });

  const getValidationSchema = () =>
    Yup.object().shape({
      txt_fecha_inicio: Yup.string().required('Seleccione una fecha'),
      txt_fecha_final: Yup.string()
        .required('Seleccione una fecha')
        .test(
          'is-after',
          "La fecha 'Final' no puede ser menor que la fecha 'Inicio'",
          function (value) {
            const {txt_fecha_inicio} = this.parent;
            if (!value || !txt_fecha_inicio) {
              return true;
            }
            return new Date(value) >= new Date(txt_fecha_inicio);
          },
        ),
    });
  const {
    data: ejecucion,
    isFetching: isFetchConsultarEjecucion,
    refetch: refetchConsultarEjecucion,
    error: errorConsultarEjecucion,
  } = useQuery({
    queryKey: ['consultarEjecucion'],
    queryFn: async () => {
      console.log('Consultando con filtros:', filtrosRef.current);
      const {datos} = await getlistarConsultaEjecucion(filtrosRef.current);
      console.log('Datos devueltos por API:', datos);
      return datos;
    },
    enabled: false,
  });

  const {
    data: proyectos,
    isFetching: isFetchProyectos,
    refetch: refetchProyectos,
    error: errorProyectos,
  } = useQuery({
    queryKey: ['proyectos'],
    queryFn: async () => {
      const {datos} = await listadoProyectosObras({
        vl_empr_codigo: user?.empr_codigo || '',
        vl_proy_tipo: 'OBRAS',
      });
      const options = mapToDropdown(datos, 'proy_alias', 'proy_codigo');
      return options;
    },
  });

  const {data: actividadesData, isFetching: isFetchActividades} = useQuery({
    queryKey: ['actividades'],
    queryFn: async () =>
      listarActividadesObras({vg_empr_pais: user?.empr_pais || ''}),
  });

  const handleSearch = (
    values: SearchConsultaEjecucionFormValues,
    onClose?: () => void,
  ) => {
    const filtros: ListarConsultaEjecucionRequest = {
      vg_empr_codigo: user?.empr_codigo || '',
      vl_codi_perfil: user?.usua_perfil || '',
      txt_fecha_inicio: values.txt_fecha_inicio,
      txt_fecha_final: values.txt_fecha_final,
      cbo_elegido: values.cbo_elegido || '0',
      txt_buscar: values.txt_buscar ?? '',
      txt_actividad: values.txt_actividad ?? '',
      txt_hora: values.txt_hora ?? '',
    };

    console.log('📤 Filtros enviados desde handleSearch (limpios):', filtros);

    filtrosRef.current = filtros;
    refetchConsultarEjecucion();
    onClose?.();
  };

  const handleSelectConsultaEjecucion = (item: ConsultaEjecucion) => {
    if (item.nro_orden !== '') {
      setConsulta(item);
      navigation.navigate('SegmentedButtonsDetalleConsulta', {
        SegmentedButtonsDetalleConsulta: item,
      });
    }
    console.log(item.nro_orden);
  };

  return {
    //*Propiedades
    initialValues,
    ejecucion,
    isFetchConsultarEjecucion,
    errorConsultarEjecucion,
    tiposItem,
    proyectos,
    isFetchProyectos,
    errorProyectos,
    isFetchActividades,
    originalActividades: actividadesData?.actividades_orden || [],

    //*Metodos
    filtrosRef,
    getValidationSchema,
    refetchConsultarEjecucion,
    handleSearch,
    navigation,
    refetchProyectos,
    handleSelectConsultaEjecucion,
  };
};
