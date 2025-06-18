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
        cbo_bus_tipo_perfil: props.cbo_bus_tipo_perfil || '',
        cbo_bus_proyecto: props.cbo_bus_proyecto || '',
        cbo_bus_unidad_negocio: props.cbo_bus_unidad_negocio || '',
        cbo_bus_origen: props.cbo_bus_origen || '',
        cbo_bus_activo_fijo: props.cbo_bus_activo_fijo || '',
        txt_bus_cod_perfil: props.txt_bus_cod_perfil || '',
        txt_bus_mate_codigo: props.txt_bus_mate_codigo || '',
        chk_bus_sin_saldo: props.chk_bus_sin_saldo || '',
        txt_aplica_varios_almacenes: props.txt_aplica_varios_almacenes || '',
        txt_maneja_kardex: props.txt_maneja_kardex || '',
        cbo_bus_tipo_material: props.cbo_bus_tipo_material || '',
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
