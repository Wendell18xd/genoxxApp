import {useQuery} from '@tanstack/react-query';
import {getReporteStock} from '../../../../../../../actions/logistica/reporteStock';
import {useAuthStore} from '../../../../../../store/auth/useAuthStore';

export const useDetalleStock = () => {
  const {user} = useAuthStore();

  const {data, isLoading, error} = useQuery({
    queryKey: ['detalleStock'],
    queryFn: async () => {
      const response = await getReporteStock({
        vg_empr_codigo: user?.empr_codigo ?? '001',
        cbo_bus_tipo_perfil: 'ALMA',
        cbo_bus_proyecto: '',
        cbo_bus_unidad_negocio: '',
        cbo_bus_origen: '',
        cbo_bus_activo_fijo: '',
        txt_bus_cod_perfil: '',
        txt_bus_mate_codigo: '',
        chk_bus_sin_saldo: '',
        txt_aplica_varios_almacenes: '',
        txt_maneja_kardex: '',
        cbo_bus_tipo_material: '',
        txt_liquida_app: '0',
      });

      return response.datos.map(item => ({
        mate_codigo: item.mate_codigo,
        mate_nombre: item.mate_nombre,
        mate_medida: item.mate_medida,
        alma_stock: item.alma_stock,
      }));
    },
  });

  return {
    detalleStock: data,
    isLoading,
    error,
  };
};
