import {Pressable, StyleSheet, useWindowDimensions, View} from 'react-native';
import SafeAreaLayout from '../../main/layout/SafeAreaLayout';
import {globalColors} from '../../../styles/globalStyle';
import {CameraAdapter} from '../../../adapter/camera-adapter';
import {FlatList} from 'react-native-gesture-handler';
import {FadeInImage} from '../../../components/ui/FadeInImage';
import {useFotosStore} from '../store/useFotosStore';
import {ToastNativo} from '../../../helper/utils';
import {useNavigation} from '@react-navigation/native';
import SinResultados from '../../../components/ui/SinResultados';
import {Text} from 'react-native-paper';
import {useState} from 'react';
import {CustomFAB} from '../../../components/ui/CustomFAB';

export const CustomCameraScreen = () => {
  const {fotos, setFotos} = useFotosStore();
  const maxFotos = 10;
  const [countFotos, setCountFotos] = useState(0);
  const navigation = useNavigation();

  const handleCamera = async () => {
    const count = maxFotos - countFotos;

    if (count === 0) {
      ToastNativo({
        titulo: 'Limite de fotos',
        mensaje: `Limite de fotos alcanzado solo se puede seleccionar ${maxFotos} fotos`,
        isAlert: true,
      });
      return;
    }

    const photos = await CameraAdapter.takePicture();
    setFotos([...fotos, ...photos]);
    if (photos.length > 0) {
      setCountFotos(countFotos + 1);
    }
  };

  const handleGallery = async () => {
    const count = maxFotos - countFotos;

    if (count === 0) {
      ToastNativo({
        titulo: 'Limite de fotos',
        mensaje: `Limite de fotos alcanzado solo se puede seleccionar ${maxFotos} fotos`,
        isAlert: true,
      });
      return;
    }

    const photos = await CameraAdapter.getPictureFromLibrary(count);
    setFotos([...fotos, ...photos]);
    setCountFotos(countFotos + photos.length);
  };

  const handleDelete = (index: number) => {
    setFotos(fotos.filter((_, i) => i !== index));
    setCountFotos(countFotos - 1);
  };

  const handleCancel = () => {
    setFotos([]);
    setCountFotos(0);
    navigation.goBack();
  };

  const {width: screenWidth} = useWindowDimensions();
  const spacing = 16;
  const numColumns = 2;
  const imageSize = (screenWidth - spacing * (numColumns + 1)) / numColumns;

  return (
    <SafeAreaLayout title="Fotos" primary isHeader isSafeBottom>
      <View style={styles.container}>
        {fotos.length > 0 ? (
          <>
            <Text
              variant="titleMedium"
              style={{marginBottom: 16, textAlign: 'center'}}>
              Fotos: {countFotos}/{maxFotos} ({maxFotos - countFotos} restantes)
            </Text>
            <FlatList
              data={fotos}
              keyExtractor={item => item}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={{gap: 16}}
              contentContainerStyle={{gap: 16}}
              renderItem={({item, index}) => (
                <Pressable onLongPress={() => handleDelete(index)}>
                  <FadeInImage
                    uri={item}
                    style={{width: imageSize, height: imageSize}}
                  />
                </Pressable>
              )}
            />
          </>
        ) : (
          <SinResultados message="No hay fotos" animationName="empty-photos" />
        )}

        <CustomFAB
          icon="camera"
          onPress={handleCamera}
          style={{bottom: 16, right: 16}}
          color={globalColors.success}
        />

        <CustomFAB
          icon="image"
          onPress={handleGallery}
          style={{bottom: 85, right: 16}}
          color={globalColors.warning}
        />

        {fotos.length > 0 && (
          <>
            <CustomFAB
              icon="content-save"
              onPress={() => {}}
              style={{bottom: 16, left: 16}}
            />

            <CustomFAB
              icon="close"
              onPress={handleCancel}
              style={{bottom: 85, left: 16}}
              color="gray"
            />
          </>
        )}
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 32,
    marginBottom: 16,
  },
  button: {
    height: 40,
  },
  textButton: {
    color: globalColors.textPrimary,
    fontSize: 12,
  },
});
