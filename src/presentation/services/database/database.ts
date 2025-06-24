import SQLite from 'react-native-sqlite-storage';
import {createObrasTable} from './tablas/ObraTabla';
import {createActividadOrdenTable} from './tablas/ActividadOrdenTabla';
import {createActividadSinOrdenTable} from './tablas/ActividadSinOrdenTabla';
import {createFamiliaTable} from './tablas/FamiliaTabla';
import {createSubFamiliaTable} from './tablas/SubFamiliaTabla';
import {createSituacionTable} from './tablas/SituacionTabla';
import { createSaveActividadSinObraTable } from './tablas/SaveActividadSinOrdenTabla';

SQLite.enablePromise(true);

// Abrir base de datos
export const openDB = async () => {
  return SQLite.openDatabase({name: 'genoxxrn-db.db', location: 'default'});
};

export const initDB = async () => {
  const db = await openDB();

  // Si necesitas recrear las tablas cada vez (cuidado: borra los datos)
  // solo descomentar si modificas la estructura de las tablas
    // await db.executeSql('DROP TABLE IF EXISTS saveactividadsinobra;');

  // Crear tablas
  await createObrasTable(db);
  await createActividadOrdenTable(db);
  await createActividadSinOrdenTable(db);
  await createFamiliaTable(db);
  await createSubFamiliaTable(db);
  await createSituacionTable(db);
  await createSaveActividadSinObraTable(db);

  console.log('Base de datos inicializada correctamente');
};

//* await insertRow<Obra>('obras', obra);
export const insertRow = async <T extends Record<string, any>>(
  tableName: string,
  row: T,
): Promise<void> => {
  const db = await openDB();
  const keys = Object.keys(row);
  const values = Object.values(row);
  const placeholders = keys.map(() => '?').join(', ');
  const columns = keys.join(', ');

  const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
  await db.executeSql(query, values);
};

//* await updateRow<Obra>('obras', 'regi_codigo', 'ABC123', {estado_orden: 'FINALIZADO',});
export const updateRow = async <T extends Record<string, any>>(
  tableName: string,
  primaryKey: string,
  primaryKeyValue: string | number,
  updatedFields: Partial<T>,
): Promise<void> => {
  const db = await openDB();

  const columns = Object.keys(updatedFields);
  const values = Object.values(updatedFields);

  if (columns.length === 0) {
    return;
  }

  const sets = columns.map(col => `${col} = ?`).join(', ');
  const query = `UPDATE ${tableName} SET ${sets} WHERE ${primaryKey} = ?`;

  await db.executeSql(query, [...values, primaryKeyValue]);
};

//* await listRows<Obra>('obras', 'fecha_registro = ?', ['2025-06-13']);
export const listRows = async <T>(
  tableName: string,
  whereClause?: string,
  whereArgs: (string | number)[] = [],
): Promise<T[]> => {
  const db = await openDB();
  const query = `SELECT * FROM ${tableName}${
    whereClause ? ` WHERE ${whereClause}` : ''
  }`;

  const [results] = await db.executeSql(query, whereArgs);
  const rows = results.rows;
  const items: T[] = [];

  for (let i = 0; i < rows.length; i++) {
    items.push(rows.item(i));
  }

  return items;
};

//* await deleteAllRows('obras');
export const deleteAllRows = async (tableName: string): Promise<void> => {
  const db = await openDB();
  await db.executeSql(`DELETE FROM ${tableName}`);
};

//* await deleteRowById('obras', 'regi_codigo', 'R00123');
export const deleteRowById = async (
  tableName: string,
  primaryKey: string,
  idValue: string | number,
): Promise<void> => {
  const db = await openDB();
  const query = `DELETE FROM ${tableName} WHERE ${primaryKey} = ?`;
  await db.executeSql(query, [idValue]);
};
