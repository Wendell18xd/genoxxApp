import SQLite from 'react-native-sqlite-storage';
import {deleteAllRows, insertRow, listRows} from '../database';
import {Empresa} from '../../../../infrastructure/interfaces/auth/auth.response';

export const createEmpresaTable = async (db: SQLite.SQLiteDatabase) => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS empresa (
        empr_codigo TEXT PRIMARY KEY,
        empr_nombre TEXT
    );
  `);
};

export const insertEmpresaDB = async (item: Empresa) => {
  await insertRow<Empresa>('empresa', item);
};

export const listAllEmpresaDB = async (): Promise<Empresa[]> => {
  const list = await listRows<Empresa>('empresa');
  return list;
};

export const deleteAllEmpresaDB = async (): Promise<void> => {
  await deleteAllRows('empresa');
};
