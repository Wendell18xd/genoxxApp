export interface InspeccionesAsignadasRequest {
  vg_empr_codigo: string;
  vl_codi_supervisor: string;
  vl_fecha: string;
}

export interface InspeccionesEjecutadasRequest {
  vg_empr_codigo: string;
  vl_codi_supervisor: string;
  vl_fecha: string;
  vg_empr_pais: string;
}

