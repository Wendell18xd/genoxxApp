import {View, Text, StyleSheet} from 'react-native';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import {useFotosPartidasObras} from './hooks/useFotosPartidasObras';

export const FotosPartidasObraScreen = () => {
  const {handleCamera} = useFotosPartidasObras();

  return (
    <View style={styles.container}>
      {/* TODO: Mostrar lista de fotos enviadas por el usuario */}
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
