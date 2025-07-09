export interface VerDocumentos {
  datos: Dato[];
  mensaje: string;
}

export interface Dato {
  nom_grupo: string;
  arrHijos: ArrHijo[];
}

export interface ArrHijo {
  cod_documento: string;
  nom_archivo: string;
  fecha_vencimiento: string;
  nom_documento: string;
}
