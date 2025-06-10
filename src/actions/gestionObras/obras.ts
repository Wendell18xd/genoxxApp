import {genoxxApi} from '../../config/api/genoxxApi';
import {
  ObrasRequest,
  ValidaCierreObraRequest,
} from '../../infrastructure/interfaces/gestionObras/liquidarMateriales/liquiMateObra.request';
import {
  ObrasResponse,
  ValidaCierreObrasResponse,
} from '../../infrastructure/interfaces/gestionObras/liquidarMateriales/liquiMateObra.response';
import {ProyectosObrasRequest} from '../../infrastructure/interfaces/gestionObras/obras.request';
import {ProyectosObrasResponse} from '../../infrastructure/interfaces/gestionObras/obras.response';

export const listadoProyectosObras = async (
  props: ProyectosObrasRequest,
): Promise<ProyectosObrasResponse> => {
  try {
    console.log(props);
    const {data} = await genoxxApi.post<ProyectosObrasResponse>(
      '/obras/listar_proyectos_obras',
      {
        vg_empr_codigo: props.vl_empr_codigo,
        vl_proy_tipo: props.vl_proy_tipo,
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const listadoObrasAsiganadas = async (
  props: ObrasRequest,
): Promise<ObrasResponse> => {
  try {
    const {data} = await genoxxApi.post<ObrasResponse>(
      '/obras/consultar_documento_orden',
      {
        vg_empr_codigo: props.vl_empr_codigo,
        cbo_tipo_buscar_doc: props.cbo_tipo_buscar_doc,
        txt_nro_buscar_doc: props.txt_nro_buscar_doc,
        txt_proy_codigo: props.txt_proy_codigo,
        txt_codi_ejecuta: props.txt_codi_ejecuta,
        txt_cod_negocio: props.txt_cod_negocio,
        vl_opcion: props.vl_opcion,
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const validaCierreObra = async (
  props: ValidaCierreObraRequest,
): Promise<ValidaCierreObrasResponse> => {
  try {
    const {data} = await genoxxApi.post<ValidaCierreObrasResponse>(
      '/obras/get_valida_cierre_obra',
      {
        vg_empr_codigo: props.vl_empr_codigo,
        vl_nro_orden: props.vl_nro_orden,
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
