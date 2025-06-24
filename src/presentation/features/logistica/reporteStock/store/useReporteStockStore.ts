import {create} from 'zustand';
import {ReporteStock} from '../../../../../domain/entities/ReporteStock';

interface ReporteStockState {
  reporteStock?: ReporteStock;
  setReporteStock: (reporteStock: ReporteStock) => void;
  reset: () => void;
}

export const useReporteStockStore = create<ReporteStockState>()(set => ({
  reporteStock: undefined,
  setReporteStock: (reporteStock: ReporteStock) => set({reporteStock}),
  reset: () => set({reporteStock: undefined}),
}));
