import {create} from 'zustand';
import {Obra} from '../../../../domain/entities/Obra';

interface LiquiMateState {
  obra?: Obra;
  isRefresthObra: boolean;
  setObra: (obra: Obra) => void;
  setIsRefresthObra: (isRefresthObra: boolean) => void;
  reset: () => void;
}

export const useObrasStore = create<LiquiMateState>()(set => ({
  obra: undefined,
  isRefresthObra: false,
  setObra: (obra: Obra) => set({obra}),
  setIsRefresthObra: (isRefresthObra: boolean) => set({isRefresthObra}),
  reset: () => set({obra: undefined}),
}));
