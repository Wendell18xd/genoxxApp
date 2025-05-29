import {create} from 'zustand';
import {Obra} from '../../../../../domain/entities/Obra';
import {Option} from 'react-native-paper-dropdown';

interface LiquiMateState {
  obra?: Obra;
  guias?: Option[];
  guiaSeleccionada: string;
  setObra: (obra: Obra) => void;
  setGuias: (guias: Option[]) => void;
  setGuiaSeleccionada: (guia: string) => void;
  reset: () => void;
}

export const useLiquiMateStore = create<LiquiMateState>()(set => ({
  obra: undefined,
  guias: [],
  guiaSeleccionada: 'TODOS',
  materialesSeleccionados: [],
  setObra: (obra: Obra) => set({obra}),
  setGuias: (guias: Option[]) => set({guias}),
  setGuiaSeleccionada: (guia: string) => set({guiaSeleccionada: guia}),
  reset: () =>
    set({
      obra: undefined,
      guias: [],
      guiaSeleccionada: 'TODOS',
    }),
}));
