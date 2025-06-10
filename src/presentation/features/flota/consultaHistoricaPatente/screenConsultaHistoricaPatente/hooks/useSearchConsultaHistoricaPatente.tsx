import {useRef} from 'react';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {ConsultaHistoricaPatenteRequest} from '../../../../../../infrastructure/interfaces/flota/consultaHistoricaPatente/consultaHistoricaPatente.request';
import {useQuery} from '@tanstack/react-query';
import {getConsultaHistoricaPatente} from '../../../../../../actions/flota/consultaHistoricaPatente';
import {Option} from 'react-native-paper-dropdown';
import {usePatenteStore} from '../../../../buscadores/buscadorPatente/store/usePatenteStore';
import {usePersonalStore} from '../../../../buscadores/buscadorPersonal/store/usePersonalStore';
import * as Yup from 'yup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ConsultaHistoricaPatenteStackParam} from '../../navigations/ConsultaHistoricaPatenteStackNavigation';

interface SearchConsultaHistoricaFormValues {
  cbo_bus_tipo: string;
  txt_cod_destinatario: string;
  personal: string;
  patente: string;
}

const initialValues: SearchConsultaHistoricaFormValues = {
  cbo_bus_tipo: 'PERS',
  txt_cod_destinatario: '',
  personal: '',
  patente: '',
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
  const navigation =
    useNavigation<NavigationProp<ConsultaHistoricaPatenteStackParam>>();
  const {setOnSelectPersonal, resetPersonal} = usePersonalStore();
  const {setOnSelectPatente, resetPatente} = usePatenteStore();

  const filtrosRef = useRef<ConsultaHistoricaPatenteRequest>({
    vl_empr_codigo: user?.empr_codigo || '',
    cbo_bus_tipo: '',
    txt_cod_destinatario: '',
  });

  const getValidationSchema = () =>
    Yup.object().shape({
      txt_cod_destinatario: Yup.string().required('Seleccione en el buscador'),
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
      cbo_bus_tipo: values.cbo_bus_tipo,
      txt_cod_destinatario: values.txt_cod_destinatario,
    };
    filtrosRef.current = nuevosFiltros;
    refetchConsultaHistoricaPatente();
    onClose?.();
  };

  const handleSelectPersonal = (
    personal: string,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    if (personal && personal.length > 0) {
      setFieldValue('personal', '');
      setFieldValue('txt_cod_destinatario', '');
      resetPersonal();
    } else {
      setOnSelectPersonal(item => {
        setFieldValue('personal', `${item.cod_para} - ${item.nom_para}`);
        setFieldValue('txt_cod_destinatario', `${item.cod_para}`);
      });
      navigation.navigate('BuscadorPersonalScreen');
    }
  };

  const handleSelectPatente = (
    patente: string,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    if (patente && patente.length > 0) {
      setFieldValue('patente', '');
      setFieldValue('txt_cod_destinatario', '');
      resetPatente();
    } else {
      setOnSelectPatente(item => {
        setFieldValue('patente', `${item.cod_para} - ${item.nom_para}`);
        setFieldValue('txt_cod_destinatario', `${item.cod_para}`);
      });
      navigation.navigate('BuscadorPatenteScreen');
    }
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
    getValidationSchema,
    handleSelectPersonal,
    handleSelectPatente,
  };
};
