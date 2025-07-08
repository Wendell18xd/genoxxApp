import {
  ConsultaConductorPlaca,
  ConsultaPlacaConductor,
} from '../../../../domain/entities/ControlOdometro';

export interface ConsultaConductorPlacaResponse {
  datos: ConsultaConductorPlaca[];
  mensaje: string;
}

export interface ConsultaPlacaConductorResponse {
  datos: ConsultaPlacaConductor[];
  mensaje: string;
}

export interface SaveControlOdometroResponse {
  datos: number;
  mensaje: string;
}

