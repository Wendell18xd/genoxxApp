import SQLite from 'react-native-sqlite-storage';
import {createObrasTable} from './tablas/ObrasTabla';

SQLite.enablePromise(true);

// Abrir base de datos
export const openDB = async () => {
  return SQLite.openDatabase({name: 'genoxxrn-db.db', location: 'default'});
};

export const initDB = async () => {
  const db = await openDB();

  // Si necesitas recrear las tablas cada vez (cuidado: borra los datos)
  // solo descomentar si modificas la estructura de las tablas
//   await db.executeSql('DROP TABLE IF EXISTS obras;');

  // Crear tablas
  await createObrasTable(db);

  console.log('Base de datos inicializada correctamente');
};
