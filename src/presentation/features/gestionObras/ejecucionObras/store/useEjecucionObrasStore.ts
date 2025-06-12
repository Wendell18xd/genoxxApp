import {create} from 'zustand';
import {ActividadesObrasResponse} from '../../../../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.response';
import {ActividadesObrasRequest} from '../../../../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.request';
import {listarActividadesObras} from '../../../../../actions/gestionObras/ejecucion.obras';
import {Option} from 'react-native-paper-dropdown';
import {mapToDropdown} from '../../../../../infrastructure/mappers/mapToDropdown';

interface useEjecucionObrasState {
  actividades?: ActividadesObrasResponse;
  mapDropFamilia?: Option[];
  loading: boolean;
  getActividadesObras: (
    value: ActividadesObrasRequest,
  ) => Promise<ActividadesObrasResponse>;
  onReset: () => void;
}

export const useEjecucionObrasStore = create<useEjecucionObrasState>()(set => ({
  actividades: undefined,
  loading: false,
  getActividadesObras: async (value: ActividadesObrasRequest) => {
    try {
      set({loading: true});
      const data = await listarActividadesObras(value);
      set({actividades: data});
      set({
        mapDropFamilia: mapToDropdown(data.familia, 'familia', 'familia'),
      });
      set({loading: false});
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  onReset: () => set({actividades: undefined}),
}));
