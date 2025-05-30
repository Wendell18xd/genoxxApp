import {useQuery} from '@tanstack/react-query';
import {useLiquiMateStore} from '../../store/useLiquiMateStore';
import {listadoStockMaterilesObras} from '../../../../../../actions/obras/stock.obras';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {useRef} from 'react';
import {useMainStore} from '../../../../../store/main/useMainStore';
import {Menu} from '../../../../../../types/menus';
import {Option} from 'react-native-paper-dropdown';

export const useLiquiMatObras = () => {
  const {obra, setGuias} = useLiquiMateStore();
  const {user} = useAuthStore();
  const {drawerKey} = useMainStore();
  const isRegulariza = useRef('0');
  const txt_tipo =
    drawerKey === Menu.LIQUIDACION_MATERIALES_OBRAS_ENERGIA ? 'ENERGIA' : '';

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
        txt_tipo: txt_tipo,
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

      let filter = datos;
      if (txt_tipo !== 'ENERGIA') {
        filter = filter.filter(
          f =>
            f.mate_cantidad > 0 &&
            f.mate_controlserie === '0' &&
            f.mate_categoria !== 'EPIS' &&
            f.mate_categoria !== 'HERRAMIENTA' &&
            f.mate_categoria !== 'PEQUEÑA HERRAMIENTA' &&
            f.mate_categoria !== 'EPIS ASIGNABLES',
        );
      }

      // Agrupamos los elementos por guia_numero y guia_codigo
      const agrupados: any = {};

      filter.forEach(item => {
        const key = `${item.guia_numero}-${item.guia_codigo}`;
        if (!agrupados[key]) {
          agrupados[key] = {
            value: item.guia_codigo,
            label: item.guia_numero,
          };
        }
      });

      // Agregamos la opción por defecto al inicio
      const resultadoAgrupado: Option[] = [
        {value: 'TODOS', label: '(TODOS)'},
        ...(Object.values(agrupados) as any),
      ];
      setGuias(resultadoAgrupado);

      return filter;
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
