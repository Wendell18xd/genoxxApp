import {create} from 'zustand';

interface ScannerState {
  codigo: string;
  setCodigo: (codigo: string) => void;
  resetCodigo: () => void;
}

export const useScannerStore = create<ScannerState>()(set => ({
  codigo: '',
  setCodigo: codigo => set({codigo}),
  resetCodigo: () => set({codigo: ''}),
}));
