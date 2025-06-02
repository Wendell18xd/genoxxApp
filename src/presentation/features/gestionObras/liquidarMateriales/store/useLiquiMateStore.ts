import {create} from 'zustand';
import {Option} from 'react-native-paper-dropdown';

interface LiquiMateState {
  guias?: Option[];
  guiaSeleccionada: string;
  isRefetchLiquidacion: boolean;
  setGuias: (guias: Option[]) => void;
  setGuiaSeleccionada: (guia: string) => void;
  setIsRefetchLiquidacion: (isRefetch: boolean) => void;
  reset: () => void;
}

export const useLiquiMateStore = create<LiquiMateState>()(set => ({
  guias: [],
  guiaSeleccionada: 'TODOS',
  isRefetchLiquidacion: true,
  setGuias: (guias: Option[]) => set({guias}),
  setGuiaSeleccionada: (guia: string) => set({guiaSeleccionada: guia}),
  setIsRefetchLiquidacion: (isRefetch: boolean) =>
    set({isRefetchLiquidacion: isRefetch}),
  reset: () =>
    set({
      guias: [],
      guiaSeleccionada: 'TODOS',
      isRefetchLiquidacion: true,
    }),
}));
