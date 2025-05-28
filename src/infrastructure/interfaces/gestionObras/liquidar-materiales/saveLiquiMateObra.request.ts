export interface SaveLiquiMateObraRequest {
  vg_empr_codigo: string;
  vl_reg_codigo: string;
  vg_usua_perfil: string;
  vl_materiales: MaterialesLiquiRequest[];
}

export interface MaterialesLiquiRequest {
  vl_mate_cantidad: string;
  vl_mate_observacion: string;
}
