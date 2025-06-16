import {create} from 'zustand';
import {ActividadesObrasResponse} from '../../../../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.response';
import {ActividadesObrasRequest} from '../../../../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.request';
import {listarActividadesObras} from '../../../../../actions/gestionObras/ejecucion.obras';
import {Option} from 'react-native-paper-dropdown';
import {mapToDropdown} from '../../../../../infrastructure/mappers/mapToDropdown';
import {checkInternet} from '../../../../helper/network';
import {listAllSituacionDB} from '../../../../services/database/tablas/SituacionTabla';
import {
  deleteAllActividadObraDB,
  insertActividadObraDB,
  listAllActividadObraDB,
} from '../../../../services/database/tablas/ActividadOrdenTabla';
import {
  deleteAllActividadSinObraDB,
  insertActividadSinObraDB,
  listAllActividadSinObraDB,
} from '../../../../services/database/tablas/ActividadSinOrdenTabla';
import {
  deleteAllFamiliaDB,
  insertFamiliaDB,
  listAllFamiliaDB,
} from '../../../../services/database/tablas/FamiliaTabla';
import {
  deleteAllSubFamiliaDB,
  insertSubFamiliaDB,
  listAllSubFamiliaDB,
} from '../../../../services/database/tablas/SubFamiliaTabla';
import {
  deleteAllSituacionDB,
  insertSituacionDB,
} from '../../../../services/database/tablas/SituacionTabla';

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

      let response: ActividadesObrasResponse;

      const validaInternet = await checkInternet();
      if (validaInternet) {
        const data = await listarActividadesObras(value);

        await deleteAllActividadObraDB();
        await deleteAllActividadSinObraDB();
        await deleteAllFamiliaDB();
        await deleteAllSubFamiliaDB();
        await deleteAllSituacionDB();

        await Promise.all([
          ...data.actividades_orden.map(item => insertActividadObraDB(item)),
          ...data.actividades.map(item => insertActividadSinObraDB(item)),
          ...data.familia.map(item => insertFamiliaDB(item)),
          ...data.subfamilia.map(item => insertSubFamiliaDB(item)),
          ...data.situacion.map(item => insertSituacionDB(item)),
        ]);

        response = data;
      } else {
        const actividades_orden = await listAllActividadObraDB();
        const actividades = await listAllActividadSinObraDB();
        const familia = await listAllFamiliaDB();
        const subfamilia = await listAllSubFamiliaDB();
        const situacion = await listAllSituacionDB();

        const responseDB: ActividadesObrasResponse = {
          actividades_orden,
          actividades,
          familia,
          subfamilia,
          situacion,
          mensaje: 'Datos obtenidos de la base de datos local',
        };
        response = responseDB;
      }

      set({actividades: response});
      set({
        mapDropFamilia: mapToDropdown(response.familia, 'familia', 'familia'),
      });
      set({loading: false});

      return response;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  onReset: () => set({actividades: undefined}),
}));
