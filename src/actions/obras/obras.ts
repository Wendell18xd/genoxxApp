import {genoxxApi} from '../../config/api/genoxxApi';
import {ObrasRequest} from '../../infrastructure/interfaces/gestionObras/liquidar-materiales/liquiMateObra.request';
import {ObrasResponse} from '../../infrastructure/interfaces/gestionObras/liquidar-materiales/liquiMateObra.response';
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
      },
    );
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
