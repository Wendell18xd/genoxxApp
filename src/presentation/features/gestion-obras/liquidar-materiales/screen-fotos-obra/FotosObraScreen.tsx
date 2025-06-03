import {View, Text, StyleSheet} from 'react-native';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import {useFotosObras} from './hooks/useFotosObras';

export const FotosObraScreen = () => {
  const {handleCamera} = useFotosObras();

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
