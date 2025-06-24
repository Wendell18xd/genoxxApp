import SQLite from 'react-native-sqlite-storage';
import {deleteAllRows, insertRow, listRows} from '../database';
import {Subfamilia} from '../../../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.response';

export const createSubFamiliaTable = async (db: SQLite.SQLiteDatabase) => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS subfamilia (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subfamilia TEXT,
        familia TEXT
    );
  `);
};

export const insertSubFamiliaDB = async (item: Subfamilia) => {
  await insertRow<Subfamilia>('subfamilia', item);
};

export const listAllSubFamiliaDB = async (): Promise<Subfamilia[]> => {
  const list = await listRows<Subfamilia>('subfamilia');
  return list;
};

export const deleteAllSubFamiliaDB = async (): Promise<void> => {
  await deleteAllRows('subfamilia');
};
