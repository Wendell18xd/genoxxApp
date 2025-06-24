import {ConsultaInspecciones} from '../../../../domain/entities/ConsultaInspecciones';

export interface ConsultaInspeccionesResponse {
  datos: ConsultaInspecciones[];
  mensaje: string;
}
