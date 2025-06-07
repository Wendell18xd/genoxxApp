export interface EnviarAlertaRequest {
  vg_empr_codigo: string;
  vg_usua_codigo: string;
  vg_usua_perfil: string;
  txt_tipo: string;
  txt_telefono: string;
  txt_comentario: string;
  txt_audio: string;
  vl_fotos: string[];
  vl_coord_x: string;
  vl_coord_y: string;
}


