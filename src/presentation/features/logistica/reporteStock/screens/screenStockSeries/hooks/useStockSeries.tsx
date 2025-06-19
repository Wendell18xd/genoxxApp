import {useQuery} from '@tanstack/react-query';
import {getReporteStock} from '../../../../../../../actions/logistica/reporteStock';
import {useAuthStore} from '../../../../../../store/auth/useAuthStore';

export const useStockSeries = () => {
  const {user} = useAuthStore();

  const {data, isLoading, error} = useQuery({
    queryKey: ['stockSerie'],
    queryFn: async () => {
      const response = await getReporteStock({
        vg_empr_codigo: user?.empr_codigo ?? '',
        cbo_bus_tipo_perfil: user?.usua_tipo ?? '',
        txt_bus_cod_perfil: user?.usua_perfil ?? '',
        txt_maneja_kardex: 'NO',
        txt_liquida_app: '0',
      });

      return response.detalle.map(item => ({
        mate_codigo: item.mate_codigo,
        mate_nombre: item.mate_nombre,
        mate_serie: item.mate_serie,
        mate_cantidad: item.mate_cantidad,
      }));
    },
  });

  return {
    stockSerie: data,
    isLoading,
    error,
  };
};
