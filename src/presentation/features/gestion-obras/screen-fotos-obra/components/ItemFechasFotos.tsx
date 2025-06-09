import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {DatoFoto} from '../../../../../infrastructure/interfaces/obras/fotos-materiales/fotos.obras.response';
import {Text} from 'react-native-paper';
import {formatearFecha} from '../../../../helper/timeUtils';
import {FlatList} from 'react-native-gesture-handler';
import {FadeInImage} from '../../../../components/ui/FadeInImage';
import ImageViewing from 'react-native-image-viewing';

interface Props {
  item: DatoFoto;
}

export const ItemFechasFotos = ({item}: Props) => {
  const [visible, setVisible] = useState(false);
  const [indexSeleccionado, setIndexSeleccionado] = useState(0);

  const imagenes = item.fotos.map(f => ({uri: f.ruta_archivo}));

  const abrirVisor = (index: number) => {
    setIndexSeleccionado(index);
    setVisible(true);
  };

  return (
    <View>
      <Text variant="titleLarge" style={{fontWeight: 'bold', marginBottom: 8}}>
        {formatearFecha(item.fecha)}
      </Text>

      <FlatList
        data={item.fotos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(foto, index) => foto.ruta_archivo + index}
        renderItem={({item: foto, index}) => (
          <Pressable onPress={() => abrirVisor(index)}>
            <FadeInImage
              uri={foto.ruta_archivo}
              style={{width: 200, height: 200, marginRight: 8}}
            />
          </Pressable>
        )}
      />

      {/* Visor de imágenes con zoom */}
      <ImageViewing
        images={imagenes}
        imageIndex={indexSeleccionado}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        backgroundColor="black"
      />
    </View>
  );
};
