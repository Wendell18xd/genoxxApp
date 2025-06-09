import {useQuery} from '@tanstack/react-query';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useObrasStore} from '../../../store/useObrasStore';
import {listadoPartidasObras} from '../../../../../../actions/gestion-obras/partidas.obras';
import {useLiquiPartStore} from '../../../liquidar-partidas/store/useLiquiPartStore';

export const usePartidasObras = () => {
  const {user} = useAuthStore();
  const {isRefetchLiquidacion, setIsRefetchLiquidacion} = useLiquiPartStore();
  const {obra} = useObrasStore();

  const {
    data: dataPartidas,
    isFetching: isFetchPartidas,
    refetch: refetchPartidas,
    error: errorPartidas,
  } = useQuery({
    queryKey: ['partidas', 'liquidados', obra],
    queryFn: async () => {
      const {partidas, cierre} = await listadoPartidasObras(
        {
          vg_empr_codigo: user?.empr_codigo || '',
          vg_usua_perfil: user?.usua_perfil || '',
          vl_regi_codigo: obra?.regi_codigo || '',
          vl_proy_codigo: obra?.proy_codigo || '',
        },
        {
          vl_empr_codigo: user?.empr_codigo || '',
          vl_nro_orden: obra?.nro_orden || '',
        },
      );
      return {partidas: partidas.datos, cierre};
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
