import {NavigationProp, useNavigation} from '@react-navigation/native';

import {useRef} from 'react';
import {useQuery} from '@tanstack/react-query';
import {ConsultaHistoricaPatenteStackParam} from '../../../flota/consultaHistoricaPatente/navigations/ConsultaHistoricaPatenteStackNavigation';
import {ConsultaUnidadesRequest} from '../../../../../infrastructure/interfaces/flota/consultaUnidades/consultaUnidades.request';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import {getConsultaUnidades} from '../../../../../actions/flota/consultaUnidades';
import {ConsultaUnidades} from '../../../../../domain/entities/ConsultaUnidades';
import {usePatenteStore} from '../store/usePatenteStore';
import * as Yup from 'yup';

interface SearchUnidadesFormValues {
  nro_placa: string;
}

const initialValues: SearchUnidadesFormValues = {
  nro_placa: '',
};

export const useSearchPatente = () => {
  const {user} = useAuthStore();
  const navigation =
    useNavigation<NavigationProp<ConsultaHistoricaPatenteStackParam>>();
  const onSelect = usePatenteStore(state => state.onSelect);

  const filtrosRef = useRef<ConsultaUnidadesRequest>({
    vl_empr_codigo: user?.empr_codigo || '',
    txt_nro_placa: '',
  });

  const getValidationSchema = () =>
    Yup.object().shape({
      nro_placa: Yup.string().required('Buscar patente'),
    });

  const {
    data: patente,
    isFetching: isFetchPatente,
    refetch: refetchPatente,
    error: errorPatente,
  } = useQuery({
    queryKey: ['consultaPatentes'],
    queryFn: async () => {
      const {datos} = await getConsultaUnidades(filtrosRef.current);
      return datos;
    },
    enabled: false,
  });

  const handleSearch = (
    values: SearchUnidadesFormValues,
    onClose?: () => void,
  ) => {
    const nuevosFiltros: ConsultaUnidadesRequest = {
      ...filtrosRef.current,
      txt_nro_placa: values.nro_placa.trim().toUpperCase(),
    };
    filtrosRef.current = nuevosFiltros;
    refetchPatente();
    onClose?.();
  };

  const handleSelectPatente = (selectedPatente: ConsultaUnidades) => {
    onSelect?.(selectedPatente);
    navigation.goBack();
  };

  return {
    //* Propiedades
    initialValues,
    patente,
    isFetchPatente,
    errorPatente,

    //* Metodos
    handleSearch,
    getValidationSchema,
    refetchPatente,
    handleSelectPatente,
  };
};
