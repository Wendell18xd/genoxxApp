import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  StatusBar,
} from 'react-native';
import Signature from 'react-native-signature-canvas';
import Orientation from 'react-native-orientation-locker';
import {useNavigation} from '@react-navigation/native';
import {useFirmaStore} from '../store/useFirmaStore';
import {saveBase64AsFile} from '../../../helper/saveBase64AsFile';
import SafeAreaLayout from '../../main/layout/SafeAreaLayout';

const FirmaScreen = () => {
  const navigation = useNavigation();
  const setFirma = useFirmaStore(state => state.setFirma);
  const signatureRef = useRef<any>(null);
  const [screenSize, setScreenSize] = useState(Dimensions.get('window'));

  useEffect(() => {
    Orientation.lockToLandscape();
    StatusBar.setHidden(true); // oculta la barra de estado

    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setScreenSize(window);
    });

    return () => {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false); // vuelve a mostrarla
      subscription.remove();
    };
  }, []);

  const handleOK = async (signatureBase64: string) => {
    try {
      const filePath = await saveBase64AsFile(
        signatureBase64,
        'firma_usuario.png?' + new Date().getTime(),
      );

      setFirma(`file://${filePath}`);
      navigation.goBack();
    } catch (error) {
      console.error('Error guardando firma como archivo:', error);
    }
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
  };

  const {width, height} = screenSize;

  return (
    <View style={[styles.container, {width, height}]}>
      <SafeAreaLayout primary isHeader title="Dibujar su firma">
        <Signature
          ref={signatureRef}
          onOK={handleOK}
          autoClear={false}
          descriptionText=""
          backgroundColor="#fff"
          webStyle={webStyle}
          webviewContainerStyle={{width, height}}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={handleClear}>
            <Text style={styles.buttonText}>Borrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => signatureRef.current?.readSignature()}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaLayout>
    </View>
  );
};

const webStyle = `
  .m-signature-pad {
    box-shadow: none;
    border: none;
    margin: 0;
    padding: 0;
  }
  body, html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .m-signature-pad--body {
    border: none;
  }
  .m-signature-pad--footer {
    display: none;
  }
`;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    left: 32,
    right: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonPrimary: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonSecondary: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FirmaScreen;
