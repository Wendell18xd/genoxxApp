
import {useRef} from 'react';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {ConsultaHistoricaPatenteRequest} from '../../../../../../infrastructure/interfaces/flota/consultaHistoricaPatente/consultaHistoricaPatente.request';
import {useQuery} from '@tanstack/react-query';
import {getConsultaHistoricaPatente} from '../../../../../../actions/flota/consultaHistoricaPatente';
import { Option } from 'react-native-paper-dropdown';

interface SearchConsultaHistoricaFormValues {
  txt_codigo: string;
  cbo_bus_tipo: string;
  txt_cod_destinatario: string;
}

const initialValues: SearchConsultaHistoricaFormValues = {
  txt_codigo: '',
  cbo_bus_tipo: '',
  txt_cod_destinatario: '',
};

const tiposBusqueda: Option[] = [
  {
    label: 'Patente',
    value: 'PLACA',
  },
  {
    label: 'Conductor',
    value: 'PERS',
  },
];

export const useSearchConsultaHistoricaPatente = () => {
  const {user} = useAuthStore();

  const filtrosRef = useRef<ConsultaHistoricaPatenteRequest>({
    vl_empr_codigo: user?.empr_codigo || '',
    txt_codigo: '',
    cbo_bus_tipo: '',
    txt_cod_destinatario: '',
  });

  const {
    data: consultaHistoricaPatente,
    isFetching: isFetchConsultaHistoricaPatente,
    refetch: refetchConsultaHistoricaPatente,
    error: errorConsultaHistoricaPatente,
  } = useQuery({
    queryKey: ['consultaHistoricaPatente'],
    queryFn: async () => {
      const {datos} = await getConsultaHistoricaPatente(filtrosRef.current);
      return datos;
    },
    enabled: false,
  });

  const handleSearch = (
    values: SearchConsultaHistoricaFormValues,
    onClose?: () => void,
  ) => {
    const nuevosFiltros: ConsultaHistoricaPatenteRequest = {
      ...filtrosRef.current,
      txt_codigo: values.txt_codigo.trim().toUpperCase(),
      cbo_bus_tipo: values.cbo_bus_tipo,
      txt_cod_destinatario: values.txt_cod_destinatario,
    };
    filtrosRef.current = nuevosFiltros;
    refetchConsultaHistoricaPatente();
    onClose?.();
  };

  return {
    //* Propiedades
    tiposBusqueda,
    initialValues,
    consultaHistoricaPatente,
    isFetchConsultaHistoricaPatente,
    errorConsultaHistoricaPatente,

    //* Metodos
    handleSearch,
    refetchConsultaHistoricaPatente,
  };
};
