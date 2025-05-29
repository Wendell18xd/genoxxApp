import {View} from 'react-native';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {globalStyle} from '../../../../styles/globalStyle';
import {RouteProp, useRoute} from '@react-navigation/native';
import {LiquiMatObrasStackParam} from '../navigation/LiquiMatObrasStackNavigation';
import ListaStockMateObras from './components/ListaStockMateObras';
import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import {useSaveLiquiMateObras} from './hooks/useSaveLiquiMateObras';

export const LiquiMatObrasScreen = () => {
  const {isRegulariza} =
    useRoute<RouteProp<LiquiMatObrasStackParam, 'LiquiMatObrasScreen'>>()
      .params;
  const queryClient = useQueryClient();
  const {obra, handleSaveLiquidacion, setMaterialesSeleccionados} =
    useSaveLiquiMateObras();

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['listadoStockMaterilesObras', obra],
      });
      setMaterialesSeleccionados([]);
    };
  }, []);

  return (
    <DrawerLayout>
      <View style={[globalStyle.container, globalStyle.padding]}>
        {/* Lista de stock de materiales */}
        <View style={{flex: 1}}>
          <ListaStockMateObras isRegulariza={isRegulariza} />
        </View>
      </View>

      {/* FAB Button grabar */}

      <CustomFAB
        icon="content-save"
        onPress={() => handleSaveLiquidacion()}
        style={{bottom: 32, right: 16}}
      />
    </DrawerLayout>
  );
};
