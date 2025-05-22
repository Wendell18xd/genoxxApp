import {OrdenATC} from '../../../../domain/entities/OrdenATC';

export interface DocumentoOrdenesResponse {
  datos: OrdenATC[];
  mensaje: string;
}
