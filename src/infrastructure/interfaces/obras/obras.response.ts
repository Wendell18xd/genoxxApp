import {ProyectoObra} from '../../../domain/entities/ProyectoObra';

export interface ProyectosObrasResponse {
  datos: ProyectoObra[];
  mensaje: string;
}
