import {useAuthStore} from '../../../../../../store/auth/useAuthStore';
import {useLiquiMatATCStore} from '../../../../store/useLiquiMatATCStore';
import { useQuery } from '@tanstack/react-query';
import { getLiquidacionesATC } from '../../../../../../../actions/gestionATC/liquidacionATC';

export const useLiquiMat = () => {
  const {user} = useAuthStore();
  const {LiquidacionMat, isRefetchLiquidacionMat, setIsRefetchLiquidacionMat} = useLiquiMatATCStore();

  const {
    data: LiquidacionATC,
    isFetching: isFetchLiquidacionATC,
    refetch: refetchLiquidacionATC,
    error: errorLiquidacionATC,
  } = useQuery({
    queryKey: ['liquidacionesATC'],
    queryFn: async () => {
      const {datos} = await getLiquidacionesATC({
        vl_empr_codigo: user?.empr_codigo || '',
        txt_nro_ost: LiquidacionMat?.nro_ots || '',
      });
      return datos;
    },
    enabled:false,
  });


  return {
    //* Propiedades
    LiquidacionATC,
    isFetchLiquidacionATC,
    errorLiquidacionATC,
    isRefetchLiquidacionMat,

    //* Metodos,
    refetchLiquidacionATC,
    setIsRefetchLiquidacionMat,
  };
};
