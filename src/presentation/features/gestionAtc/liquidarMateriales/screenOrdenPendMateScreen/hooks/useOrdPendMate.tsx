import {useQuery} from '@tanstack/react-query';
import {getDocumentoOrdenes} from '../../../../../../actions/gestionATC/ordenesATC';
import {DocumentoOrdenesRequest} from '../../../../../../infrastructure/interfaces/gestionATC/ordenes/ordenesATC.request';
import {useRef} from 'react';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';

export const useOrdPendMate = () => {
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
    data: ordenesPendienteMate,
    isFetching: isFetchingOrdenesPendienteMate,
    refetch: refetchOrdenesPendienteMate,
    error: errorOrdenesPendienteMate,
  } = useQuery({
    queryKey: ['ordenesPendientes'],
    queryFn: async () => {
      const {datos} = await getDocumentoOrdenes(filtrosRef.current);
      return datos.filter((orden) => orden.finaliza_material === '0');
    },
    // enabled: false,
  });

  return {
    ordenesPendienteMate,
    isFetchingOrdenesPendienteMate,
    refetchOrdenesPendienteMate,
    errorOrdenesPendienteMate,
  };
};
