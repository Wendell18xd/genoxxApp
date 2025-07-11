import {Menu} from '../../../domain/entities/User';

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
  menu: Menu[];
}

export interface Empresa {
  empr_codigo: string;
  empr_nombre: string;
}

export interface Usuario {
  empr_documento: string;
  empr_codigo: string;
  empr_nombre: string;
  empr_pais: string;
  empr_timezone: string;
  usua_codigo: string;
  usua_tipo: string;
  usua_login: string;
  usua_nombre: string;
  usua_perfil: string;
  trab_documento: string;
  trab_estado: string;
  time_login: number;
}

export interface ForgotResponse {
  datos: ForgotDatos;
  mensaje: string;
}

export interface ForgotDatos {
  estado: number;
  usua_correo: string;
  tipo: string;
}

export interface UpdatePasswordResponse {
  datos: number;
  mensaje: string;
}
