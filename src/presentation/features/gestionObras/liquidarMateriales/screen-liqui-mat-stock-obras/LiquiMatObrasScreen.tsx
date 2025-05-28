import {View} from 'react-native';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {globalStyle} from '../../../../styles/globalStyle';
import {RouteProp, useRoute} from '@react-navigation/native';
import {LiquiMatObrasStackParam} from '../navigation/LiquiMatObrasStackNavigation';
import ListaStockMateObras from './components/ListaStockMateObras';
import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {useLiquiMateStore} from '../store/useLiquiMateStore';
import {CustomFAB} from '../../../../components/ui/CustomFAB';

export const LiquiMatObrasScreen = () => {
  const {isRegulariza} =
    useRoute<RouteProp<LiquiMatObrasStackParam, 'LiquiMatObrasScreen'>>()
      .params;
  const {obra} = useLiquiMateStore();
  const queryClient = useQueryClient();

   useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['listadoStockMaterilesObras', obra],
      });
    };
  }, []);

  return (
    <DrawerLayout>
      <View style={[globalStyle.container, globalStyle.margin]}>
        {/* Lista de stock de materiales */}
        <View style={{flex: 1}}>
          <ListaStockMateObras isRegulariza={isRegulariza} />
        </View>
      </View>

      {/* FAB Button grabar */}

      <CustomFAB
        icon="content-save"
        onPress={() => {}}
        style={{bottom: 32, right: 16}}
      />
    </DrawerLayout>
  );
};
