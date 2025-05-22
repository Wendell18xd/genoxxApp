import {create} from 'zustand';

interface NoticiasState {
  refresh: boolean;
  setRefresh: (estado: boolean) => void;
}

export const useNoticiasStore = create<NoticiasState>()(set => ({
  refresh: false,
  setRefresh: estado => set({refresh: estado}),
}));
