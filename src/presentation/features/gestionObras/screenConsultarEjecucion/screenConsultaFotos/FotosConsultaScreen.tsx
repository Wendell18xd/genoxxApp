import {useState} from 'react';
import {useConsultaEjecucionStore} from '../../store/useConsultaEjecucionStore';
import {Pressable, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ImageViewing from 'react-native-image-viewing';
import SinResultados from '../../../../components/ui/SinResultados';
import {FadeInImage} from '../../../../components/ui/FadeInImage';

export const FotosConsultaScreen = () => {
  const {consulta} = useConsultaEjecucionStore();
  const [visible, setVisible] = useState(false);
  const [indexSeleccionado, setIndexSeleccionado] = useState(0);

  const fotos = [];
  if (consulta && consulta.foto1 !== '') fotos.push({uri: consulta.link_foto1});
  if (consulta && consulta.foto2 !== '') fotos.push({uri: consulta.link_foto2});
  if (consulta && consulta.foto3 !== '') fotos.push({uri: consulta.link_foto3});

  const abrirVisor = (index: number) => {
    setIndexSeleccionado(index);
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      {fotos.length > 0 ? (
        <>
          <FlatList
            data={fotos}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            keyExtractor={(foto, index) => foto.uri + index}
            renderItem={({item: foto, index}) => (
              <Pressable onPress={() => abrirVisor(index)}>
                <FadeInImage
                  uri={foto.uri}
                  style={{width: 200, height: 200, marginRight: 8}}
                />
              </Pressable>
            )}
          />

          <ImageViewing
            images={fotos}
            imageIndex={indexSeleccionado}
            visible={visible}
            onRequestClose={() => setVisible(false)}
            backgroundColor="black"
          />
        </>
      ) : (
        <SinResultados message="No hay fotos registradas para esta ejecución" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    gap: 24,
    paddingBottom: 16,
  },
  fotoContainer: {
    alignItems: 'center',
  },
  fotoMiniatura: {
    width: 120,
    height: 120,
    borderRadius: 8,
    resizeMode: 'cover',
    backgroundColor: '#f0f0f0', // opcional, para que no quede blanco
  },
});
