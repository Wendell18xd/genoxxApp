import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import MaterialIcons from './ui/icons/MaterialIcons';

interface Props {
  url: string;
  onLoadEnd?: () => void;
}

export const PdfViewer = ({ url, onLoadEnd }: Props) => {
  const handleDownload = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permiso denegado', 'No se puede guardar el archivo');
          return;
        }
      }

      const fileName = url.split('/').pop() || 'documento.pdf';
      const destPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

      const download = RNFS.downloadFile({
        fromUrl: url,
        toFile: destPath,
      });

      const result = await download.promise;

      if (result.statusCode === 200) {
        Alert.alert('Éxito', 'El documento se descargó en tu carpeta de Descargas.');
      } else {
        throw new Error('No se pudo descargar el archivo');
      }
    } catch (error) {
      console.error('[PDF] Error al descargar:', error);
      Alert.alert('Error', 'No se pudo descargar el documento.');
    }
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: url, cache: true }}
        onLoadComplete={onLoadEnd}
        style={styles.pdf}
        trustAllCerts={false}
      />

      {/* Botón flotante de descarga */}
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

