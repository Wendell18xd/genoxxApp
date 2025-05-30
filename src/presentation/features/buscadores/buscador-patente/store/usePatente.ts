import {create} from 'zustand';
import { ConsultaUnidades } from '../../../../../domain/entities/ConsultaUnidades';


interface PatenteStore {
  setOnSelect: (fn: (patente: ConsultaUnidades) => void) => void;
  onSelect: ((patente: ConsultaUnidades) => void) | null;
}

export const usePatenteStore = create<PatenteStore>(set => ({
  onSelect: null,
  setOnSelect: fn => set({onSelect: fn}),
}));
