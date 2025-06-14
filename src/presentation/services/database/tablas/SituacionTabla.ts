import SQLite from 'react-native-sqlite-storage';
import {deleteAllRows, insertRow, listRows} from '../database';
import {Situacion} from '../../../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.response';

export const createSituacionTable = async (db: SQLite.SQLiteDatabase) => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS situacion (
        cont_parametro TEXT PRIMARY KEY,
        cont_campo01 TEXT
    );
  `);
};

export const insertSituacionDB = async (item: Situacion) => {
  await insertRow<Situacion>('situacion', item);
};

export const listAllSituacionDB = async (): Promise<Situacion[]> => {
  const list = await listRows<Situacion>('situacion');
  return list;
};

export const deleteAllSituacionDB = async (): Promise<void> => {
  await deleteAllRows('situacion');
};
