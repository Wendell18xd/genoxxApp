import {NavigationProp, useNavigation} from '@react-navigation/native';

import {useRef} from 'react';
import {useQuery} from '@tanstack/react-query';
import { ConsultaHistoricaPatenteStackParam } from '../../../flota/consultaHistoricaPatente/navigations/ConsultaHistoricaPatenteStackNavigation';
import { useAuthStore } from '../../../../store/auth/useAuthStore';
import { PersonalRequest } from '../../../../../infrastructure/interfaces/flota/personal/personal.request';
import { getPersonal } from '../../../../../actions/personal/personal';
import { Personal } from '../../../../../domain/entities/Personal';

interface SearchPersonalFormValues {
  nom_para: string;
}

const initialValues: SearchPersonalFormValues = {
  nom_para: '',
};

export const useSearchPersonal = () => {
  const {user} = useAuthStore();
  const navigation =
    useNavigation<NavigationProp<ConsultaHistoricaPatenteStackParam>>();

  const filtrosRef = useRef<PersonalRequest>({
    vl_empr_codigo: user?.empr_codigo || '',
    txt_buscar: '',
    txt_cod_trabajador: '',
  });

  const {
    data: personal,
    isFetching: isFetchPersonal,
    refetch: refetchPersonal,
    error: errorPersonal,
  } = useQuery({
    queryKey: ['consultaPersonal'],
    queryFn: async () => {
      const {datos} = await getPersonal(filtrosRef.current);
      return datos;
    },
    enabled: false,
  });

  const handleSearch = (
    values: SearchPersonalFormValues,
    onClose?: () => void,
  ) => {
    const nuevosFiltros: PersonalRequest = {
      ...filtrosRef.current,
      txt_cod_trabajador: values.nom_para.trim().toUpperCase(),
    };
    filtrosRef.current = nuevosFiltros;
    refetchPersonal();
    onClose?.();
  };

  const handleSelectPersonal = (item: Personal) => {
    navigation.navigate('ListaConsultaHistoricaPatenteScreen', {personal: item});
  };

  return {
    //* Propiedades
    initialValues,
    personal,
    isFetchPersonal,
    errorPersonal,

    //* Metodos
    handleSearch,
    refetchPersonal,
    handleSelectPersonal,
  };
};
