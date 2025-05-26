export interface ObrasRequest {
  vl_empr_codigo: string;
  cbo_tipo_buscar_doc: string;
  txt_nro_buscar_doc: string;
  txt_proy_codigo: string;
  txt_codi_ejecuta: string;
  txt_cod_negocio: string;
}

export interface MateLiquiRequest {
  vl_empr_codigo: string;
  vl_reg_codigo: string;
  vl_regularizar: string;
}

export interface ValidaCierreObraRequest {
  vl_empr_codigo: string;
  vl_nro_orden: string;
}
