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
import {useSessionStore} from '../useSessionStore';

export interface AuthState {
  user?: User;
  menu?: Menu[];
  login: (props: LoginRequest) => Promise<LoginResponse>;
  forgot: (props: ForgotRequest) => Promise<ForgotResponse>;
  update: (props: UpdatePasswordRequest) => Promise<UpdatePasswordResponse>;
  logout: () => void;
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
          useSessionStore.getState().setAuthenticated(true);
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

      const userInstance = new User(
        usuario.empr_codigo,
        usuario.empr_nombre,
        usuario.empr_pais,
        usuario.empr_timezone,
        usuario.usua_codigo,
        usuario.usua_tipo,
        usuario.usua_login,
        usuario.usua_nombre,
        usuario.usua_perfil,
        usuario.trab_documento,
        usuario.trab_estado,
        new Date().getTime(),
        usuario.empr_documento,
      );

      set({user: userInstance});
      set({menu: resp.datos.menu});

      return resp;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  forgot: async (props: ForgotRequest) => {
    try {
      const resp = await getOlvidoClave(props);
      const usuario: User = new User(
        '',
        '',
        '',
        '',
        props.usuaCodigo,
        resp.datos.tipo,
        '',
        '',
        '',
        '',
        '',
        new Date().getTime(),
        '',
      );
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
  logout: () => {
    set({user: undefined, menu: []});
    useSessionStore.getState().logout();
  },
}));
