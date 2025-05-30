import {create} from 'zustand';
import { Personal } from '../../../../../domain/entities/Personal';


interface PersonalState {
  setOnSelect: (fn: (personal: Personal) => void) => void;
  onSelect: ((personal: Personal) => void) | null;
}

export const usePersonalStore = create<PersonalState>(set => ({
  onSelect: null,
  setOnSelect: fn => set({onSelect: fn}),
}));
