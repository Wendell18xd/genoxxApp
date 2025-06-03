import {useQuery} from '@tanstack/react-query';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useObrasStore} from '../../../store/useObrasStore';
import {listadoPartidasObras} from '../../../../../../actions/obras/partidas.obras';
import {useuseLiquiPartStore} from '../../store/useLiquiPartStore';

export const usePartidasObras = () => {
  const {user} = useAuthStore();
  const {isRefetchLiquidacion, setIsRefetchLiquidacion} =
    useuseLiquiPartStore();
  const {obra} = useObrasStore();

  const {
    data: dataPartidas,
    isFetching: isFetchPartidas,
    refetch: refetchPartidas,
    error: errorPartidas,
  } = useQuery({
    queryKey: ['partidas', 'liquidados', obra],
    queryFn: async () => {
      const {datos} = await listadoPartidasObras({
        vg_empr_codigo: user?.empr_codigo || '',
        vg_usua_perfil: user?.usua_perfil || '',
        vl_regi_codigo: obra?.regi_codigo || '',
        vl_proy_codigo: obra?.proy_codigo || '',
      });
      return datos;
    },
    enabled: false,
  });

  return {
    //* Propiedades
    dataPartidas,
    isFetchPartidas,
    errorPartidas,
    isRefetchLiquidacion,

    //* Metodos,
    refetchPartidas,
    setIsRefetchLiquidacion,
  };
};
