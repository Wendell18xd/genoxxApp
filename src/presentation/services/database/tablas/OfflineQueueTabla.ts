import SQLite from 'react-native-sqlite-storage';
import { openDB } from '../database';

export const createOfflineQueueTable = async (db: SQLite.SQLiteDatabase) => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS offline_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      payload TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export const enqueueRequest = async (
  type: string,
  payload: Record<string, any>,
) => {
  const db = await openDB();
  await db.executeSql(
    'INSERT INTO offline_queue (type, payload) VALUES (?, ?)',
    [type, JSON.stringify(payload)],
  );
};
