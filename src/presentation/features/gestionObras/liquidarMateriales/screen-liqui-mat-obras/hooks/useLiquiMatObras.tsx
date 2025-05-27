import {useQuery} from '@tanstack/react-query';
import {useLiquiMateStore} from '../../store/useLiquiMateStore';
import {listadoStockMaterilesObras} from '../../../../../../actions/obras/stock.obras';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useRef} from 'react';

export const useLiquiMatObras = () => {
  const {obra} = useLiquiMateStore();
  const {user} = useAuthStore();
  const isRegulariza = useRef('0');

  const {
    data: dataStock,
    isFetching: isFetchingStock,
    error: errorStock,
    refetch: refetchStock,
  } = useQuery({
    queryKey: ['listadoStockMaterilesObras', obra],
    queryFn: async () => {
      const {datos} = await listadoStockMaterilesObras({
        vg_empr_codigo: user?.empr_codigo || '',
        codanexo: user?.usua_perfil || '',
        tipoanexo: user?.usua_tipo || '',
        txt_tipo: 'ENERGIA',
        txt_nro_orden: obra?.regi_codigo || '',
        txt_valida_proyectado: obra?.valida_proyectado || '0',
        tipoopera: user?.usua_tipoopera || '',
        obra: obra?.regi_codigo || '',
        codiperfil: user?.usua_perfil || '',
        tipoperfil: user?.usua_tipo || '',
        liquimate: '1',
        aplica_guia: isRegulariza.current || '0',
        tipomovi: 'I',
      });

      return datos;
    },
    enabled: false,
  });

  const handleListarStock = (regulariza: boolean) => {
    isRegulariza.current = regulariza ? '0' : '1';
    refetchStock();
  };

  return {
    //* Propiedades
    dataStock,
    isFetchingStock,
    errorStock,

    //* Metodos
    handleListarStock,
  };
};
