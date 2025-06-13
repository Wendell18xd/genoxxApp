import {create} from 'zustand';

type Opciones = 'menu' | 'liquidar' | 'ejecutar';

interface useObrasNavigationState {
  opcionSeleccionada?: Opciones;
  seleccionarOpcion: (opcion: Opciones) => void;
}

export const useObrasNavigationStore = create<useObrasNavigationState>()(
  set => ({
    opcionSeleccionada: 'menu',
    seleccionarOpcion: (opcion: Opciones) => set({opcionSeleccionada: opcion}),
  }),
);
