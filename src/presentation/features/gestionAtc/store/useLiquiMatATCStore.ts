import {create} from 'zustand';
import {OrdenATC} from '../../../../domain/entities/OrdenATC';

interface LiquiMatATCState {
  LiquidacionMat?: OrdenATC;
  isRefetchLiquidacionMat: boolean;
  setLiquidacionMat: (LiquidacionMat: OrdenATC) => void;
  setIsRefetchLiquidacionMat: (isRefresthLiquidacionMat: boolean) => void;
  reset: () => void;
}

export const useLiquiMatATCStore = create<LiquiMatATCState>()(set => ({
  LiquidacionMat: undefined,
  isRefetchLiquidacionMat: false,
  setLiquidacionMat: (LiquidacionMat: OrdenATC) => set({LiquidacionMat}),
  setIsRefetchLiquidacionMat: (isRefetchLiquidacionMat: boolean) =>
    set({isRefetchLiquidacionMat}),
  reset: () => set({LiquidacionMat: undefined}),
}));
