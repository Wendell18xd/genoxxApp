import {Noticia} from '../../../domain/entities/Noticia';

export interface NoticiasResponse {
  datos: NoticiaDato[];
  mensaje: string;
}

export interface NoticiaDato extends Noticia {}
