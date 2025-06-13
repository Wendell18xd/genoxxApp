import {create} from 'zustand';
import {Personal} from '../../../../../domain/entities/Personal';

interface usePersonalState {
  setOnSelectPersonal: (fn: (personal: Personal) => void) => void;
  onSelect: ((personal: Personal) => void) | null;
  resetPersonal: () => void;
}

export const usePersonalStore = create<usePersonalState>(set => ({
  onSelect: null,
  setOnSelectPersonal: fn => set({onSelect: fn}),
  resetPersonal: () => set({onSelect: null}),
}));
