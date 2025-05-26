import {useQuery} from '@tanstack/react-query';
import {listadoMaterialesObra} from '../../../../../../actions/obras/materiales.obras';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useLiquiMateStore} from '../../store/useLiquiMateStore';

export const useMateObras = () => {
  const {user} = useAuthStore();
  const {obra} = useLiquiMateStore();

  const {
    data: dataMateriales,
    isFetching: isFetchMateriales,
    refetch: refetchMateriales,
    error: errorMateriales,
  } = useQuery({
    queryKey: ['materiales', 'liquidados', obra],
    queryFn: async () => {
      const {materiales, cierre} = await listadoMaterialesObra(
        {
          vl_empr_codigo: user?.empr_codigo || '',
          vl_reg_codigo: obra?.regi_codigo || '',
          vl_regularizar: '0',
        },
        {
          vl_empr_codigo: user?.empr_codigo || '',
          vl_nro_orden: obra?.nro_orden || '',
        },
      );
      return {materiales, cierre};
    },
    enabled: false,
  });

  return {
    //* Propiedades
    dataMateriales,
    isFetchMateriales,
    errorMateriales,
    //* Metodos,
    refetchMateriales,
  };
};
