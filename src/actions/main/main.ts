import {genoxxApi} from '../../config/api/genoxxApi';
import {NoticiasRequest} from '../../infrastructure/interfaces/main/main.request';
import {NoticiasResponse} from '../../infrastructure/interfaces/main/main.response';

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
