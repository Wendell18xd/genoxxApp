import React from 'react';
import {Pressable, View, StyleSheet, ViewToken} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Foto} from '../../../../../../domain/entities/Foto';
import {FadeInImage} from '../../../../../components/ui/FadeInImage';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import {globalColors} from '../../../../../styles/globalStyle';
import Animated, {SharedValue} from 'react-native-reanimated';
import {useViewableAnimatedStyle} from '../../../../../hooks/useViewableAnimatedStyle';

interface Props {
  item: Foto;
  viewableItems: SharedValue<ViewToken<Foto>[]>;
  onPress: () => void;
  onChangeDescripcion: (text: string) => void;
  onRemove: () => void;
}

const ItemFotoRecepcion = ({
  item,
  viewableItems,
  onPress,
  onChangeDescripcion,
  onRemove,
}: Props) => {
  const rStyle = useViewableAnimatedStyle(viewableItems, 'foto', item);

  return (
    //* SE DESACTIVO rStyle PQ CAUSA CONFLICTOS CON ImageViewing
    <Animated.View style={[styles.container, false && rStyle]}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [{opacity: pressed ? 0.7 : 1}]}>
        <FadeInImage uri={item.foto} style={styles.image} />
      </Pressable>

      <CustomTextInput
        label="Descripción"
        autoCapitalize="characters"
        value={item.comentario || ''}
        onChangeText={text => onChangeDescripcion(text)}
        style={{marginTop: 8}}
      />

      <View style={styles.actions}>
        <IconButton
          icon="delete"
          size={18}
          onPress={() => onRemove()}
          iconColor="white"
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  actions: {
    position: 'absolute',
    backgroundColor: globalColors.danger,
    borderRadius: 10,
    right: 0,
    top: -12,
  },
});

export default ItemFotoRecepcion;
