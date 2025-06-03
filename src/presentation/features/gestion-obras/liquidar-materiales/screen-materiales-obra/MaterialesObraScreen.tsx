import {FlatList, StyleSheet, View} from 'react-native';
import {globalStyle} from '../../../../styles/globalStyle';
import CustomSwitch from '../../../../components/ui/CustomSwitch';
import {useCallback, useEffect, useRef} from 'react';
import {useMateObras} from './hooks/useMateObras';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import Toast from 'react-native-toast-message';
import SinResultados from '../../../../components/ui/SinResultados';
import {ItemMateLiqui} from './components/ItemMateLiqui';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {LiquiMatObrasStackParam} from '../navigations/LiquiMatObrasStackNavigation';
import {useObrasStore} from '../../store/useObrasStore';
import {useQueryClient} from '@tanstack/react-query';

export const MaterialesObraScreen = () => {
  const navigation = useNavigation<NavigationProp<LiquiMatObrasStackParam>>();
  const {obra} = useObrasStore();
  const queryClient = useQueryClient();
  const hasShownError = useRef(false);
  const {
    dataMateriales,
    isFetchMateriales,
    errorMateriales,
    isRegulariza,
    isRefetchLiquidacion,
    refetchMateriales,
    handleRegularizarMateriales,
    setIsRefetchLiquidacion,
  } = useMateObras();

  useFocusEffect(
    useCallback(() => {
      if (isRefetchLiquidacion) {
        refetchMateriales();
        hasShownError.current = true;
        setIsRefetchLiquidacion(false);
      }
    }, [isRefetchLiquidacion]),
  );

  useEffect(() => {
    if (errorMateriales && !hasShownError.current) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener materiales liquidados',
      });
      hasShownError.current = true;
      setIsRefetchLiquidacion(true);
    }
  }, [errorMateriales]);

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ['materiales', 'liquidados', obra],
      });
      setIsRefetchLiquidacion(false);
    };
  }, []);

  return (
    <View style={globalStyle.container}>
      {isFetchMateriales && <FullScreenLoader transparent />}

      <View style={[globalStyle.padding, {flex: 1}]}>
        <CustomSwitch
          isOn={isRegulariza}
          onChange={value => handleRegularizarMateriales(value)}
          text="Regularizar materiales"
        />
        <View style={{marginVertical: 8}} />

        {dataMateriales?.materiales && dataMateriales.materiales.length > 0 ? (
          <FlatList
            data={dataMateriales?.materiales}
            keyExtractor={item => item.cont_correlativo}
            refreshing={isFetchMateriales}
            onRefresh={refetchMateriales}
            renderItem={({item}) => <ItemMateLiqui mate={item} />}
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
          if (dataMateriales?.cierre.est_cierre_material === '1') {
            Toast.show({
              type: 'error',
              text1: 'Los materiales se encuentran cerrados',
            });
            return;
          }

          navigation.navigate('LiquiMatObrasScreen', {
            isRegulariza: isRegulariza,
          });
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
