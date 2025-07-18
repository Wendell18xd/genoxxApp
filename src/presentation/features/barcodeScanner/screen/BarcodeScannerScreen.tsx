import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useScannerStore} from '../store/useScannerStore';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from '../../../components/ui/icons/MaterialIcons';

export const BarcodeScannerScreen = () => {
  const navigation = useNavigation();
  const device = useCameraDevice('back');
  const [hasPermission, setHasPermission] = useState(false);

  const scannedCode = useScannerStore(state => state.codigo);
  const setScannedCode = useScannerStore(state => state.setCodigo);

  useEffect(() => {
    const requestPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    };
    requestPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128', 'code-39'],
    onCodeScanned: codes => {
      if (codes.length > 0 && !scannedCode) {
        setScannedCode(codes[0].value || '');
      }
    },
  });

  const handleConfirm = () => {
    navigation.goBack(); // puedes pasar el código si lo necesitas como parámetro
  };

  const handleRetry = () => {
    setScannedCode('');
  };

  if (!device || !hasPermission) {
    return <Text style={styles.loading}>Cargando cámara...</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={!scannedCode}
        codeScanner={codeScanner}
      />

      {/* Botón de volver */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-left" size={28} color="#fff" />
      </TouchableOpacity>

      {scannedCode && (
        <View style={styles.overlay}>
          <Text style={styles.codeText}>Código escaneado:</Text>
          <Text style={styles.codeValue}>{scannedCode}</Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.buttonText}>Volver a escanear</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  loading: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 18,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 25,
    padding: 8,
  },
  overlay: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'rgba(0,0,0,0.85)',
    padding: 20,
    borderRadius: 12,
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
  },
  codeText: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 6,
  },
  codeValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  retryButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
