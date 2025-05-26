export interface Alertas {
  datos: AlertaDato[];
  mensaje: string;
  cod_para: string;
  nom_para: string;
  correos: string;
}

export interface AlertaDato {
  cod_para: string;
  nom_para: string;
  correos: string;
}
