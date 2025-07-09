import {Pressable, View} from 'react-native';
import {Foto} from '../../../../../../domain/entities/Foto';
import {FadeInImage} from '../../../../../components/ui/FadeInImage';

interface Props {
  item: Foto;
  index: number;
  onPress: () => void;
}

const ItemFotoRecepcion = ({item, onPress}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [{opacity: pressed ? 0.7 : 1}]}>
      <View style={{flex: 1}}>
        <FadeInImage uri={item.foto} style={{width: 100, height: 100}} />
      </View>
    </Pressable>
  );
};
export default ItemFotoRecepcion;
