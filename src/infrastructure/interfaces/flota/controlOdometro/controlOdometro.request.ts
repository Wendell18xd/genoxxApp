export interface ConsultaConductorPlacaRequest {
  vl_empr_codigo: string;
  txt_nro_placa: string;
}

export interface ConsultaPlacaConductorRequest {
  vl_empr_codigo: string;
  txt_codi_perfil: string;
}

export interface SaveControlOdometroRequest {
  vl_empr_codigo: string;
  placa: string;
  txt_codi_perfil: string;
  txt_user: string;
  txt_kilometraje: string;
  txt_comentario: string;
  vl_coord_x: string;
  vl_coord_y: string;
  vl_fotos: string[];
}
