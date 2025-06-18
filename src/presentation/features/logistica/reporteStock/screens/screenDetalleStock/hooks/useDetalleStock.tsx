import {useQuery} from '@tanstack/react-query';
import {useAuthStore} from '../../../../../../store/auth/useAuthStore';
import {getReporteStock} from '../../../../../../../actions/logistica/reporteStock';
import {useRef, useState} from 'react';
import { useReporteStockStore } from '../../../store/useReporteStockStore';
import {ReporteStock} from '../../../../../../../domain/entities/ReporteStock';

export const useDetalleStock = () => {
  const {user} = useAuthStore();
  useReporteStockStore();

  const [isRegulariza, setIsRegulariza] = useState(false);
  const isRegularizaRef = useRef(false);
  const {reporteStock} = useReporteStockStore();

  const {
    data,
    isFetching,
    refetch,
    error,
  } = useQuery<ReporteStock[]>({
    queryKey: ['detalleStock'],
    queryFn: async () => {
      const response = await getReporteStock({
        vl_empr_codigo: user?.empr_codigo ?? '',
        cbo_bus_proyecto: '',
        cbo_bus_tipo_perfil: '',
        cbo_bus_unidad_negocio: '',
        cbo_bus_origen: '',
        cbo_bus_activo_fijo: '',
        txt_bus_cod_perfil: '',
        txt_bus_mate_codigo: reporteStock?.mate_codigo || '',
        chk_bus_sin_saldo: '',
        txt_aplica_varios_almacenes: '',
        txt_maneja_kardex: '',
        cbo_bus_tipo_material: '',
        txt_liquida_app: '',
      });
        return response ?? [];
    },
    enabled: true,
  });

  const handleRegularizarMateriales = (value: boolean) => {
    setIsRegulariza(value);
    isRegularizaRef.current = value;
  };

  return {
    dataDetalleStock: data ?? [],
    isFetchDetalleStock: isFetching,
    refetchDetalleStock: refetch,
    errorDetalleStock: error,

    isRegulariza,
    handleRegularizarMateriales,
  };
};
