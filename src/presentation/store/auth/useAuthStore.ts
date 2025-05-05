import {create} from 'zustand';
import {User} from '../../../domain/entities/User';
import {getLogin} from '../../../actions/auth/auth';
import {LoginRequest} from '../../../infrastructure/interfaces/auth/auth.request';
import {LoginResponse} from '../../../infrastructure/interfaces/auth/auth.response';

export interface AuthState {
  user?: User;
  login: (props: LoginRequest) => Promise<LoginResponse>;
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
      set({user: resp.datos.usuario});

      return resp;
    } catch (error) {
      throw new Error('Error al iniciar sesión' + error);
    }
  },
}));
