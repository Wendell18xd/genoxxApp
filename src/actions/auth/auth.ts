import {genoxxApi} from '../../config/api/genoxxApi';
import {
  LoginResponse,
  UpdatePasswordResponse,
} from '../../infrastructure/interfaces/auth/auth.response';
import {
  ForgotRequest,
  LoginRequest,
  UpdatePasswordRequest,
} from '../../infrastructure/interfaces/auth/auth.request';

import {ForgotResponse} from '../../infrastructure/interfaces/auth/auth.response';

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

export const getOlvidoClave = async (
  props: ForgotRequest,
): Promise<ForgotResponse> => {
  try {
    const {data} = await genoxxApi.post<ForgotResponse>(
      '/auth/usuario_olvido_clave',
      {
        txt_usua_codigo: props.usuaCodigo,
      },
    );
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updatePassword = async (
  props: UpdatePasswordRequest,
): Promise<UpdatePasswordResponse> => {
  try {
    const {data} = await genoxxApi.post<UpdatePasswordResponse>(
      '/auth/actualizar_clave_nueva',
      {
        vl_usua_codigo: props.usuaCodigo,
        vl_tipo_login: props.tipoLogin,
        txt_usua_clave: props.usuaClave,
        txt_usua_clave2: props.usuaClave2,
        txt_trab_fecnaci: props.trabFecnaci,
      },
    );
    console.log(data);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
