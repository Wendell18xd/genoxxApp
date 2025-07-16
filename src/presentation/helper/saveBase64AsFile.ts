import RNFS from 'react-native-fs';

/**
 * Guarda un base64 como archivo .png y devuelve su path
 */
export const saveBase64AsFile = async (
  base64Data: string,
  fileName = 'firma.png',
): Promise<string> => {
  const path = `${RNFS.TemporaryDirectoryPath}/${fileName}`;

  // Elimina encabezado: data:image/png;base64,...
  const cleanedBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');

  await RNFS.writeFile(path, cleanedBase64, 'base64');
  return path; // Devuelve ruta del archivo .png
};
