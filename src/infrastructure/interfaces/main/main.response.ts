import {ArchivoNoticia, Noticia, VistaNoticia} from '../../../domain/entities/Noticia';

export interface NoticiasResponse {
  datos: NoticiaDato[];
  mensaje: string;
}

export interface NoticiaDato extends Noticia {}

export interface ArchivosNoticiaResponse {
  archivos: ArchivoNoticia[];
  vistas: VistaNoticia[];
  mensaje: string;
}
