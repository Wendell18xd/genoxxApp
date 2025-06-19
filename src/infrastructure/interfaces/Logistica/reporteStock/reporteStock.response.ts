import { DetalleStock, StockSerie } from '../../../../domain/entities/ReporteStock';

export interface ReporteStockResponse {
    datos:        DetalleStock[];
    mensaje:      string;
    detalle:      StockSerie[];
}
