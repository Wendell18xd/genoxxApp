import {useWindowDimensions, View, Image} from 'react-native';
import {NoticiaDato} from '../../../../../../infrastructure/interfaces/main/main.response';
import {Text, useTheme} from 'react-native-paper';
import {globalStyle} from '../../../../../styles/globalStyle';

interface SlideItemsProps {
  item: NoticiaDato;
}

export const SlideItem = ({item}: SlideItemsProps) => {
  const {width, height} = useWindowDimensions();
  const {colors} = useTheme();

  return (
    <View
      style={{
        width,
        paddingHorizontal: 16,
        paddingVertical: 24,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={{uri: item.ruta_completa}}
        style={{
          width: width * 0.9,
          height: height * 0.5,
          resizeMode: 'contain',
          borderRadius: 16,
          marginBottom: 16,
        }}
      />
      <Text
        variant="titleMedium"
        style={{
          color: colors.onBackground,
          textAlign: 'center',
        }}>
        {item.nombre}
      </Text>
      <View
        style={[
          {
            marginTop: 8,
            padding: 8,
            borderRadius: 8,
          },
          item.is_visto === 0 ? globalStyle.bgWarning : globalStyle.bgSuccess,
        ]}>
        <Text
          style={[
            item.is_visto === 0 ? globalStyle.bgWarning : globalStyle.bgSuccess,
          ]}>
          {item.is_visto === 0 ? 'No visto' : 'Visto'}
        </Text>
      </View>
    </View>
  );
};
