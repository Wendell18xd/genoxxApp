import {genoxxApi} from '../../config/api/genoxxApi';
import {ReporteStockRequest} from '../../infrastructure/interfaces/Logistica/reporteStock/reporteStock.request';
import {ReporteStockResponse} from '../../infrastructure/interfaces/Logistica/reporteStock/reporteStock.response';

export const getReporteStock = async (
  props: ReporteStockRequest,
): Promise<ReporteStockResponse> => {
  try {
    console.log('getReporteStock', props);
    const {data} = await genoxxApi.post<ReporteStockResponse>(
      '/logistica/listar_reportestock',
      {
        vg_empr_codigo: props.vg_empr_codigo ?? '',
        cbo_bus_tipo_perfil: props.cbo_bus_tipo_perfil || '',
        txt_bus_cod_perfil: props.txt_bus_cod_perfil || '',
        txt_maneja_kardex: props.txt_maneja_kardex || '',
        txt_liquida_app: props.txt_liquida_app || '',
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
