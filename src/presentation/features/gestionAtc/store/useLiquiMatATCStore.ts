import {Option} from 'react-native-paper-dropdown';
import {create} from 'zustand';

interface LiquiMatATCState {
  liquidacion: Option[];
  liquidacionSeleccionada: string;
  isRefetchLiquidacion: boolean;
  setLiquidacion: (liquidacion: Option[]) => void;
  setLiquidacionSeleccionada: (liquidacion: string) => void;
  setIsRefetchLiquidacion: (isRefetch: boolean) => void;
  reset: () => void;
}

export const useLiquiMatATCStore = create<LiquiMatATCState>()(set => ({
  liquidacion: [],
  liquidacionSeleccionada: 'TODOS',
  isRefetchLiquidacion: true,
  setLiquidacion: (liquidacion: Option[]) => set({liquidacion}),
  setLiquidacionSeleccionada: (liquidacion: string) =>
    set({liquidacionSeleccionada: liquidacion}),
  setIsRefetchLiquidacion: (isRefetch: boolean) =>
    set({isRefetchLiquidacion: isRefetch}),
  reset: () =>
    set({
      liquidacion: [],
      liquidacionSeleccionada: 'TODOS',
      isRefetchLiquidacion: true,
    }),
}));
