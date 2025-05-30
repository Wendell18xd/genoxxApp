export interface ValidarCuadroMaterialesRequest {
  vg_empr_codigo: string;
  vg_usua_perfil: string;
  vl_fecha_liquidacion: string;
}

export interface GrabarMaterialesObrasRequest {
  vg_empr_codigo: string;
  vg_usua_perfil: string;
  vg_usua_codigo: string;
  vl_usua_tipo: string;
  vl_regi_codigo: string;
  vl_fecha_liquidacion: string;
  vl_maneja_stock_guia: string;
  vl_materiales: MaterialesLiquiRequest[];
}

export interface MaterialesLiquiRequest {
  vl_mate_codigo: string;
  vl_guia_codigo: string;
  vl_guia_numero: string;
  vl_mate_lote: string;
  vl_mate_cantidad: number;
  vl_mate_observacion: string;
}
