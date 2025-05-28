import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import {ConsultaHistoricaPatenteStackParam} from '../../../flota/consultaHistoricaPatente/navigations/ConsultaHistoricaPatenteStackNavigation';
import {ConsultaHistoricaPatenteRequest} from '../../../../../infrastructure/interfaces/flota/consultaHistoricaPatente/consultaHistoricaPatente.request';
import {useRef} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getConsultaHistoricaPatente} from '../../../../../actions/flota/consultaHistoricaPatente';
import {ConsultaHistoricaPatente} from '../../../../../domain/entities/ConsultaHistoricaPatente';

interface SearchPatenteFormValues {
  txt_codigo: string;
}

const initialValues: SearchPatenteFormValues = {
  txt_codigo: '',
};

export const useSearchPatente = () => {
  const {user} = useAuthStore();
  const navigation =
    useNavigation<NavigationProp<ConsultaHistoricaPatenteStackParam>>();

  const filtrosRef = useRef<ConsultaHistoricaPatenteRequest>({
    vl_empr_codigo: user?.empr_codigo || '',
    txt_codigo: '',
    cbo_bus_tipo: '',
    txt_cod_destinatario: '',
  });

  const {
    data: consultaPatente,
    isFetching: isFetchConsultaPatente,
    refetch: refetchConsultaPatente,
    error: errorConsultaPatente,
  } = useQuery({
    queryKey: ['consultaPatente'],
    queryFn: async () => {
      const {datos} = await getConsultaHistoricaPatente(filtrosRef.current);
      return datos;
    },
    enabled: false,
  });

  const handleSearch = (
    values: SearchPatenteFormValues,
    onClose?: () => void,
  ) => {
    const nuevosFiltros: ConsultaHistoricaPatenteRequest = {
      ...filtrosRef.current,
      txt_codigo: values.txt_codigo.trim().toUpperCase(),
    };
    filtrosRef.current = nuevosFiltros;
    refetchConsultaPatente();
    onClose?.();
  };

  const handleSelectConsultaPatente = (item: ConsultaHistoricaPatente) => {
    navigation.navigate('ListaConsultaHistoricaPatente', {consultaHistoricaPatente: item});
  };

  return {
    //* Propiedades
    initialValues,
    consultaPatente,
    isFetchConsultaPatente,
    errorConsultaPatente,

    //* Metodos
    handleSearch,
    refetchConsultaPatente,
    handleSelectConsultaPatente,
  };
};
