export interface InspeccionesAsignadasResponse {
  datos: InspeccionAsignadaDato[];
  mensaje: string;
}

export interface InspeccionAsignadaDato {
  codi_asignacion: string;
  codi_supervisor: string;
  nombre_supervisor: string;
  tipo_registro: string;
  tipo_inspeccion: string;
  nom_inspeccion: string;
  cant_inspeccion: string;
  cant_ejecutada: number;
  firma_supervisor: string;
  inc_proyecto: string;
  inc_trabajador: string;
  trab_escaner: string;
  firma_tecnico: string;
  obliga_preguntas: string;
  fecha_desde: string;
  fecha_hasta: string;
  cont_correlativo: string;
}

export interface InspeccionesEjecutadasResponse {
  datos: InspeccionEjecutadaDato[];
  mensaje: string;
  combos: ComboAreasPrevencion[];
}

export interface ComboAreasPrevencion {
  cod_para: string;
  nom_para: string;
}

export interface InspeccionEjecutadaDato {
  empr_codigo: string;
  tipo_inspeccion: string;
  nom_inspeccion: string;
  numero_inspeccion: string;
  tipo_registro: string;
  proy_alias: string;
  estado: string;
  fecha: string;
  firma_tecnico: string;
  firma_supervisor: string;
  inc_proyecto: string;
  inc_trabajador: string;
  trab_escaner: string;
  obliga_preguntas: string;
  proy_codigo: string;
  cont_correlativo: string;
}
