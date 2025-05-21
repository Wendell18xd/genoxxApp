import {
  useWindowDimensions,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import {NoticiaDato} from '../../../../../../../infrastructure/interfaces/main/main.response';
import {Text} from 'react-native-paper';
import {globalStyle} from '../../../../../../styles/globalStyle';
import {FadeInImage} from '../../../../../../components/ui/FadeInImage';

interface SlideItemsProps {
  item: NoticiaDato;
  onPress?: () => void;
}

export const SlideItem = ({item, onPress}: SlideItemsProps) => {
  const {width} = useWindowDimensions();
  // const {colors} = useTheme();

  return (
    <View style={[styles.container, {width}]}>
      <Pressable onPress={onPress}>
        <View
          style={[
            // styles.card,
            {
              alignItems: 'center',
              width: width * 0.92,
              paddingVertical: 16,
              // backgroundColor: colors.elevation.level1,
            },
          ]}>
          <FadeInImage
            uri={item.ruta_completa}
            style={{
              width: width - 32,
              resizeMode: 'contain',
            }}
          />
          <Text variant="titleMedium" style={[styles.title]}>
            {item.nombre}
          </Text>
          <View
            style={[
              styles.statusContainer,
              item.is_visto === 0
                ? globalStyle.bgWarning
                : globalStyle.bgSuccess,
            ]}>
            <Text style={styles.statusText}>
              {item.is_visto === 0 ? 'No visto' : 'Visto'}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
  },
  statusContainer: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
