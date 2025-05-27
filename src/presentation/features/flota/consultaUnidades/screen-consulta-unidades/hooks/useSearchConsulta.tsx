import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ConsultaUnidadesStackParam} from '../../navigations/ConsultaUnidadesStackNavigation';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useRef} from 'react';
import {ConsultaUnidadesRequest} from '../../../../../../infrastructure/interfaces/flota/consultaUnidades/consultaUnidades.request';
import { getConsultaUnidades } from '../../../../../../actions/flota/consultaUnidades';
import { useQuery } from '@tanstack/react-query';
import { ConsultaUnidades } from '../../../../../../domain/entities/ConsultaUnidades';

interface SearchUnidadesFormValues {
  nro_placa: string;
}

const initialValues: SearchUnidadesFormValues = {
  nro_placa: '',
};

export const useSearchConsulta = () => {
  const {user} = useAuthStore();
  const navigation =
    useNavigation<NavigationProp<ConsultaUnidadesStackParam>>();

  const filtrosRef = useRef<ConsultaUnidadesRequest>({
    vl_empr_codigo: user?.empr_codigo || '',
    txt_nro_placa: '',
    cbo_bus_estado: '',
    cbo_tipo_vehiculo: '',
    cbo_bus_proyectos: '',
    cbo_bus_unid_obra: '',
    txt_cod_destinatario: '',
    txt_bus_fechas: '',
  });

  const {
    data: consulta,
    isFetching: isFetchConsulta,
    refetch: refetchConsulta,
    error: errorConsulta,
  } = useQuery({
    queryKey: ['consultaUnidades'],
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
      refetchConsulta();
      onClose?.();
    };

    const handleSelectConsulta = (item: ConsultaUnidades) => {
    navigation.navigate('DetalleConsultaScreen', {consulta: item});
  };

   return {
    //* Propiedades
    initialValues,
    consulta,
    isFetchConsulta,
    errorConsulta,

    //* Metodos
    handleSearch,
    refetchConsulta,
    handleSelectConsulta,
  };
};
