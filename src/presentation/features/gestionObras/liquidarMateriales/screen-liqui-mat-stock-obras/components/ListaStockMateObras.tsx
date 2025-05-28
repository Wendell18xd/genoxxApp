import {View, FlatList} from 'react-native';
import {useLiquiMatObras} from '../hooks/useLiquiMatObras';
import {useEffect} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import SinResultados from '../../../../../components/ui/SinResultados';
import {ItemStockMateObras} from './items/ItemStockMateObras';

interface Props {
  isRegulariza: boolean;
}

const ListaStockMateObras = ({isRegulariza}: Props) => {
  const {dataStock, isFetchingStock, errorStock, handleListarStock} =
    useLiquiMatObras();

  useEffect(() => {
    if (errorStock) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener el stock de materiales',
      });
    }
  }, [errorStock]);

  useEffect(() => {
    handleListarStock(isRegulariza);
  }, []);

  if (!dataStock && isFetchingStock) {
    return <FullScreenLoader />;
  }

  return (
    <View style={{flex: 1}}>
      {isFetchingStock && dataStock && <FullScreenLoader transparent />}

      <FlatList
        data={dataStock}
        renderItem={({item}) => <ItemStockMateObras item={item} />}
        keyExtractor={item =>
          item.mate_codigo + item.guia_codigo + item.guia_numero
        }
        refreshing={isFetchingStock}
        onRefresh={() => handleListarStock(isRegulariza)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 16}}
        ListEmptyComponent={
          <SinResultados message="No hay materiales en stock" />
        }
      />
    </View>
  );
};
export default ListaStockMateObras;
