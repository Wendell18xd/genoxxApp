import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useQuery} from '@tanstack/react-query';
import {getProyecto} from '../../../../../../actions/gestionATC/proyectosATC';
import {useRef} from 'react';
import {DocumentoOrdenesRequest} from '../../../../../../infrastructure/interfaces/gestionATC/ordenes/ordenesATC.request';
import {getDocumentoOrdenes} from '../../../../../../actions/gestionATC/ordenesATC';
import { mapToDropdown } from '../../../../../../infrastructure/mappers/mapToDropdown';

interface LiquidarMatFromValues {
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
      txt_codi_perfil: user?.usua_perfil || '',
      txt_nro_buscar_doc: '',
      cbo_proy_codigo: '',
      cbo_elegido: values.tipoLiquidacion || '',
      txt_fecha_liquidacion: values.fechaLiquidacion || '',
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
