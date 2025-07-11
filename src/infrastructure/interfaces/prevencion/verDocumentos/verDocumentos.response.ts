import {Dato} from '../../../../domain/entities/VerDocumentos';

export interface VerDocumentosResponse {
  datos: Dato[];
  mensaje: string;
}
