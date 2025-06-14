import SQLite from 'react-native-sqlite-storage';
import {deleteAllRows, insertRow, listRows, updateRow} from '../database';
import {Obra} from '../../../../domain/entities/Obra';

export const createObrasTable = async (db: SQLite.SQLiteDatabase) => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS obras (
        regi_codigo TEXT PRIMARY KEY,
        proy_codigo TEXT,
        proy_nombre TEXT,
        gpro_codigo TEXT,
        codi_asignado1 TEXT,
        nom_asignado1 TEXT,
        codi_asignado2 TEXT,
        nom_asignado2 TEXT,
        codi_supervisor TEXT,
        nom_supervisor TEXT,
        obse_asignacion TEXT,
        nom_agencia TEXT,
        distribucion TEXT,
        cluster TEXT,
        clasificacion TEXT,
        causa TEXT,
        categoria TEXT,
        obse_ejecutado TEXT,
        hora_ejecucion TEXT,
        estado_ejecucion TEXT,
        nro_orden TEXT,
        nro_orden2 TEXT,
        nro_orden3 TEXT,
        tipo_obra TEXT,
        nombre TEXT,
        distrito TEXT,
        direccion TEXT,
        observacion TEXT,
        contrato TEXT,
        cliente TEXT,
        estado_orden TEXT,
        estado_ordencliente TEXT,
        mo_proyectado TEXT,
        ma_proyectado TEXT,
        mo_ejecutado TEXT,
        ma_ejecutado TEXT,
        est_facturado TEXT,
        total_facturado TEXT,
        coordenada_x TEXT,
        coordenada_y TEXT,
        user_finaliza TEXT,
        fecha_finaliza TEXT,
        user_registro TEXT,
        fecha_registro TEXT,
        cantidad_hps TEXT,
        orden_compra TEXT,
        remedy_fo TEXT,
        remedy_cu TEXT,
        toa_vpi TEXT,
        linea_fo TEXT,
        tendido TEXT,
        empalme128 TEXT,
        empalme256 TEXT,
        valida_proyectado TEXT,
        maneja_stock_guia TEXT,
        fecha_asignacion TEXT
    );
  `);
};

export const insertObra = async (obra: Obra) => {
  await insertRow<Obra>('obras', obra);
};

export const actualizarObra = async (
  regi_codigo: string,
  datos: Partial<Obra>,
): Promise<void> => {
  await updateRow<Obra>('obras', 'regi_codigo', regi_codigo, datos);
};

export const listarObrasDB = async (
  whereArgs: (string | number)[] = [],
): Promise<Obra[]> => {
  const obras = await listRows<Obra>('obras', 'fecha_asignacion = ?', whereArgs);

  return obras;
};

export const eliminarTodasLasObras = async (): Promise<void> => {
  await deleteAllRows('obras');
};
