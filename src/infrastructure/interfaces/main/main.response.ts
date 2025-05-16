export interface NoticiasResponse {
  datos: NoticiaDato[];
  mensaje: string;
}

export interface NoticiaDato {
  nombre: string;
  nom_archivo: string;
  link: string;
  descripcion: string;
  cont_correlativo: string;
  ruta_completa: string;
  is_visto: number;
}
