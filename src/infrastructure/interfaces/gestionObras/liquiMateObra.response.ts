import {Obra} from '../../../domain/entities/Obra';

export interface ObrasResponse {
  datos: Obra[];
  mensaje: string;
}
