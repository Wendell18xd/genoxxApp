import SQLite from 'react-native-sqlite-storage';
import {deleteAllRows, insertRow, listRows} from '../database';
import {ActividadesOrden} from '../../../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.response';

export const createActividadOrdenTable = async (db: SQLite.SQLiteDatabase) => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS actividadorden (
        cont_parametro TEXT PRIMARY KEY,
        cont_campo01 TEXT,
        cont_campo05 TEXT,
        cont_campo06 TEXT,
        familia TEXT,
        subfamilia TEXT,
        medida TEXT
    );
  `);
};

export const insertActividadObraDB = async (item: ActividadesOrden) => {
  await insertRow<ActividadesOrden>('actividadorden', item);
};

export const listAllActividadObraDB = async (): Promise<ActividadesOrden[]> => {
  const list = await listRows<ActividadesOrden>('actividadorden');
  return list;
};

export const deleteAllActividadObraDB = async (): Promise<void> => {
  await deleteAllRows('actividadorden');
};
