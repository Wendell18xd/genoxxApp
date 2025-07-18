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
import messaging from '@react-native-firebase/messaging';

export const getLogin = async (props: LoginRequest): Promise<LoginResponse> => {
  try {
    const {data} = await genoxxApi.post<LoginResponse>('/auth/iniciar_sesion', {
      txt_usua_codigo: props.usuaCodigo,
      txt_usua_clave: props.usuaClave,
      cbo_empr_codigo: props.emprCodigo,
    });

    if (data.datos.estado === 1) {
      await requestToken({
        vg_empr_codigo: data.datos.usuario.empr_codigo,
        vg_usua_perfil: data.datos.usuario.usua_perfil,
      });
    }

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

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

const requestToken = async (props: {
  vg_empr_codigo: string;
  vg_usua_perfil: string;
}) => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    await genoxxApi.post<LoginResponse>('/auth/save_device_id', {
      vg_empr_codigo: props.vg_empr_codigo,
      vg_usua_perfil: props.vg_usua_perfil,
      vl_device_id: token,
    });
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};
