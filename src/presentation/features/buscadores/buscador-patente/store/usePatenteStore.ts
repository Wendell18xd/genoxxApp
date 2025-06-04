import {create} from 'zustand';
import { Placa } from '../../../../../domain/entities/Placa';


interface usePatenteStore {
  setOnSelectPatente: (fn: (patente: Placa) => void) => void;
  onSelect: ((patente: Placa) => void) | null;
   resetPatente: () => void;
}

export const usePatenteStore = create<usePatenteStore>(set => ({
  onSelect: null,
  setOnSelectPatente: fn => set({onSelect: fn}),
  resetPatente: () => set({onSelect: null}),
}));
