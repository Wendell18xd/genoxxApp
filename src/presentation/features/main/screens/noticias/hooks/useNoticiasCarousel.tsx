import {useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {listadoNoticiasActivas} from '../../../../../../actions/main/main';

export const useNoticiasCarousel = () => {
  const {user} = useAuthStore();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {data, isFetching, refetch} = useQuery({
    queryKey: ['noticias'],
    staleTime: 1000 * 60 * 60,
    queryFn: () =>
      listadoNoticiasActivas({
        vl_empr_codigo: user?.empr_codigo || '',
        vl_trab_codigo: user?.usua_perfil || '',
        vl_is_app: true,
      }),
  });

  const scrollToIndex = (index: number, animate = true) => {
    if (!flatListRef.current || !data?.datos) {
      return;
    }

    const total = data.datos.length;
    let nextIndex = index;

    if (index >= total) {
      flatListRef.current.scrollToIndex({index: 0, animated: false});
      setCurrentIndex(0);
      return;
    }

    if (index < 0) {
      flatListRef.current.scrollToIndex({index: total - 1, animated: false});
      setCurrentIndex(total - 1);
      return;
    }

    flatListRef.current.scrollToIndex({index: nextIndex, animated: animate});
    setCurrentIndex(nextIndex);
  };

  const onScroll = (e: any) => {
    const {contentOffset, layoutMeasurement} = e.nativeEvent;
    const index = Math.floor(contentOffset.x / layoutMeasurement.width);
    setCurrentIndex(index);
  };

  const onRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.datos) {
        scrollToIndex(currentIndex + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, data?.datos]);

  return {
    //* Propiedades
    flatListRef,
    data,
    isFetching,
    isRefreshing,
    currentIndex,

    //* Metodos
    onRefresh,
    scrollToIndex,
    onScroll,
  };
};
