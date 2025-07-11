import { ConsultaInspeccionPrevencion } from '../../../../domain/entities/ConsultaInspeccionPrevencion';

export interface ConsultaInspeccionResponse {
  datos: ConsultaInspeccionPrevencion[];
  mensaje: string;
}
