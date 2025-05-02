import {genoxxApi} from '../../config/api/genoxxApi';
import {VersionAppResponse} from '../../infrastructure/interfaces/auth.response';
import {LoginRequest} from '../../infrastructure/interfaces/login.request';

export const getLogin = async (
  props: LoginRequest,
): Promise<VersionAppResponse> => {
  try {
    const {data} = await genoxxApi.post<VersionAppResponse>(
      '/auth/iniciar_sesion',
      {
        usuaCodigo: props.usuaCodigo,
        usuaClave: props.usuaClave,
        emprCodigo: props.emprCodigo,
        recorded: props.recorded,
      },
    );

    return data;
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + error);
  }
};
