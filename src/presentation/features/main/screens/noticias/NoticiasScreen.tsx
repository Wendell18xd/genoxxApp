import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
  View,
} from 'react-native';
import {globalStyle} from '../../../../styles/globalStyle';
import {Appbar, Text, useTheme} from 'react-native-paper';
import {useQuery} from '@tanstack/react-query';
import {listadoNoticiasActivas} from '../../../../../actions/main/main';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import {useRef, useState} from 'react';
import {NoticiaDato} from '../../../../../infrastructure/interfaces/main/main.response';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../../../../components/ui/PrimaryButton';
import {FadeInImage} from '../../../../components/ui/FadeInImage';

export const NoticiasScreen = () => {
  const {colors} = useTheme();
  const {user} = useAuthStore();
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListReft = useRef<FlatList>(null);

  const {isLoading, data} = useQuery({
    queryKey: ['noticias'],
    staleTime: 1000 * 60 * 60,
    queryFn: () =>
      listadoNoticiasActivas({
        vl_empr_codigo: user?.empr_codigo || '',
        vl_trab_codigo: user?.usua_codigo || '',
        vl_is_app: true,
      }),
  });

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, layoutMeasurement} = event.nativeEvent;
    const currentIndex = Math.floor(contentOffset.x / layoutMeasurement.width);

    setCurrentSlideIndex(currentIndex > 0 ? currentIndex : 0);
  };

  const scrollToSlide = (index: number) => {
    if (!flatListReft.current) {
      return;
    }

    flatListReft.current.scrollToIndex({index: index, animated: true});
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={globalStyle.container}>
      <Appbar.Header
        style={{
          position: 'relative',
          backgroundColor: colors.primary,
        }}>
        <Appbar.Content title="Noticias" color="white" />
      </Appbar.Header>
      {data?.datos && (
        <>
          <FlatList
            ref={flatListReft}
            data={data.datos}
            keyExtractor={item => item.cont_correlativo}
            renderItem={({item}) => <SlideItem item={item} />}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            onScroll={onScroll}
          />
          {currentSlideIndex === data.datos.length - 1 ? (
            <PrimaryButton
              onPress={() => navigation.goBack()}
              style={{marginBottom: 32, marginHorizontal: 32}}>
              Finalizar
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onPress={() => scrollToSlide(currentSlideIndex + 1)}
              style={{marginBottom: 32, marginHorizontal: 32}}>
              Siguiente
            </PrimaryButton>
          )}
        </>
      )}
    </View>
  );
};

interface SlideItemsProps {
  item: NoticiaDato;
}

const SlideItem = ({item}: SlideItemsProps) => {
  const {width} = useWindowDimensions();
  const {ruta_completa, nombre} = item;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
      }}>
      <FadeInImage
        uri={ruta_completa}
        style={{
          width: width * 0.7,
          height: width * 0.7,
          resizeMode: 'center',
          alignSelf: 'center',
        }}
      />

      <Text style={{textAlign: 'center'}}>{nombre}</Text>
    </View>
  );
};
