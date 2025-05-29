import {genoxxApi} from '../../config/api/genoxxApi';
import {ListarStockObrasRequest} from '../../infrastructure/interfaces/gestionObras/liquidar-materiales/listarStockObras.request';
import {ListarStockObrasResponse} from '../../infrastructure/interfaces/gestionObras/liquidar-materiales/listarStockObras.response';

export const listadoStockMaterilesObras = async (
  props: ListarStockObrasRequest,
): Promise<ListarStockObrasResponse> => {
  try {
    const {data} = await genoxxApi.post<ListarStockObrasResponse>(
      '/logistica/listar_stock_almacen',
      {
        vg_empr_codigo: props.vg_empr_codigo,
        codanexo: props.codanexo,
        tipoanexo: props.tipoanexo,
        txtTipo: props.txt_tipo,
        txtNroOrden: props.txt_nro_orden,
        txtValidaProyectado: props.txt_valida_proyectado,
        tipoopera: props.tipoopera,
        obra: props.obra,
        codiperfil: props.codiperfil,
        tipoperfil: props.tipoperfil,
        liquimate: props.liquimate,
        aplica_guia: props.aplica_guia,
        tipomovi: props.tipomovi,
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
