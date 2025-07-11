import {FlatList, View} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import {useNoticiasCarousel} from '../hooks/useNoticiasCarousel';
import FullScreenLoader from '../../../../../../components/ui/loaders/FullScreenLoader';
import {SlideItem} from './SlideItem';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NoticiasStackParam} from '../../navigations/NoticiasStackNatigation';
import {Noticia} from '../../../../../../../domain/entities/Noticia';

export const CarruselNoticias = () => {
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationProp<NoticiasStackParam>>();

  const {
    flatListRef,
    data,
    isFetching,
    isRefreshing,
    onRefresh,
    currentIndex,
    scrollToIndex,
    onScroll,
    preFetchDetalle,
    isFetchingDetalle,
  } = useNoticiasCarousel();

  const handleDetalle = async (item: Noticia) => {
    await preFetchDetalle(item);
    navigation.navigate('DetalleNoticiaScreen', {noticia: item});
  };

  return (
    <View style={{flex: 1}}>
      {(isFetching || isFetchingDetalle) && <FullScreenLoader transparent />}
      <FlatList
        ref={flatListRef}
        data={data?.datos}
        keyExtractor={item => item.cont_correlativo}
        renderItem={({item}) => (
          <SlideItem item={item} onPress={() => handleDetalle(item)} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />

      {/* Botones laterales */}
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
        }}>
        <IconButton
          icon="chevron-left"
          size={36}
          onPress={() => scrollToIndex(currentIndex - 1)}
          style={{
            position: 'absolute',
            left: 0,
            backgroundColor: colors.backdrop,
          }}
          iconColor="white"
        />
        <IconButton
          icon="chevron-right"
          size={36}
          onPress={() => scrollToIndex(currentIndex + 1)}
          style={{
            position: 'absolute',
            right: 0,
            backgroundColor: colors.backdrop,
          }}
          iconColor="white"
        />
      </View>
    </View>
  );
};
