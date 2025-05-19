import {FlatList, View} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import {useNoticiasCarousel} from '../hooks/useNoticiasCarousel';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {SlideItem} from './SlideItem';

export const CarruselNoticias = () => {
  const {colors} = useTheme();
  const {
    flatListRef,
    data,
    isFetching,
    isRefreshing,
    onRefresh,
    currentIndex,
    scrollToIndex,
    onScroll,
  } = useNoticiasCarousel();

  if (isFetching) {
    return <FullScreenLoader />;
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        ref={flatListRef}
        data={data?.datos}
        keyExtractor={item => item.cont_correlativo}
        renderItem={({item}) => <SlideItem item={item} />}
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
