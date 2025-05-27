import {View} from 'react-native';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {globalStyle} from '../../../../styles/globalStyle';
import {RouteProp, useRoute} from '@react-navigation/native';
import {LiquiMatObrasStackParam} from '../navigation/LiquiMatObrasStackNavigation';
import {FormLiquiMateObras} from './components/FormLiquiMateObras';
import ListaStockMateObras from './components/ListaStockMateObras';

export const LiquiMatObrasScreen = () => {
  const {isRegulariza} =
    useRoute<RouteProp<LiquiMatObrasStackParam, 'LiquiMatObrasScreen'>>()
      .params;

  return (
    <DrawerLayout>
      <View style={[globalStyle.container, globalStyle.padding]}>
        {/* Formik */}
        <FormLiquiMateObras />

        {/* Lista de stock de materiales */}
        <ListaStockMateObras isRegulariza={isRegulariza} />
      </View>
    </DrawerLayout>
  );
};
