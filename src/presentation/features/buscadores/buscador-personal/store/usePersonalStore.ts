import {create} from 'zustand';
import { Personal } from '../../../../../domain/entities/Personal';


interface PersonalState {
  setOnSelectPersonal: (fn: (personal: Personal) => void) => void;
  onSelect: ((personal: Personal) => void) | null;
  reset: () => void;
}

export const usePersonalStore = create<PersonalState>(set => ({
  onSelect: null,
  setOnSelectPersonal: fn => set({onSelect: fn}),
  reset: () => set({onSelect: null}),
}));
