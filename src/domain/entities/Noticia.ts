export interface Noticia {
  nombre: string;
  nom_archivo: string;
  link: string;
  descripcion: string;
  cont_correlativo: number;
  ruta_completa: string;
  is_visto: number;
}

export interface ArchivoNoticia {
  comentario: string;
  archivo: string;
  cont_correlativo: string;
  ruta_completa: string;
}

export interface VistaNoticia {
  cod_ref: string;
  registro_desde: RegistroDesdeNoticia;
  trab_codigo: string;
  nombres: string;
  registro_fecha: string;
}

export enum RegistroDesdeNoticia {
  App = 'APP',
  Web = 'WEB',
}
