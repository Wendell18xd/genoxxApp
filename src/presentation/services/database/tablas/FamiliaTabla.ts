import SQLite from 'react-native-sqlite-storage';
import {deleteAllRows, insertRow, listRows} from '../database';
import {FamiliaElement} from '../../../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.response';

export const createFamiliaTable = async (db: SQLite.SQLiteDatabase) => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS familia (
        familia TEXT PRIMARY KEY
    );
  `);
};

export const insertFamiliaDB = async (item: FamiliaElement) => {
  await insertRow<FamiliaElement>('familia', item);
};

export const listAllFamiliaDB = async (): Promise<FamiliaElement[]> => {
  const list = await listRows<FamiliaElement>('familia');
  return list;
};

export const deleteAllFamiliaDB = async (): Promise<void> => {
  await deleteAllRows('familia');
};
