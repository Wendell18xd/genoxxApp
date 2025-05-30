import {Alertas} from '../../../../domain/entities/Alertas';

export interface AlertaDato {
  cod_para: string;
  nom_para: string;
  correos: string;
  txt_audio: string;
}

export interface AlertaResponse {
  datos: Alertas[];
  mensaje: string;
}
