export interface GrabarFotosObrasResponse {
  datos: number;
  mensaje: string;
}

export interface ListarFotosObrasResponse {
  datos: DatoFoto[];
  mensaje: string;
}

export interface DatoFoto {
  fecha: string;
  fotos: Foto[];
}

export interface Foto {
  nombre_archivo: string;
  registro_fecha: string;
  ruta_archivo: string;
}
