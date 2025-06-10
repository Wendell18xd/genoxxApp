import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useRef} from 'react';
import {useQuery} from '@tanstack/react-query';
import {ConsultaInspeccionesStackParam} from '../../navigations/ConsultaInspeccionesStackNavigation';
import {ConsultaInspeccionesRequest} from '../../../../../../infrastructure/interfaces/flota/consultaInspecciones/consultaInspecciones.request';
import {getConsultaInspecciones} from '../../../../../../actions/flota/consultaInspecciones';
import {ConsultaInspecciones} from '../../../../../../domain/entities/ConsultaInspecciones';
import * as Yup from 'yup';
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

  const getValidationSchema = () =>
    Yup.object().shape({
      txt_nro_placa: Yup.string().required('Ingrese el número de placa'),
      txt_bus_fecha_desde: Yup.string().required('Seleccione una fecha'),
      txt_bus_fecha_hasta: Yup.string()
        .required('Seleccione una fecha')
        .test(
          'is-after',
          "La fecha 'Hasta' no puede ser menor que la fecha 'Desde'",
          function (value) {
            const {txt_bus_fecha_desde} = this.parent;
            if (!value || !txt_bus_fecha_desde) {
              return true;
            }
            return new Date(value) >= new Date(txt_bus_fecha_desde);
          },
        ),
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
    const encodedNumeroInspeccion = encodeBase64UrlSafe(item.numero_inspeccion.toString());

    let url = `${genoxxApi.defaults.baseURL}/flota/imprimir_inspeccion_vehicular/${encodedNumeroInspeccion}`;
    if (user?.trab_documento === '20492518311') {
      url = `${genoxxApi.defaults.baseURL}/flota/formato_inspeccion/${item.cont_correlativo}`;
    }

    const postData =
      `vgCodUse=${user?.usua_codigo}` +
      `&vgCodEmp=${user?.empr_codigo}` +
      `&vgEmpRuc=${user?.trab_documento}` +
      `&vgPais=${user?.empr_pais}`;

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
    getValidationSchema,
  };
};
