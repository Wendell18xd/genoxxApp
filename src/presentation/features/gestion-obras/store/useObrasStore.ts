import {create} from 'zustand';
import {Obra} from '../../../../domain/entities/Obra';

interface LiquiMateState {
  obra?: Obra;
  tipoSeleccion?: 'liquidar' | 'ejecutar';
  setObra: (obra: Obra) => void;
  setTipoSeleccion: (tipo: 'liquidar' | 'ejecutar') => void;
  reset: () => void;
}

export const useObrasStore = create<LiquiMateState>()(set => ({
  obra: undefined,
  tipoSeleccion: undefined,
  setObra: (obra: Obra) => set({obra}),
  setTipoSeleccion: (tipo: 'liquidar' | 'ejecutar') =>
    set({tipoSeleccion: tipo}),
  reset: () => set({obra: undefined, tipoSeleccion: undefined}),
}));
