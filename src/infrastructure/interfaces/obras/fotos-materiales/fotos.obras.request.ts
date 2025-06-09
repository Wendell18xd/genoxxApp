export interface GrabarFotosObrasRequest {
  vg_empr_codigo: string;
  vg_usua_codigo: string;
  vl_regi_codigo: string;
  vl_origen_archivo: string;
  vl_tipo_archivo: string;
  vl_fotos: string[];
  vl_fotos_comentarios: string[];
  vl_coord_x: string;
  vl_coord_y: string;
}

export interface ListarFotosObrasRequest {
  vg_empr_codigo: string;
  vg_usua_codigo: string;
  vl_tipo_archivo: string;
  vl_regi_codigo: string;
  vl_origen_archivo: string;
}
