import {Pressable, useWindowDimensions} from 'react-native';
import {FadeInImage} from '../../../components/ui/FadeInImage';
import {Foto} from '../../../../domain/entities/Foto';
import {useFotosStore} from '../store/useFotosStore';
import CustomTextInput from '../../../components/ui/CustomTextInput';
import {useItemCamera} from '../hooks/useItemCamera';

interface Props {
  item: Foto;
  index: number;
  handleDelete: (index: number) => void;
}

export const ItemCamera = ({item, index, handleDelete}: Props) => {
  const {
    initialParams: {isComentario},
  } = useFotosStore();
  const {handleChangeComentario} = useItemCamera();

  const {width: screenWidth} = useWindowDimensions();
  const spacing = 16;
  const numColumns = 2;
  const imageSize = (screenWidth - spacing * (numColumns + 1)) / numColumns;

  return (
    <Pressable onLongPress={() => handleDelete(index)}>
      <FadeInImage
        uri={item.foto}
        style={{width: imageSize, height: imageSize}}
      />
      {isComentario && (
        <CustomTextInput
          value={item.comentario}
          label="Comentario"
          autoCapitalize="characters"
          onChangeText={text => handleChangeComentario(text, index)}
          style={{marginTop: 4}}
        />
      )}
    </Pressable>
  );
};
