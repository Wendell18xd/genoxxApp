import {View} from 'react-native';
import {DatoFoto} from '../../../../../infrastructure/interfaces/obras/fotos-materiales/fotos.obras.response';
import {Text} from 'react-native-paper';
import {formatearFecha} from '../../../../helper/timeUtils';
import {FlatList} from 'react-native-gesture-handler';
import {FadeInImage} from '../../../../components/ui/FadeInImage';

interface Props {
  item: DatoFoto;
}

export const ItemFechasFotos = ({item}: Props) => {
  return (
    <View>
      <Text variant="titleLarge" style={{fontWeight: 'bold', marginBottom: 8}}>
        {formatearFecha(item.fecha)}
      </Text>
      <FlatList
        data={item.fotos}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item: foto}) => (
          <FadeInImage
            uri={foto.ruta_archivo}
            style={{width: 200, height: 200, marginRight: 8}}
          />
        )}
      />
    </View>
  );
};
