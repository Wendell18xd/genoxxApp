import {View} from 'react-native';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {globalStyle} from '../../../../styles/globalStyle';
import {RouteProp, useRoute} from '@react-navigation/native';
import {LiquiMatObrasStackParam} from '../navigation/LiquiMatObrasStackNavigation';
import {FormLiquiMateObras} from './components/FormLiquiMateObras';
import ListaStockMateObras from './components/ListaStockMateObras';
import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {useLiquiMateStore} from '../store/useLiquiMateStore';

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
      <View style={[globalStyle.container, globalStyle.padding]}>
        {/* Formik */}
        <FormLiquiMateObras />

        {/* Lista de stock de materiales */}
        <View style={{flex: 1, marginTop: 16}}>
          <ListaStockMateObras isRegulariza={isRegulariza} />
        </View>
      </View>
    </DrawerLayout>
  );
};
