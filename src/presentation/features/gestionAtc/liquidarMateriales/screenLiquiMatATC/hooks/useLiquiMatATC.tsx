import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useQuery} from '@tanstack/react-query';
import {getProyecto} from '../../../../../../actions/gestionATC/proyectosATC';
import {useRef} from 'react';
import {DocumentoOrdenesRequest} from '../../../../../../infrastructure/interfaces/gestionATC/ordenes/ordenesATC.request';
import {getDocumentoOrdenes} from '../../../../../../actions/gestionATC/ordenesATC';
import { mapToDropdown } from '../../../../../../infrastructure/mappers/mapToDropdown';
import { formatearFecha } from '../../../../../helper/timeUtils';

interface LiquidarMatFromValues {
  txt_fecha_liquidacion: string;
  cbo_elegido: string;
  cbo_proy_codigo: string;
  txt_nro_buscar_doc: string;
  proyecto: string;
  fechaLiquidacion: string;
  tipoLiquidacion: string;
  nroSolicitud: string;
  nroPeticion: string;
}

const initialValues: LiquidarMatFromValues = {
  proyecto: '',
  fechaLiquidacion: '',
  tipoLiquidacion: '',
  nroSolicitud: '',
  nroPeticion: '',
  cbo_elegido: '',
  cbo_proy_codigo: '',
  txt_nro_buscar_doc: '',
  txt_fecha_liquidacion: '',
};
export const useLiquiMatATC = () => {
  const {user} = useAuthStore();

  const filtrosRef = useRef<DocumentoOrdenesRequest>({
    vl_empr_codigo: user?.empr_codigo || '',
    txt_nro_buscar_doc: '',
    txt_codi_perfil: user?.usua_perfil || '',
    cbo_proy_codigo: '',
    cbo_elegido: '',
    txt_fecha_liquidacion: '',
  });

  const {
    data: proyectos,
    isFetching: isFetchingProyectos,
    refetch: refetchProyecto,
    error: errorProyecto,
  } = useQuery({
    queryKey: ['proyectosATC'],
    queryFn: async () => {
      const resp = await getProyecto({vl_empr_codigo: user?.empr_codigo || '',
      });
      return mapToDropdown(resp.datos, 'proy_alias', 'proy_codigo');
    },
  });

  const {
    data: liquidacion,
    isFetching: isFetchingLiquidacion,
    refetch: refetchLiquidacion,
    error: errorLiquidacion,
  } = useQuery({
    queryKey: ['liquidacionATC'],
    queryFn: async () => {
      const {datos} = await getDocumentoOrdenes(filtrosRef.current);
      return datos;
    },
    enabled: false,
  });

  const handleSearch = (
    values: LiquidarMatFromValues,
    onClose?: () => void,
  ) => {
    const filtros: DocumentoOrdenesRequest = {
      vl_empr_codigo: user?.empr_codigo || '',
      txt_nro_buscar_doc: values.txt_nro_buscar_doc || '',
      txt_codi_perfil: user?.usua_perfil || '',
      cbo_proy_codigo: values.cbo_proy_codigo || '',
      cbo_elegido: values.cbo_elegido || '',
      txt_fecha_liquidacion: formatearFecha(values.txt_fecha_liquidacion),
    };
    filtrosRef.current = filtros;
    refetchLiquidacion();
    onClose?.();
  };

  return {
    initialValues,
    proyectos,
    isFetchingProyectos,
    refetchProyecto,
    errorProyecto,
    handleSearch,

    liquidacion,
    isFetchingLiquidacion,
    refetchLiquidacion,
    errorLiquidacion,
  };
};
