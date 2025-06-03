import {create} from 'zustand';
import { ConsultaUnidades } from '../../../../../domain/entities/ConsultaUnidades';


interface PatenteStore {
  setOnSelectPatente: (fn: (patente: ConsultaUnidades) => void) => void;
  onSelect: ((patente: ConsultaUnidades) => void) | null;
   reset: () => void;
}

export const usePatenteStore = create<PatenteStore>(set => ({
  onSelect: null,
  setOnSelectPatente: fn => set({onSelect: fn}),
  reset: () => set({onSelect: null}),
}));
