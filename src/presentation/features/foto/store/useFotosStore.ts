import {create} from 'zustand';

interface useFotosState {
  fotos: string[];
  setFotos: (value: string[]) => void;
}

export const useFotosStore = create<useFotosState>()(set => ({
  fotos: [],
  setFotos: (value: string[]) => set({fotos: value}),
}));
