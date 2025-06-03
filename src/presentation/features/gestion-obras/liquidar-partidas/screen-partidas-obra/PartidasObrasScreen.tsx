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
import {LiquiPartObrasStackParam} from '../navigations/LiquiPartObrasStackNavigation';
import {usePartidasObras} from './hooks/usePartidasObras';
import {useCallback, useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {ItemPartidaObra} from './components/ItemPartidaObra';

export const PartidasObrasScreen = () => {
  const navigation = useNavigation<NavigationProp<LiquiPartObrasStackParam>>();

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
        setIsRefetchLiquidacion(false);
      }
    }, [isRefetchLiquidacion]),
  );

  useEffect(() => {
    if (errorPartidas) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener partidas de obra',
      });
    }
  }, [errorPartidas]);

  return (
    <View style={globalStyle.container}>
      {isFetchPartidas && <FullScreenLoader transparent />}

      <View style={[globalStyle.padding, {flex: 1}]}>
        {dataPartidas && dataPartidas.length > 0 ? (
          <FlatList
            data={dataPartidas}
            keyExtractor={(item, index) => index.toString()}
            refreshing={isFetchPartidas}
            onRefresh={refetchPartidas}
            renderItem={({item}) => <ItemPartidaObra partida={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{gap: 16}}
          />
        ) : (
          <SinResultados message="No hay materiales liquidados" />
        )}
      </View>

      <CustomFAB
        icon="plus"
        onPress={() => {
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
