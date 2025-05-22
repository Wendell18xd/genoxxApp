import {OrdenATC} from '../../../../domain/entities/OrdenATC';

export interface DocumentoResponse {
  datos: OrdenATC[];
  mensaje: string;
}
