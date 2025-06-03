import {create} from 'zustand';
import {Obra} from '../../../../../domain/entities/Obra';

interface LiquiMateState {
  obra?: Obra;
  setObra: (obra: Obra) => void;
  reset: () => void;
}

export const useLiquiMateStore = create<LiquiMateState>()(set => ({
  obra: undefined,
  setObra: (obra: Obra) => set({obra}),
  reset: () => set({obra: undefined}),
}));
