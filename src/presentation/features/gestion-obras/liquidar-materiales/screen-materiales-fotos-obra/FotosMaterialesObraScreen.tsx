import {View, StyleSheet} from 'react-native';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import {useFotosMaterialesObras} from './hooks/useFotosMaterialesObras';
import {useCallback, useEffect} from 'react';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import Toast from 'react-native-toast-message';
import {FlatList} from 'react-native-gesture-handler';
import SinResultados from '../../../../components/ui/SinResultados';
import {useFocusEffect} from '@react-navigation/native';
import {ItemFechasFotos} from './components/ItemFechasFotos';

export const FotosMaterialesObraScreen = () => {
  const {datosFotos, isFetchingFotos, errorFotos, refetchFotos, handleCamera} =
    useFotosMaterialesObras();

  useFocusEffect(
    useCallback(() => {
      refetchFotos();
    }, [refetchFotos]),
  );

  useEffect(() => {
    if (errorFotos) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener las fotos',
      });
    }
  }, [errorFotos]);

  return (
    <View style={styles.container}>
      {isFetchingFotos && <FullScreenLoader transparent />}

      {datosFotos && datosFotos.length > 0 ? (
        <FlatList
          data={datosFotos}
          keyExtractor={item => item.fecha}
          contentContainerStyle={{gap: 32}}
          renderItem={({item}) => <ItemFechasFotos item={item} />}
        />
      ) : (
        <SinResultados message="No hay fotos grabadas" />
      )}

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
