import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useRef} from 'react';
import {useQuery} from '@tanstack/react-query';
import {ConsultaInspeccionesStackParam} from '../../navigations/ConsultaInspeccionesStackNavigation';
import {ConsultaInspeccionesRequest} from '../../../../../../infrastructure/interfaces/flota/consultaInspecciones/consultaInspecciones.request';
import {getConsultaInspecciones} from '../../../../../../actions/flota/consultaInspecciones';
import {ConsultaInspecciones} from '../../../../../../domain/entities/ConsultaInspecciones';
import {genoxxApi} from '../../../../../../config/api/genoxxApi';
// @ts-ignore
import { encode as base64Encode } from 'base-64';


interface SearchInspeccionesFormValues {
  txt_nro_placa: string;
  txt_bus_fecha_desde: string;
  txt_bus_fecha_hasta: string;
}

const initialValues: SearchInspeccionesFormValues = {
  txt_nro_placa: '',
  txt_bus_fecha_desde: new Date().toISOString().slice(0, 10),
  txt_bus_fecha_hasta: new Date().toISOString().slice(0, 10),
};

export const useSearchInspeccion = () => {
  const {user} = useAuthStore();
  const navigation =
    useNavigation<NavigationProp<ConsultaInspeccionesStackParam>>();

  const filtrosRef = useRef<ConsultaInspeccionesRequest>({
    vl_empr_codigo: user?.empr_codigo || '',
    txt_nro_placa: '',
    txt_bus_fecha_desde: '',
    txt_bus_fecha_hasta: '',
  });

  const {
    data: inspeccion,
    isFetching: isFetchInspeccion,
    refetch: refetchInspeccion,
    error: errorInspeccion,
  } = useQuery({
    queryKey: ['consultaInspecciones'],
    queryFn: async () => {
      const {datos} = await getConsultaInspecciones(filtrosRef.current);
      return datos;
    },
    enabled: false,
  });

  const handleSearch = (
    values: SearchInspeccionesFormValues,
    onClose?: () => void,
  ) => {
    const nuevosFiltros: ConsultaInspeccionesRequest = {
      ...filtrosRef.current,
      txt_nro_placa: values.txt_nro_placa.trim().toUpperCase(),
      txt_bus_fecha_desde: values.txt_bus_fecha_desde,
      txt_bus_fecha_hasta: values.txt_bus_fecha_hasta,
    };
    filtrosRef.current = nuevosFiltros;
    refetchInspeccion();
    onClose?.();
  };

  const encodeBase64UrlSafe = (input: string): string => {
  return base64Encode(input)
    .replace(/\+/g, '-')   // Reemplaza '+' con '-'
    .replace(/\//g, '_')   // Reemplaza '/' con '_'
    .replace(/=+$/, '');   // Elimina '=' al final
};

  const handleSelectInspeccion = (item: ConsultaInspecciones) => {
     console.log('Número de inspección recibido:', item.numero_inspeccion);
     console.log('Correlativo recibido:', item.cont_correlativo);

    const encodedNumeroInspeccion = encodeBase64UrlSafe(item.numero_inspeccion.toString());

    let url = `${genoxxApi.defaults.baseURL}/flota/imprimir_inspeccion_vehicular/${encodedNumeroInspeccion}`;

    console.log('Usuario:', user);
    if (user?.empr_documento === '20492518311') {
      url = `${genoxxApi.defaults.baseURL}/flota/formato_inspeccion/${item.cont_correlativo}`;
    }

    const postData =
      `vg_cod_use=${user?.usua_codigo}` +
      `&vg_cod_emp=${user?.empr_codigo}` +
      `&vg_emp_ruc=${user?.empr_documento}` +
      `&vg_pais=${user?.empr_pais}`;

    console.log('URL:', url);
    navigation.navigate('WebViewerScreen', {
      url,
      postData,
    });
  };

  return {
    //* Propiedades
    initialValues,
    inspeccion,
    isFetchInspeccion,
    errorInspeccion,

    //* Metodos
    handleSearch,
    refetchInspeccion,
    handleSelectInspeccion,
  };
};
