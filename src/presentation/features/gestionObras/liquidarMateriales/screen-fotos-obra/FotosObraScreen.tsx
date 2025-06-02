import {View, Text, StyleSheet} from 'react-native';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LiquiMatObrasStackParam} from '../navigation/LiquiMatObrasStackNavigation';
import {useFotosStore} from '../../../foto/store/useFotosStore';
import {Foto} from '../../../../../domain/entities/Foto';

export const FotosObraScreen = () => {
  const navigation = useNavigation<NavigationProp<LiquiMatObrasStackParam>>();
  const {setInitialParams} = useFotosStore();

  //* Navego hacia la pantalla de la camara y defino sus parametros iniciales
  const handleCamera = () => {
    setInitialParams({
      maxFotos: 50,
      minFotos: 1,
      isComentario: true,
      onSave: (_fotos: Foto[]) => {
        handleSave(_fotos);
      },
    });
    navigation.navigate('CustomCameraScreen');
  };

  //* Guarda las fotos en el servidor
  const handleSave = (_fotos: Foto[]) => {
    console.log(_fotos);
  };

  return (
    <View style={styles.container}>
      <Text>Lista de fotos enviadas por el usuario</Text>
      <CustomFAB icon="camera" onPress={handleCamera} style={styles.fab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: 16,
  },
  fab: {
    bottom: 16,
    right: 16,
  },
});
