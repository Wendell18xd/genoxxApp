import {genoxxApi} from '../../config/api/genoxxApi';
import {LoginResponse} from '../../infrastructure/interfaces/auth/auth.response';
import {ForgotRequest, LoginRequest} from '../../infrastructure/interfaces/auth/auth.request';

import { ForgotResponse } from '../../infrastructure/interfaces/auth/auth.response';

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
    throw new Error('Error al iniciar sesión: ' + error);
  }
};

export const getOlvidoClave = async (props: ForgotRequest): Promise<ForgotResponse> => {
  try {
    const { data } = await genoxxApi.post<ForgotResponse>('/auth/usuario_olvido_clave', {
      txt_usua_codigo: props.usuaCodigo,
    });
    console.log(data);
    return data;
  } catch (error) {
    throw new Error('Error al recuperar la contraseña: ' + error);
  }
};



