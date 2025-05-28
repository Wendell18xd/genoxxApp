import {View, FlatList} from 'react-native';
import {useLiquiMatObras} from '../hooks/useLiquiMatObras';
import {useEffect} from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import SinResultados from '../../../../../components/ui/SinResultados';
import {ItemStockMateObras} from './items/ItemStockMateObras';
import {useLiquiMateStore} from '../../store/useLiquiMateStore';

interface Props {
  isRegulariza: boolean;
}

const ListaStockMateObras = ({isRegulariza}: Props) => {
  const {dataStock, isFetchingStock, errorStock, handleListarStock} =
    useLiquiMatObras();
  const {guiaSeleccionada} = useLiquiMateStore();

  const filteredStock =
    guiaSeleccionada === 'TODOS'
      ? dataStock
      : dataStock?.filter(item => item.guia_codigo === guiaSeleccionada);

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

  if (!dataStock) {
    return <FullScreenLoader />;
  }

  return (
    <View style={{flex: 1}}>
      {isFetchingStock && dataStock && <FullScreenLoader transparent />}

      {filteredStock && filteredStock.length > 0 ? (
        <FlatList
          data={filteredStock}
          renderItem={({item}) => <ItemStockMateObras item={item} />}
          keyExtractor={item =>
            item.mate_codigo + item.guia_codigo + item.guia_numero
          }
          refreshing={isFetchingStock}
          onRefresh={() => handleListarStock(isRegulariza)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 16}}
          style={{marginTop: 16}}
        />
      ) : (
        <SinResultados message="No hay materiales en stock" />
      )}
    </View>
  );
};
export default ListaStockMateObras;
