import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {Appbar, IconButton, useTheme} from 'react-native-paper';
import {useQuery} from '@tanstack/react-query';
import {listadoNoticiasActivas} from '../../../../../actions/main/main';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import {SlideItem} from './components/SlideItem';

export const NoticiasScreen = () => {
  const {colors} = useTheme();
  const {user} = useAuthStore();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {isFetching, data, refetch} = useQuery({
    queryKey: ['noticias'],
    staleTime: 1000 * 60 * 60,
    queryFn: () =>
      listadoNoticiasActivas({
        vl_empr_codigo: user?.empr_codigo || '',
        vl_trab_codigo: user?.usua_perfil || '',
        vl_is_app: true,
      }),
  });

  const onRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch(); // <- react-query vuelve a consultar
    } finally {
      setIsRefreshing(false);
    }
  };

  const scrollToIndex = (index: number, animate = true) => {
    if (!flatListRef.current || !data?.datos) {
      return;
    }

    const total = data.datos.length;
    let nextIndex = index;

    // Si estamos en el último y queremos avanzar
    if (index >= total) {
      flatListRef.current.scrollToIndex({index: 0, animated: false});
      setCurrentIndex(0);
      return;
    }

    // Si estamos en el primero y queremos retroceder
    if (index < 0) {
      flatListRef.current.scrollToIndex({index: total - 1, animated: false});
      setCurrentIndex(total - 1);
      return;
    }

    flatListRef.current.scrollToIndex({index: nextIndex, animated: animate});
    setCurrentIndex(nextIndex);
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, layoutMeasurement} = event.nativeEvent;
    const index = Math.floor(contentOffset.x / layoutMeasurement.width);
    setCurrentIndex(index);
  };

  // Auto-scroll cada 4 segundos si no se interactúa
  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.datos) {
        scrollToIndex(currentIndex + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, data?.datos]);

  if (isFetching) {
    return <FullScreenLoader />;
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Appbar.Header style={{backgroundColor: colors.primary}}>
        <Appbar.Content title="Noticias" color="white" />
      </Appbar.Header>

      {data?.datos && (
        <>
          <FlatList
            ref={flatListRef}
            data={data.datos}
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
        </>
      )}
    </View>
  );
};
