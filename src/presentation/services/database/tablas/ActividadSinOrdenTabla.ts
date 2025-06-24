import SQLite from 'react-native-sqlite-storage';
import {deleteAllRows, insertRow, listRows} from '../database';
import {Actividade} from '../../../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.response';

export const createActividadSinOrdenTable = async (db: SQLite.SQLiteDatabase) => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS actividadsinorden (
        cont_parametro TEXT PRIMARY KEY,
        cont_campo01 TEXT,
        obliga_horas TEXT,
        descripcion TEXT
    );
  `);
};

export const insertActividadSinObraDB = async (item: Actividade) => {
  await insertRow<Actividade>('actividadsinorden', item);
};

export const listAllActividadSinObraDB = async (): Promise<Actividade[]> => {
  const list = await listRows<Actividade>('actividadsinorden');
  return list;
};

export const deleteAllActividadSinObraDB = async (): Promise<void> => {
  await deleteAllRows('actividadsinorden');
};
