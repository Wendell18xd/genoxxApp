import {User} from '../../../domain/entities/User';

export interface LoginResponse {
  datos: Datos;
  mensaje: string;
}

export interface Datos {
  estado: number;
  tipo_login: string;
  empresas: Empresa[];
  vehiculo: any[];
  usuario: Usuario;
  menu: any[];
}

export interface Empresa {
  empr_codigo: string;
  empr_nombre: string;
}

export interface Usuario extends User {}
