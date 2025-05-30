/**
 * Limpia una entrada para que solo tenga un punto decimal
 * y solo contenga números válidos. Opcional: limitar decimales.
 */
export function sanitizarDecimalInput(
  texto: string,
  maxDecimales?: number,
): string {
  // Remueve caracteres no numéricos ni puntos
  let limpio = texto.replace(/[^0-9.]/g, '');

  // Divide en partes por el punto
  const partes = limpio.split('.');

  // Más de un punto decimal: une todo después del primero
  if (partes.length > 2) {
    limpio = partes[0] + '.' + partes.slice(1).join('');
  }

  // Limitar decimales
  if (maxDecimales != null && limpio.includes('.')) {
    const [entero, decimal] = limpio.split('.');
    limpio = entero + '.' + decimal.slice(0, maxDecimales);
  }

  return limpio;
}
