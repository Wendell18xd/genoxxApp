import {genoxxApi} from '../../config/api/genoxxApi';
import {LoginResponse} from '../../infrastructure/interfaces/auth.response';
import {LoginRequest} from '../../infrastructure/interfaces/login.request';

export const getLogin = async (props: LoginRequest): Promise<LoginResponse> => {
  try {
    const {data} = await genoxxApi.post<LoginResponse>('/auth/iniciar_sesion', {
      txt_usua_codigo: props.usuaCodigo,
      txt_usua_clave: props.usuaClave,
      cbo_empr_codigo: props.emprCodigo,
    });

    return data;
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + error);
  }
};
