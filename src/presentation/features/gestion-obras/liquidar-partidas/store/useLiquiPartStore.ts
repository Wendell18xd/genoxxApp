import {create} from 'zustand';

interface useLiquiPartState {
  isRefetchLiquidacion: boolean;
  setIsRefetchLiquidacion: (isRefetch: boolean) => void;
  reset: () => void;
}

export const useLiquiPartStore = create<useLiquiPartState>()(set => ({
  isRefetchLiquidacion: true,
  setIsRefetchLiquidacion: (isRefetch: boolean) =>
    set({isRefetchLiquidacion: isRefetch}),
  reset: () => set({isRefetchLiquidacion: true}),
}));
