import {StyleSheet, View} from 'react-native';
import SafeAreaLayout from '../../main/layout/SafeAreaLayout';
import {globalColors} from '../../../styles/globalStyle';
import {FlatList} from 'react-native-gesture-handler';
import SinResultados from '../../../components/ui/SinResultados';
import {Text} from 'react-native-paper';
import {CustomFAB} from '../../../components/ui/CustomFAB';
import {ItemCamera} from '../components/ItemCamera';
import {useCamera} from '../hooks/useCamera';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import FullScreenLoader from '../../../components/ui/loaders/FullScreenLoader';

export const CustomCameraScreen = () => {
  const navigation = useNavigation();
  const {
    fotos,
    maxFotos,
    countFotos,
    isSave,
    isLoading,
    isRendering,
    handleCamera,
    handleGallery,
    handleCancel,
    handleDelete,
    handleSave,
  } = useCamera();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      // Prevenir la navegación mientras hacemos la limpieza
      e.preventDefault();

      // Ejecutamos la lógica de cancelación
      handleCancel();

      // Luego de limpiar, permitimos la navegación manualmente
      navigation.dispatch(e.data.action);
    });

    return unsubscribe;
  }, [navigation, handleCancel]);

  return (
    <SafeAreaLayout title="Fotos" primary isHeader isSafeBottom>
      {isLoading && <FullScreenLoader message="Grabando fotos" transparent />}
      {isRendering && <FullScreenLoader message="Cargando fotos" transparent />}

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
              keyExtractor={item => item.foto}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={{gap: 16}}
              contentContainerStyle={{gap: 16}}
              renderItem={({item, index}) => (
                <ItemCamera
                  item={item}
                  index={index}
                  handleDelete={handleDelete}
                />
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
            {isSave && (
              <CustomFAB
                icon="content-save"
                onPress={handleSave}
                style={{bottom: 16, left: 16}}
                loading={isLoading}
              />
            )}

            {/* <CustomFAB
              icon="close"
              onPress={() => handleCancel(true)}
              style={{bottom: 85, left: 16}}
              color="gray"
            /> */}
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
