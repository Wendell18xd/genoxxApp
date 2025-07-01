import { FlatList, Image, StyleSheet, View } from 'react-native';
import SinResultados from '../../../../components/ui/SinResultados';
import { useConsultaEjecucionStore } from '../../store/useConsultaEjecucionStore';


export const FotosConsultaScreen = () => {
  const {consulta} = useConsultaEjecucionStore();
  const fotos = consulta?.foto1 || [];

  if (fotos.length === 0) {
    return <SinResultados message="No hay fotos disponibles" />;
  }

  return (
    <FlatList
      data={fotos.slice(0, 3)} // máximo 3 fotos
      keyExtractor={(item, index) => `${item}_${index}`}
      contentContainerStyle={styles.container}
      renderItem={({item}) => (
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});
