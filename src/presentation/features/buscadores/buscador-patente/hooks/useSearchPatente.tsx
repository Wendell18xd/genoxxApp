import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useRef} from 'react';
import {useQuery} from '@tanstack/react-query';
import {ConsultaHistoricaPatenteStackParam} from '../../../flota/consultaHistoricaPatente/navigations/ConsultaHistoricaPatenteStackNavigation';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import {usePatenteStore} from '../store/usePatenteStore';
import * as Yup from 'yup';
import {PlacaRequest} from '../../../../../infrastructure/interfaces/buscadores/placa/placa.request';
import {getPlaca} from '../../../../../actions/buscadores/placa';
import {Placa} from '../../../../../domain/entities/Placa';

interface SearchPlacaFormValues {
  txt_buscar: string;
}

const initialValues: SearchPlacaFormValues = {
  txt_buscar: '',
};

export const useSearchPatente = () => {
  const {user} = useAuthStore();
  const navigation =
    useNavigation<NavigationProp<ConsultaHistoricaPatenteStackParam>>();
  const {onSelect} = usePatenteStore();

  const filtrosRef = useRef<PlacaRequest>({
    vl_empr_codigo: user?.empr_codigo || '',
    txt_buscar: '',
  });

  const getValidationSchema = () =>
    Yup.object().shape({
      txt_buscar: Yup.string().required('Ingrese una patente'),
    });

  const {
    data: patente,
    isFetching: isFetchPatente,
    refetch: refetchPatente,
    error: errorPatente,
  } = useQuery({
    queryKey: ['consultaPatentes'],
    queryFn: async () => {
      const {datos} = await getPlaca(filtrosRef.current);
      return datos;
    },
    enabled: false,
  });

  const handleSearch = (
    values: SearchPlacaFormValues,
    onClose?: () => void,
  ) => {
    const nuevosFiltros: PlacaRequest = {
      ...filtrosRef.current,
      txt_buscar: values.txt_buscar.trim().toUpperCase(),
    };
    filtrosRef.current = nuevosFiltros;
    refetchPatente();
    onClose?.();
  };

  const handleSelectPatente = (selectedPatente: Placa) => {
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
