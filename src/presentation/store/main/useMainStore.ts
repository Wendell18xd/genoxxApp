import {create} from 'zustand';
import {Menu} from '../../../domain/entities/User';

export interface MainState {
  moduloSelected?: Menu;
  menuSelected?: Menu;
  menusValid?: Menu[];
  drawerKey: string;
  setModuloSelected: (modulo: Menu) => void;
  setMenuSelected: (menu: Menu) => void;
  setMenusValid: (menus: Menu[]) => void;
  setDrawerKey: (drawerKey: string) => void;
  resetDrawerKey: () => void;
}

export const useMainStore = create<MainState>()(set => ({
  moduloSelected: undefined,
  menuSelected: undefined,
  drawerKey: '',
  menusValid: [],
  setModuloSelected: (modulo: Menu) => set({moduloSelected: modulo}),
  setMenuSelected: (menu: Menu) => set({menuSelected: menu}),
  setMenusValid: (menu: Menu[]) => set({menusValid: menu}),
  setDrawerKey: (drawerKey: string) => set({drawerKey: drawerKey}),
  resetDrawerKey: () => set({drawerKey: ''}),
}));
