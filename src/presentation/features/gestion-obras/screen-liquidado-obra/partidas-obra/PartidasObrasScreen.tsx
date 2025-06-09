import {FlatList, StyleSheet, View} from 'react-native';
import {globalStyle} from '../../../../styles/globalStyle';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import SinResultados from '../../../../components/ui/SinResultados';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {usePartidasObras} from './hooks/usePartidasObras';
import {useCallback, useEffect, useRef} from 'react';
import Toast from 'react-native-toast-message';
import {ItemPartidaObra} from './components/ItemPartidaObra';
import {useObrasStore} from '../../store/useObrasStore';
import {useQueryClient} from '@tanstack/react-query';
import {LiquidacionObrasStackParam} from '../../navigations/LiquidacionObrasStackNavigation';

export const PartidasObrasScreen = () => {
  const navigation =
    useNavigation<NavigationProp<LiquidacionObrasStackParam>>();
  const {obra} = useObrasStore();
  const queryClient = useQueryClient();
  const hasShownError = useRef(false);

  const {
    dataPartidas,
    isFetchPartidas,
    errorPartidas,
    isRefetchLiquidacion,
    refetchPartidas,
    setIsRefetchLiquidacion,
  } = usePartidasObras();

  useFocusEffect(
    useCallback(() => {
      if (isRefetchLiquidacion) {
        refetchPartidas();
        hasShownError.current = true;
        setIsRefetchLiquidacion(false);
      }
    }, [isRefetchLiquidacion]),
  );

  useEffect(() => {
    if (errorPartidas && !hasShownError.current) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener partidas de obra',
      });
      hasShownError.current = true;
      setIsRefetchLiquidacion(true);
    }
  }, [errorPartidas]);

  useEffect(() => {
    return () => {
      setIsRefetchLiquidacion(true);
      queryClient.invalidateQueries({
        queryKey: ['partidas', 'liquidados', obra],
      });
    };
  }, []);

  return (
    <View style={globalStyle.container}>
      {isFetchPartidas && <FullScreenLoader transparent />}

      <View style={[globalStyle.padding, {flex: 1}]}>
        {dataPartidas?.partidas && dataPartidas.partidas.length > 0 ? (
          <FlatList
            data={dataPartidas.partidas}
            keyExtractor={(item, index) => index.toString()}
            refreshing={isFetchPartidas}
            onRefresh={refetchPartidas}
            renderItem={({item}) => <ItemPartidaObra partida={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{gap: 16}}
          />
        ) : (
          <SinResultados message="No hay partidas liquidadas" />
        )}
      </View>

      <CustomFAB
        icon="plus"
        onPress={() => {
          if (dataPartidas?.cierre.est_cierre === '1') {
            Toast.show({
              type: 'error',
              text1: 'Las partidas se encuentran cerradas',
            });
            return;
          }
          navigation.navigate('LiquiPartObrasScreen');
        }}
        style={styles.fab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  divider: {
    marginVertical: 16,
  },
  fab: {
    bottom: 16,
    right: 16,
  },
});
