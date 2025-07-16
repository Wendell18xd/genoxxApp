import {create} from 'zustand';

interface FirmaState {
  firma: string | null;
  setFirma: (firma: string) => void;
  clearFirma: () => void;
}

export const useFirmaStore = create<FirmaState>()(set => ({
  firma: null,
  setFirma: firma => set({firma}),
  clearFirma: () => set({firma: null}),
}));
