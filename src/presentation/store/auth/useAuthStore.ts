import {create} from 'zustand';
import {Menu, User} from '../../../domain/entities/User';
import {
  getLogin,
  getOlvidoClave,
  updatePassword,
} from '../../../actions/auth/auth';
import {
  ForgotRequest,
  LoginRequest,
  UpdatePasswordRequest,
} from '../../../infrastructure/interfaces/auth/auth.request';
import {
  ForgotResponse,
  LoginResponse,
  UpdatePasswordResponse,
} from '../../../infrastructure/interfaces/auth/auth.response';
import {StorageAdapter} from '../../adapter/storage-adapter';

export interface AuthState {
  user?: User;
  menu?: Menu[];
  login: (props: LoginRequest) => Promise<LoginResponse>;
  forgot: (props: ForgotRequest) => Promise<ForgotResponse>;
  update: (props: UpdatePasswordRequest) => Promise<UpdatePasswordResponse>;
}

export const useAuthStore = create<AuthState>()(set => ({
  user: undefined,
  menu: [],
  login: async (props: LoginRequest) => {
    try {
      const resp = await getLogin({
        usuaCodigo: props.usuaCodigo,
        usuaClave: props.usuaClave,
        emprCodigo: props.emprCodigo,
        recorded: props.recorded,
      });

      const {estado} = resp.datos;

      if (estado === 1) {
        if (props.recorded) {
          await StorageAdapter.setItem(
            'usuario',
            JSON.stringify({
              ...resp.datos.usuario,
              recorded: props.recorded,
              usua_clave: props.usuaClave,
            }),
          );
        } else {
          await StorageAdapter.removeItem('usuario');
        }
      }

      let usuario = resp.datos.usuario;

      if (estado === 3) {
        usuario = {
          ...usuario,
          usua_codigo: props.usuaCodigo,
          usua_tipo: resp.datos.tipo_login,
        };
      }

      set({user: {...usuario, time_login: new Date().getTime()}});
      set({menu: resp.datos.menu});

      return resp;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  forgot: async (props: ForgotRequest) => {
    try {
      const resp = await getOlvidoClave(props);
      const usuario: User = {
        empr_codigo: '',
        empr_nombre: '',
        empr_pais: '',
        empr_timezone: '',
        usua_codigo: props.usuaCodigo,
        usua_tipo: resp.datos.tipo,
        usua_login: '',
        usua_nombre: '',
        usua_perfil: '',
        trab_documento: '',
        time_login: new Date().getTime(),
      };
      set({user: usuario});
      return resp;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  update: async (props: UpdatePasswordRequest) => {
    try {
      const resp = await updatePassword(props);
      return resp;
    } catch (error) {
      throw new Error(error as string);
    }
  },
}));
