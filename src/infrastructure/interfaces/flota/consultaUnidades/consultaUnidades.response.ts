import { ConsultaUnidades } from '../../../../domain/entities/ConsultaUnidades';

export interface ConsultaUnidadesResponse {
  datos: ConsultaUnidades[];
  mensaje: string;
}
