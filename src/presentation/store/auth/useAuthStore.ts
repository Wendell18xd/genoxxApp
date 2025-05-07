import {create} from 'zustand';
import {User} from '../../../domain/entities/User';
import {getLogin, getOlvidoClave} from '../../../actions/auth/auth';
import {
  ForgotRequest,
  LoginRequest,
} from '../../../infrastructure/interfaces/auth/auth.request';
import {
  ForgotResponse,
  LoginResponse,
} from '../../../infrastructure/interfaces/auth/auth.response';
import {StorageAdapter} from '../../../config/adapter/storage-adapter';

export interface AuthState {
  user?: User;
  login: (props: LoginRequest) => Promise<LoginResponse>;
  forgot: (props: ForgotRequest) => Promise<ForgotResponse>;
}

export const useAuthStore = create<AuthState>()(set => ({
  user: undefined,
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

      set({user: resp.datos.usuario});

      return resp;
    } catch (error) {
      throw new Error('Error al iniciar sesión' + error);
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
        usua_codigo: '',
        usua_tipo: resp.datos.usua_tipo,
        usua_nombre: '',
        usua_perfil: '',
      };
      set({user: usuario});
      return resp;
    } catch (error) {
      throw new Error('Error al recuperar la contraseña' + error);
    }
  },
}));
