import {genoxxApi} from '../../config/api/genoxxApi';
import {
  ArchivosNoticiaRequest,
  NoticiasRequest,
} from '../../infrastructure/interfaces/main/main.request';
import {
  ArchivosNoticiaResponse,
  NoticiasResponse,
} from '../../infrastructure/interfaces/main/main.response';

export const listadoNoticiasActivas = async (
  props: NoticiasRequest,
): Promise<NoticiasResponse> => {
  try {
    const {data} = await genoxxApi.post<NoticiasResponse>(
      '/master/listado_notificaciones_activas',
      {
        vl_empr_codigo: props.vl_empr_codigo,
        vl_trab_codigo: props.vl_trab_codigo,
        vl_is_app: props.vl_is_app,
      },
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const listadoArchivosNoticia = async (
  props: ArchivosNoticiaRequest,
): Promise<ArchivosNoticiaResponse> => {
  try {
    const {data} = await genoxxApi.post<ArchivosNoticiaResponse>(
      '/master/listar_archivos_notificaciones',
      {
        vl_empr_codigo: props.vl_empr_codigo,
        vl_trab_codigo: props.vl_trab_codigo,
        vl_cont_correlativo: props.vl_cont_correlativo,
        vl_registro_desde: props.vl_registro_desde,
        vl_is_visto: props.vl_is_visto,
      },
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
