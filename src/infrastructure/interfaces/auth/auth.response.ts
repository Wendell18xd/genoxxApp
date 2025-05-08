import {User} from '../../../domain/entities/User';

export interface LoginResponse {
  datos: LoginDatos;
  mensaje: string;
}

export interface LoginDatos {
  estado: number;
  tipo_login: string;
  empresas: Empresa[];
  correo: string;
  vehiculo: any[];
  usuario: Usuario;
  menu: any[];
}

export interface Empresa {
  empr_codigo: string;
  empr_nombre: string;
}

export interface Usuario extends User {}

export interface ForgotResponse {
  datos: ForgotDatos;
  mensaje: string;
}

export interface ForgotDatos {
  estado: number;
  usua_correo: string;
  tipo: string;
  usua_tipo: string;
}
