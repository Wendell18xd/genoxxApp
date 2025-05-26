import {MateLiqui} from '../../../domain/entities/MateLiqui';
import {Obra} from '../../../domain/entities/Obra';

export interface ObrasResponse {
  datos: Obra[];
  mensaje: string;
}

export interface MateLiquiObrasResponse {
  datos: MateLiqui[];
  mensaje: string;
}
export interface ValidaCierreObrasResponse {
  mensaje: string;
  est_cierre_material: string;
  est_cierre: string;
}
