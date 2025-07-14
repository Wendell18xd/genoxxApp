import {StyleSheet, View, TouchableOpacity, Linking} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import MaterialIcons from './ui/icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import {requestStoragePermission} from '../../actions/permissions/download';

interface Props {
  url: string;
  onLoadEnd?: () => void;
}

export const PdfViewer = ({url, onLoadEnd}: Props) => {
  const handleDownload = async () => {
    try {
      const permission = await requestStoragePermission();

      if (permission !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permiso denegado',
          text2: 'Activa el permiso de almacenamiento',
          onPress: () => Linking.openSettings(),
        });
        return;
      }

      const fileName = url.split('/').pop() || 'documento.pdf';
      const downloadDir = RNFS.DownloadDirectoryPath;
      const destPath = `${downloadDir}/${fileName}`;

      // ✅ Verifica o crea la carpeta Download
      const exists = await RNFS.exists(downloadDir);
      if (!exists) {
        await RNFS.mkdir(downloadDir);
      }

      const download = RNFS.downloadFile({
        fromUrl: url,
        toFile: destPath,
      });

      const result = await download.promise;

      if (result.statusCode === 200) {
        Toast.show({
          type: 'success',
          text1: 'Descarga completada',
          text2: 'Archivo guardado en tu carpeta Descargas',
        });
      } else {
        throw new Error('Fallo al descargar el archivo');
      }
    } catch (error) {
      console.error('[PDF] Error al descargar:', error);
      Toast.show({
        type: 'error',
        text1: 'Error al descargar',
        text2: 'Verifica permisos o espacio disponible',
      });
    }
  };
  return (
    <View style={styles.container}>
      <Pdf
        source={{uri: url, cache: true}}
        onLoadComplete={onLoadEnd}
        style={styles.pdf}
        trustAllCerts={false}
      />

      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <MaterialIcons name="download" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
  downloadButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#0090D7',
    borderRadius: 28,
    padding: 14,
    elevation: 4,
  },
});
