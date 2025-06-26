import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import {EjecucionObrasStackParam} from '../../navigations/EjecucionObrasStackNavigation';
import {ListarConsultaEjecucionRequest} from '../../../../../infrastructure/interfaces/gestionObras/consultarEjecucion/listarConsultaEjecucion.request';
import {useRef} from 'react';
import * as Yup from 'yup';
import {useQuery} from '@tanstack/react-query';
import {getlistarConsultaEjecucion} from '../../../../../actions/gestionObras/consultaEjecucion.obras';
import { Option } from 'react-native-paper-dropdown';

interface SearchConsultaEjecucionFormValues {
  txt_fecha_inicio: string;
  txt_fecha_final: string;
  cbo_elegido: string;
}

const initialValues: SearchConsultaEjecucionFormValues = {
  txt_fecha_inicio: new Date().toISOString().slice(0, 10),
  txt_fecha_final: new Date().toISOString().slice(0, 10),
  cbo_elegido: '',
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

  const filtrosRef = useRef<ListarConsultaEjecucionRequest>({
    vg_empr_codigo: user?.empr_codigo || '',
    txt_fecha_inicio: '',
    txt_fecha_final: '',
    vl_codi_perfil: user?.usua_perfil || '',
    cbo_elegido: '0',
    txt_buscar: '',
    txt_actividad: '',
    txt_hora: '',
  });

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
      const {datos} = await getlistarConsultaEjecucion(filtrosRef.current);
      return datos;
    },
    enabled: false,
  });

  const handleSearch = (
    values: SearchConsultaEjecucionFormValues,
    onClose?: () => void,
  ) => {
    const nuevosFiltros: ListarConsultaEjecucionRequest = {
      ...filtrosRef.current,
      txt_fecha_inicio: values.txt_fecha_inicio,
      txt_fecha_final: values.txt_fecha_final,
    };
    filtrosRef.current = nuevosFiltros;
    refetchConsultarEjecucion();
    onClose?.();
  };

  return {
    //*Propiedades
    initialValues,
    ejecucion,
    isFetchConsultarEjecucion,
    errorConsultarEjecucion,
    tiposItem,

    //*Metodos
    filtrosRef,
    getValidationSchema,
    refetchConsultarEjecucion,
    handleSearch,
    navigation,
  };
};
