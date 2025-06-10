import {genoxxApi} from '../../config/api/genoxxApi';
import {ListarStockObrasRequest} from '../../infrastructure/interfaces/gestionObras/liquidarMateriales/listarStockObras.request';
import {ListarStockObrasResponse} from '../../infrastructure/interfaces/gestionObras/liquidarMateriales/listarStockObras.response';
import {
  GrabarMaterialesObrasRequest,
  ValidarCuadroMaterialesRequest,
} from '../../infrastructure/interfaces/gestionObras/liquidarMateriales/saveLiquiMateObra.request';
import {
  GrabarMaterialesObrasResponse,
  ValidarCuadroMaterialesResponse,
} from '../../infrastructure/interfaces/gestionObras/liquidarMateriales/saveLiquiMateObra.response';

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

export const validarCuadroMateriales = async (
  props: ValidarCuadroMaterialesRequest,
): Promise<ValidarCuadroMaterialesResponse> => {
  try {
    const {data} = await genoxxApi.post<ValidarCuadroMaterialesResponse>(
      '/obras/validar_cuadro_materiales',
      {
        vg_empr_codigo: props.vg_empr_codigo,
        vg_usua_perfil: props.vg_usua_perfil,
        vl_fecha_liquidacion: props.vl_fecha_liquidacion,
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const grabarMaterialesObras = async (
  props: GrabarMaterialesObrasRequest,
): Promise<GrabarMaterialesObrasResponse> => {
  try {
    const {estado, mensaje} = await validarCuadroMateriales({
      vg_empr_codigo: props.vg_empr_codigo,
      vg_usua_perfil: props.vg_usua_perfil,
      vl_fecha_liquidacion: props.vl_fecha_liquidacion,
    });

    if (estado === 1) {
      return {
        datos: 2, //* No se puede grabar, ya que el cuadro de materiales se encuentra cerrado
        mensaje: mensaje,
      };
    }

    const {data} = await genoxxApi.post<GrabarMaterialesObrasResponse>(
      '/obras/grabar_materiales_obras',
      {
        vg_empr_codigo: props.vg_empr_codigo,
        vg_usua_perfil: props.vg_usua_perfil,
        vg_usua_codigo: props.vg_usua_codigo,
        vl_usua_tipo: props.vl_usua_tipo,
        vl_regi_codigo: props.vl_regi_codigo,
        vl_fecha_liquidacion: props.vl_fecha_liquidacion,
        vl_maneja_stock_guia: props.vl_maneja_stock_guia,
        vl_materiales: props.vl_materiales,
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
