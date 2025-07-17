import {useQueryClient} from '@tanstack/react-query';
import {useCallback, useEffect, useRef} from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import SinResultados from '../../../../../components/ui/SinResultados';
import {globalStyle} from '../../../../../styles/globalStyle';
import { useLiquiMat } from './hooks/useLiquiMat';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import { ItemMateLiquidados } from './components/ItemMateLiquidados';

export const LiquiMatScreen = () => {
  const QueryClient = useQueryClient();
  const hasShownError = useRef(false);

  const {LiquidacionATC, isFetchLiquidacionATC, errorLiquidacionATC, isRefetchLiquidacionMat, refetchLiquidacionATC, setIsRefetchLiquidacionMat} = useLiquiMat();


    useFocusEffect(
      useCallback(() => {
        if (isRefetchLiquidacionMat) {
          refetchLiquidacionATC();
          hasShownError.current = true;
          setIsRefetchLiquidacionMat(false);
        }
      }, [isRefetchLiquidacionMat]),
    );

  useEffect(() => {
    if (errorLiquidacionATC && !hasShownError.current) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener materiales liquidados',
      });
      hasShownError.current = true;
      setIsRefetchLiquidacionMat(true);
    }
  }, [errorLiquidacionATC]);


  useEffect(() => {
    return () => {
      QueryClient.invalidateQueries({
        queryKey: ['liquidacionesATC', LiquidacionATC],
      });
      setIsRefetchLiquidacionMat(true);
    };
  }, []);

  return (
    <View style={globalStyle.container}>
      {isFetchLiquidacionATC && <FullScreenLoader transparent/>}
      <View style={[globalStyle.padding, {flex: 1}]}>
      {LiquidacionATC && LiquidacionATC.length > 0 ?  (
        <FlatList
          data={LiquidacionATC}
          refreshing={isFetchLiquidacionATC}
          onRefresh={refetchLiquidacionATC}
          renderItem={({item}) => <ItemMateLiquidados liqui={item}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 16}}
        />
      ) : (
        <SinResultados message="No hay materiales liquidados" />
      )}
      </View>
    </View>
  );
};
