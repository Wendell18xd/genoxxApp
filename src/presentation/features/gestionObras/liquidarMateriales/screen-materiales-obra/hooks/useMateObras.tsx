import {useQuery} from '@tanstack/react-query';
import {listadoMaterialesObra} from '../../../../../../actions/obras/materiales.obras';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useLiquiMateStore} from '../../store/useLiquiMateStore';
import {useRef, useState} from 'react';

export const useMateObras = () => {
  const {user} = useAuthStore();
  const {obra, isRefetchLiquidacion, setIsRefetchLiquidacion} =
    useLiquiMateStore();
  const [isRegulariza, setIsRegulariza] = useState(false);
  const isRegularizaRef = useRef(false);

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
          vl_regularizar: isRegularizaRef.current ? '1' : '0',
        },
        {
          vl_empr_codigo: user?.empr_codigo || '',
          vl_nro_orden: obra?.nro_orden || '',
        },
      );
      return {materiales: materiales.datos, cierre};
    },
    enabled: false,
  });

  const handleRegularizarMateriales = (value: boolean) => {
    setIsRegulariza(value);
    isRegularizaRef.current = value;
    refetchMateriales();
  };

  return {
    //* Propiedades
    dataMateriales,
    isFetchMateriales,
    errorMateriales,
    isRegulariza,
    isRefetchLiquidacion,

    //* Metodos,
    refetchMateriales,
    handleRegularizarMateriales,
    setIsRefetchLiquidacion,
  };
};
