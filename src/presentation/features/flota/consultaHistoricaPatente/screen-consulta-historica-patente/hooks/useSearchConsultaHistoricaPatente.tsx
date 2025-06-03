import {useRef, useState} from 'react';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {ConsultaHistoricaPatenteRequest} from '../../../../../../infrastructure/interfaces/flota/consultaHistoricaPatente/consultaHistoricaPatente.request';
import {useQuery} from '@tanstack/react-query';
import {getConsultaHistoricaPatente} from '../../../../../../actions/flota/consultaHistoricaPatente';
import {Option} from 'react-native-paper-dropdown';
import {usePatenteStore} from '../../../../buscadores/buscador-patente/store/usePatenteStore';
import {usePersonalStore} from '../../../../buscadores/buscador-personal/store/usePersonalStore';
import * as Yup from 'yup';

interface SearchConsultaHistoricaFormValues {
  txt_codigo: string;
  cbo_bus_tipo: string;
  txt_cod_destinatario: string;
}

const initialValues: SearchConsultaHistoricaFormValues = {
  txt_codigo: '',
  cbo_bus_tipo: 'PERS',
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
  const {setOnSelectPersonal} = usePersonalStore();
  const {setOnSelectPatente} = usePatenteStore();

  const filtrosRef = useRef<ConsultaHistoricaPatenteRequest>({
    vl_empr_codigo: user?.empr_codigo || '',
    txt_codigo: '',
    cbo_bus_tipo: '',
    txt_cod_destinatario: '',
  });

  const [codDestinatario, setCodDestinatario] = useState('');

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
      txt_codigo: '',
      txt_cod_destinatario: '',
    };

    if (values.cbo_bus_tipo === 'PERS') {
      nuevosFiltros.txt_cod_destinatario = codDestinatario.trim();
    } else if (values.cbo_bus_tipo === 'PLACA') {
      nuevosFiltros.txt_cod_destinatario = codDestinatario.trim();
    }

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
    codDestinatario,

    //* Metodos
    handleSearch,
    refetchConsultaHistoricaPatente,
    setCodDestinatario,
    getValidationSchema,
    setOnSelectPersonal,
    setOnSelectPatente,
  };
};
