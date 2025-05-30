import {StyleSheet, View} from 'react-native';
import SafeAreaLayout from '../features/main/layout/SafeAreaLayout';
import {globalColors} from '../styles/globalStyle';
import PrimaryButton from './ui/PrimaryButton';
import {CameraAdapter} from '../adapter/camera-adapter';

export const CustomCameraScreen = () => {
  const handleCamera = async () => {
    const photos = await CameraAdapter.takePicture();
    console.log(photos);
  };

  const handleGallery = async () => {
    const photos = await CameraAdapter.getPictureFromLibrary();
    console.log(photos);
  };

  return (
    <SafeAreaLayout primary isHeader title="Fotos">
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            debounce
            icon="camera"
            label="Camara"
            onPress={handleCamera}
            style={[styles.button, {backgroundColor: globalColors.gray}]}
            textStyle={{color: globalColors.textPrimary}}
            iconColor={globalColors.textPrimary}
          />
          <PrimaryButton
            debounce
            icon="image"
            label="Galeria"
            onPress={handleGallery}
            style={[styles.button, {backgroundColor: globalColors.gray}]}
            textStyle={{color: globalColors.textPrimary}}
            iconColor={globalColors.textPrimary}
          />
        </View>
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 32,
  },
  button: {
    flex: 1,
    height: 50,
  },
});
