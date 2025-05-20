import {RegistroDesdeNoticia} from '../../../domain/entities/Noticia';
export interface NoticiasRequest {
  vl_empr_codigo: string;
  vl_trab_codigo: string;
  vl_is_app: boolean;
}
export interface ArchivosNoticiaRequest {
  vl_empr_codigo: string;
  vl_trab_codigo: string;
  vl_cont_correlativo: number;
  vl_registro_desde: RegistroDesdeNoticia;
  vl_is_visto: number;
}
