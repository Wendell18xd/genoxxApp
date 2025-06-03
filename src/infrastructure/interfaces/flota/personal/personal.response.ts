import {Personal} from '../../../../domain/entities/Personal';

export interface PersonalResponse {
  datos: Personal[];
  mensaje: string;
}
