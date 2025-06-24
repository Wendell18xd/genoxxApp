export interface SaveEjecucionObrasRequest {
  vg_empr_codigo: string;
  vg_usua_perfil: string;
  vl_obse_ejecutado: string;
  vl_regi_codigo: string;
  vl_cod_actividad: string;
  vl_coord_x: string;
  vl_coord_y: string;
  vl_tramo: string;
  vl_cantidad: string;
  vl_cierre: string;
  vl_fotos: string[];
}

export interface SaveEjecucionSinObrasResquest {
  vg_empr_codigo: string;
  vg_usua_perfil: string;
  vg_empr_pais: string;
  txt_actividad: string;
  txt_comentario: string;
  txt_situacion: string;
  txt_hora_inicio: string;
  txt_hora_fin: string;
  txt_fecha: string;
  vl_coord_x: string;
  vl_coord_y: string;
  vl_turno: string;
  vl_transcurrido_inicio: string;
  vl_transcurrido_fin: string;
  vl_registro_fecha_inicio: string;
  vl_automatico: string;
}
