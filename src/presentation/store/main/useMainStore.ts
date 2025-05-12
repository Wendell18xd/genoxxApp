import {create} from 'zustand';
import {Menu} from '../../../domain/entities/User';

export interface MainState {
  moduloSelected?: Menu;
  menuSelected?: Menu;
  setModuloSelected: (modulo: Menu) => void;
  setMenuSelected: (menu: Menu) => void;
}

export const useMainStore = create<MainState>()(set => ({
  moduloSelected: undefined,
  menuSelected: undefined,
  setModuloSelected: (modulo: Menu) => set({moduloSelected: modulo}),
  setMenuSelected: (menu: Menu) => set({menuSelected: menu}),
}));
