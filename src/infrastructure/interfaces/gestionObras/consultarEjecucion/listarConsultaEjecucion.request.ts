export interface ListarConsultaEjecucionRequest {
  vg_empr_codigo: string;
  txt_fecha_inicio: string;
  txt_fecha_final: string;
  vl_codi_perfil: string;
  cbo_elegido: string;
  txt_buscar: string;
  txt_actividad: string;
  txt_hora: string;
}

export interface ListarActividadesRequest {
  vg_empr_pais: string;
}
