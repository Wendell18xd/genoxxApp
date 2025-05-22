import {useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useAuthStore} from '../../../../../../store/auth/useAuthStore';
import {
  listadoArchivosNoticia,
  listadoNoticiasActivas,
} from '../../../../../../../actions/main/main';
import {
  Noticia,
  RegistroDesdeNoticia,
} from '../../../../../../../domain/entities/Noticia';
import {useNoticiasStore} from '../../store/useNoticiasStore';

export const useNoticiasCarousel = () => {
  const {user} = useAuthStore();
  const {refresh, setRefresh} = useNoticiasStore();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingDetalle, setIsFetchingDetalle] = useState(false);
  const queryClient = useQueryClient();

  const {data, isLoading, isFetching, refetch} = useQuery({
    queryKey: ['noticias'],
    staleTime: 1000 * 60 * 60,
    queryFn: () =>
      listadoNoticiasActivas({
        vl_empr_codigo: user?.empr_codigo || '',
        vl_trab_codigo: user?.usua_perfil || '',
        vl_is_app: true,
      }),
  });

  const preFetchDetalle = async (item: Noticia) => {
    setIsFetchingDetalle(true);
    await queryClient.prefetchQuery({
      queryKey: ['archivosNoticia', item.cont_correlativo],
      queryFn: () =>
        listadoArchivosNoticia({
          vl_empr_codigo: user?.empr_codigo || '',
          vl_trab_codigo: user?.usua_perfil || '',
          vl_cont_correlativo: item.cont_correlativo,
          vl_is_visto: item.is_visto,
          vl_registro_desde: RegistroDesdeNoticia.App,
        }),
    });
    setIsFetchingDetalle(false);
  };

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
    if (refresh) {
      onRefresh();
      setRefresh(false);
    }
  }, [refresh]);

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
    isLoading,
    isRefreshing,
    currentIndex,
    isFetchingDetalle,
    isFetching,

    //* Metodos
    onRefresh,
    scrollToIndex,
    onScroll,
    preFetchDetalle,
  };
};
