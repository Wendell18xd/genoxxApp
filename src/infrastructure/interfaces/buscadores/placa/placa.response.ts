import { Placa } from '../../../../domain/entities/Placa';

export interface PlacaResponse {
  datos: Placa[];
  mensaje: string;
}
