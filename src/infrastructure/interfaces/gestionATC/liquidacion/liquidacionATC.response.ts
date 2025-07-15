import {LiquidacionATC} from '../../../../domain/entities/LiquidacionATC';

export interface LiquidacionATCResponse {
  datos: LiquidacionATC[];
  mensaje: string;
}
