import SQLite from 'react-native-sqlite-storage';
import {deleteAllRows, insertRow, listRows} from '../database';
import {Actividade} from '../../../../infrastructure/interfaces/gestionObras/ejecucionObras/actividades.obras.response';

export const createSaveActividadSinObraTable = async (db: SQLite.SQLiteDatabase) => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS saveactividadsinobra (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        turno TEXT,
        actividad TEXT,
        hora_inicio TEXT,
        hora_final TEXT,
        situacion TEXT,
        observacion TEXT,
        tiempo_transcurrido TEXT,
    );
  `);
};

export const insertSaveActividadSinObraDB = async (item: Actividade) => {
  await insertRow<Actividade>('saveactividadsinobra', item);
};

export const listAllSaveActividadSinObraDB = async (): Promise<Actividade[]> => {
  const list = await listRows<Actividade>('saveactividadsinobra');
  return list;
};

export const deleteAllSaveActividadSinObraDB = async (): Promise<void> => {
  await deleteAllRows('saveactividadsinobra');
};
