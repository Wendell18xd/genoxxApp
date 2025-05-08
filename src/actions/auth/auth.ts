import {genoxxApi} from '../../config/api/genoxxApi';
import {LoginResponse} from '../../infrastructure/interfaces/auth/auth.response';
import {LoginRequest} from '../../infrastructure/interfaces/auth/auth.request';

export const getLogin = async (props: LoginRequest): Promise<LoginResponse> => {
  try {
    const {data} = await genoxxApi.post<LoginResponse>('/auth/iniciar_sesion', {
      txt_usua_codigo: props.usuaCodigo,
      txt_usua_clave: props.usuaClave,
      cbo_empr_codigo: props.emprCodigo,
    });
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
