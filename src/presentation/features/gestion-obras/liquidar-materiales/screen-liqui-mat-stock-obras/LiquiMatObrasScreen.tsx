import {View} from 'react-native';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {globalStyle} from '../../../../styles/globalStyle';
import {RouteProp, useRoute} from '@react-navigation/native';
import {LiquidacionObrasStackParam} from '../../navigations/LiquidacionObrasStackNavigation';
import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {FormLiquiMateObras} from './components/FormLiquiMateObras';
import {useObrasStore} from '../../store/useObrasStore';

export const LiquiMatObrasScreen = () => {
  const {isRegulariza} =
    useRoute<RouteProp<LiquidacionObrasStackParam, 'LiquiMatObrasScreen'>>()
      .params;
  const queryClient = useQueryClient();
  const {obra} = useObrasStore();

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['listadoStockMaterilesObras', obra],
      });
    };
  }, []);

  return (
    <DrawerLayout>
      <View style={[globalStyle.container, globalStyle.padding]}>
        <FormLiquiMateObras isRegulariza={isRegulariza} />
      </View>
    </DrawerLayout>
  );
};
