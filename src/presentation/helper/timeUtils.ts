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
