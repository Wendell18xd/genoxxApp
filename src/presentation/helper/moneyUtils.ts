interface FormatearNumeroProps {
  valor: string | number;
  decimales?: number;
  pais?: string;
}

export function formatearNumero({
  valor,
  decimales = 2,
  pais = 'PERU',
}: FormatearNumeroProps): string {
  const numero = parseFloat(String(valor));
  if (isNaN(numero)) {
    return '-';
  }

  let opciones: Intl.NumberFormatOptions = {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  };

  let locale = pais === 'PERU' ? 'es-PE' : 'es-CL';

  return new Intl.NumberFormat(locale, opciones).format(numero);
}
