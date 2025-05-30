import {ConsultaHistoricaPatente} from '../../../../domain/entities/ConsultaHistoricaPatente';

export interface ConsultaHistoricaPatenteResponse {
  datos: ConsultaHistoricaPatente[];
  mensaje: string;
}
