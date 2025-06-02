import {create} from 'zustand';
import {Foto, ParamsFoto} from '../../../../domain/entities/Foto';

interface useFotosState {
  initialParams: ParamsFoto;
  fotos: Foto[];
  setInitialParams: (value: ParamsFoto) => void;
  setFotos: (value: Foto[]) => void;
  onReset: () => void;
}

export const useFotosStore = create<useFotosState>()(set => ({
  fotos: [],
  initialParams: {
    maxFotos: 0,
    minFotos: 0,
    isComentario: false,
    isSave: false,
    onSave: async () => {},
  },
  setInitialParams: (value: ParamsFoto) => set({initialParams: value}),
  setFotos: (value: Foto[]) => set({fotos: value}),
  onReset: () =>
    set({
      fotos: [],
      initialParams: {
        maxFotos: 0,
        minFotos: 0,
        isComentario: false,
        isSave: false,
        onSave: async () => {},
      },
    }),
}));
