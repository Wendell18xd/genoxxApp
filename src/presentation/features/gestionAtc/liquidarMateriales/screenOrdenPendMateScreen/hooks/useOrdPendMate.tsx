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
    isFetching,
    refetch,
    error,
   } = useQuery({
    queryKey: ['ordenesPendienteMate'],
    queryFn: async () => {
      const {datos} = await getDocumentoOrdenes(filtrosRef.current);
      return datos;
    },
  });

  const ordenesPendientesMateriales = ordenesPendienteMate?.filter(o => o.finaliza_material === '0') ?? [];
  const ordenesPendientesPartidas = ordenesPendienteMate?.filter(o => o.finaliza_partida === '0') ?? [];

  return {
    ordenesPendienteMate,
    ordenesPendientesMateriales,
    ordenesPendientesPartidas,
    isFetching,
    refetch,
    error,
  };
};
