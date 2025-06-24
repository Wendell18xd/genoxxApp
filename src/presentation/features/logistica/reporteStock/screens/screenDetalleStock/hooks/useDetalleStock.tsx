import { useQuery } from '@tanstack/react-query';
import { getReporteStock } from '../../../../../../../actions/logistica/reporteStock';
import { useAuthStore } from '../../../../../../store/auth/useAuthStore';

export const useDetalleStock = () => {
  const { user } = useAuthStore();

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['detalleStock'],
    queryFn: async () => {
      const response = await getReporteStock({
        vg_empr_codigo: user?.empr_codigo ?? '',
        cbo_bus_tipo_perfil: user?.usua_tipo ?? '',
        txt_bus_cod_perfil: user?.usua_perfil ?? '',
        txt_maneja_kardex: 'NO',
        txt_liquida_app: '0',
      });

      return response.datos.map(item => ({
        mate_codigo: item.mate_codigo,
        mate_nombre: item.mate_nombre,
        mate_medida: item.mate_medida,
        stock_contable: item.stock_contable,
      }));
    },
  });

  return {
    detalleStock: data,
    isLoading,
    isFetching,
    error,
  };
};
