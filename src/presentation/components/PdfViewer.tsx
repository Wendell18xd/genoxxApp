import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Pdf from 'react-native-pdf';
import Toast from 'react-native-toast-message';
import RNFetchBlob from 'rn-fetch-blob-v2';
import MaterialIcons from './ui/icons/MaterialIcons';

interface Props {
  url: string;
  onLoadEnd?: () => void;
}

export const PdfViewer = ({url, onLoadEnd}: Props) => {
  const handleDownload = async () => {
    try {
      const {config, fs} = RNFetchBlob;
      const isAndroid = Platform.OS === 'android';
      const api =
        typeof Platform.Version === 'string'
          ? parseInt(Platform.Version, 10)
          : Platform.Version;

      // Permiso solo para Android 10–12
      if (isAndroid && api <= 32) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permiso denegado', 'No se puede guardar el archivo');
          return;
        }
      }

      const fileName = url.split('/').pop() ?? 'documento.pdf';
      const filePath = `${fs.dirs.DownloadDir}/${fileName}`;

      config({
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          mime: 'application/pdf',
          title: fileName,
          description: 'Archivo descargado con Genoxx',
        },
      })
        .fetch('GET', url)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Descarga completa',
            text2: 'Archivo guardado en tu carpeta Descargas',
          });
        })
        .catch(error => {
          console.error('[PDF] Error de descarga:', error);
          Toast.show({
            type: 'error',
            text1: 'Error al descargar',
            text2: 'Revisa conexión o permisos',
          });
        });
    } catch (err) {
      console.error('[PDF] Error inesperado:', err);
      Toast.show({
        type: 'error',
        text1: 'Error inesperado',
        text2: 'Ocurrió un error al descargar',
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
