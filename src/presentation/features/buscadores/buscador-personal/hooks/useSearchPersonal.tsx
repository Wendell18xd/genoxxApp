import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useRef} from 'react';
import {useQuery} from '@tanstack/react-query';
import {ConsultaHistoricaPatenteStackParam} from '../../../flota/consultaHistoricaPatente/navigations/ConsultaHistoricaPatenteStackNavigation';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import {PersonalRequest} from '../../../../../infrastructure/interfaces/buscadores/personal/personal.request';
import {getPersonal} from '../../../../../actions/buscadores/personal';
import {Personal} from '../../../../../domain/entities/Personal';
import {usePersonalStore} from '../store/usePersonalStore';
import * as Yup from 'yup';

interface SearchPersonalFormValues {
  txt_buscar: string;
}

const initialValues: SearchPersonalFormValues = {
  txt_buscar: '',
};

export const useSearchPersonal = () => {
  const {user} = useAuthStore();
  const navigation =
    useNavigation<NavigationProp<ConsultaHistoricaPatenteStackParam>>();
  const onSelect = usePersonalStore(state => state.onSelect);

  const filtrosRef = useRef<PersonalRequest>({
    vl_empr_codigo: user?.empr_codigo || '',
    txt_buscar: '',
    txt_cod_trabajador: '',
  });

  const getValidationSchema = () =>
    Yup.object().shape({
      txt_buscar: Yup.string().required('Ingrese un personal'),
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
      txt_buscar: values.txt_buscar.trim().toUpperCase(),
    };
    filtrosRef.current = nuevosFiltros;
    refetchPersonal();
    onClose?.();
  };

  const handleSelectPersonal = (selectedPersonal: Personal) => {
    onSelect?.(selectedPersonal);
    navigation.goBack();
  };

  return {
    //* Propiedades
    initialValues,
    personal,
    isFetchPersonal,
    errorPersonal,

    //* Metodos
    handleSearch,
    getValidationSchema,
    refetchPersonal,
    handleSelectPersonal,
  };
};
