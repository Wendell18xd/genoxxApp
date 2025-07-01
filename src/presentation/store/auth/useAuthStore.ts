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
import {
  deleteAllEmpresaDB,
  insertEmpresaDB,
  listAllEmpresaDB,
} from '../../services/database/tablas/EmpresaTabla';
import {checkInternet} from '../../helper/network';

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
    const internet = await checkInternet();

    const buildUserInstance = (usuario: any): User =>
      new User(
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
        Date.now(),
        usuario.empr_documento,
      );

    try {
      if (internet) {
        const resp = await getLogin({
          usuaCodigo: props.usuaCodigo,
          usuaClave: props.usuaClave,
          emprCodigo: props.emprCodigo,
          recorded: props.recorded,
        });

        const {
          estado,
          usuario: usuarioResp,
          menu,
          empresas,
          tipo_login,
        } = resp.datos;

        let usuario = usuarioResp;

        //* Estado 3: Ajustar tipo de login
        if (estado === 3) {
          usuario = {
            ...usuario,
            usua_codigo: props.usuaCodigo,
            usua_tipo: tipo_login,
          };
        }

        //* Estado 5: Guardar empresas
        if (estado === 5 && empresas) {
          await deleteAllEmpresaDB();
          await Promise.all(empresas.map(insertEmpresaDB));
        }

        //* Estado 1: Guardar usuario y menú
        if (estado === 1) {
          await StorageAdapter.setItem(
            'usuario',
            JSON.stringify({
              ...usuario,
              recorded: props.recorded,
              usua_clave: props.usuaClave,
            }),
          );

          await StorageAdapter.setItem('menu', JSON.stringify(menu));
          useSessionStore.getState().setAuthenticated(true);
        }

        const userInstance = buildUserInstance(usuario);
        set({user: userInstance, menu});

        return resp;
      } else {
        //* Modo offline
        const usuarioStr = await StorageAdapter.getItem('usuario');
        const menu: Menu[] = JSON.parse(
          (await StorageAdapter.getItem('menu')) || '[]',
        );
        const empresas = await listAllEmpresaDB();

        if (!usuarioStr)
          throw new Error(
            'No hay conexión a internet y no hay usuario guardado',
          );

        const usuario = JSON.parse(usuarioStr);
        if (
          props.usuaCodigo !== usuario.usua_codigo ||
          props.usuaClave !== usuario.usua_clave
        ) {
          return {
            datos: {
              estado: 0,
              correo: '',
              tipo_login: '',
              empresas,
              vehiculo: [],
              menu,
              usuario,
            },
            mensaje: 'Credenciales incorrectas',
          };
        }
        const userInstance = buildUserInstance(usuario);

        set({user: userInstance, menu});

        return {
          datos: {
            estado: props.emprCodigo === '' ? 5 : 1,
            correo: '',
            tipo_login: '',
            empresas,
            vehiculo: [],
            menu,
            usuario,
          },
          mensaje: 'No hay conexión a internet',
        };
      }
    } catch (error) {
      throw new Error((error as Error).message);
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
