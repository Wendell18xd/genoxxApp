import {format, parseISO} from 'date-fns';

export const parseLocalDate = (isoDateString: string): Date => {
  const [year, month, day] = isoDateString.split('-').map(Number);
  return new Date(year, month - 1, day); // ⚠️ mes base 0
};

export const formatearFecha = (fechaString?: string | null): string => {
  if (!fechaString) {
    return '';
  }
  if (fechaString.includes('1900')) {
    return '';
  }

  try {
    const fecha = parseISO(fechaString);
    return format(fecha, 'dd/MM/yyyy');
  } catch (error) {
    return '';
  }
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
