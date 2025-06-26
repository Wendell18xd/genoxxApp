import { ConsultaEjecucion } from '../../../../domain/entities/ConsultaEjecucion';

export interface ListarConsultaEjecucionResponse {
    datos: ConsultaEjecucion[];
    mensaje: string;
}
