import {create} from 'zustand';
import { Placa } from '../../../../../domain/entities/Placa';


interface PatenteStore {
  setOnSelectPatente: (fn: (patente: Placa) => void) => void;
  onSelect: ((patente: Placa) => void) | null;
   reset: () => void;
}

export const usePatenteStore = create<PatenteStore>(set => ({
  onSelect: null,
  setOnSelectPatente: fn => set({onSelect: fn}),
  reset: () => set({onSelect: null}),
}));
