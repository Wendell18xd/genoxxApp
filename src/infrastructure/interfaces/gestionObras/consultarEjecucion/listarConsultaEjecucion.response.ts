import {
  ActividadesOrden,
  ConsultaEjecucion,
} from '../../../../domain/entities/ConsultaEjecucion';

export interface ListarConsultaEjecucionResponse {
  datos: ConsultaEjecucion[];
  mensaje: string;
}

export interface ListarActividadesResponse {
  datos: ActividadesOrden[];
  mensaje: string;
}
