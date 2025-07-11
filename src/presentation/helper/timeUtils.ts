import {parse, format, isValid} from 'date-fns';
import {es} from 'date-fns/locale';

export const parseLocalDate = (isoDateString: string): Date => {
  const [year, month, day] = isoDateString.split('-').map(Number);
  return new Date(year, month - 1, day); // ⚠️ mes base 0
};

export const formatearFecha = (
  fechaString?: string | null,
  formato = 'dd/MM/yyyy',
): string => {
  if (!fechaString) return '';
  if (fechaString.includes('1900')) return '';

  let fecha;

  if (fechaString.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
    // Formato tipo 'yyyy-MM-dd HH:mm:ss'
    fecha = parse(fechaString, 'yyyy-MM-dd HH:mm:ss', new Date());
  } else if (fechaString.includes('/')) {
    // Formato tipo 'dd/MM/yyyy'
    fecha = parse(fechaString, 'dd/MM/yyyy', new Date());
  } else if (fechaString.includes('T')) {
    // ISO: 'yyyy-MM-ddTHH:mm:ssZ'
    fecha = new Date(fechaString);
  } else {
    return '';
  }

  if (!isValid(fecha)) return '';

  return format(fecha, formato, {locale: es});
};

export const obtenerMesYAnio = (
  fechaString: string,
): {mes: string; anio: string} => {
  if (!fechaString) {
    return {mes: '', anio: ''};
  }
  const partes = fechaString.split('-');
  if (partes.length !== 3) {
    return {mes: '', anio: ''};
  }
  const anio = Number(partes[0]);
  const mes = Number(partes[1]);
  return {mes: mes.toString(), anio: anio.toString()};
};

export const formatTiempo = (segundos: number): string => {
  const hrs = Math.floor(segundos / 3600);
  const mins = Math.floor((segundos % 3600) / 60);
  const secs = segundos % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
};
