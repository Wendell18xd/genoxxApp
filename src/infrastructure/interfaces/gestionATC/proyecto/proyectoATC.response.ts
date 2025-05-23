export interface ProyectoResponse {
  datos: ProyectoDato[];
  mensaje: string;
}

export interface ProyectoDato {
  proy_codigo: string;
  proy_alias: string;
  proy_tipo: string;
}
