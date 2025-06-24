import {View} from 'react-native';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import {TextInput} from 'react-native-paper';
import {globalStyle} from '../../../../../styles/globalStyle';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {ItemStockSeries} from './components/ItemStockSeries';
import {useStockSeries} from './hooks/useStockSeries';
import SinResultados from '../../../../../components/ui/SinResultados';
import CustomFlatList from '../../../../../components/ui/CustomFlatList';

export const StockSeriesScreen = () => {
  const {stockSerie, isLoading} = useStockSeries();

  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    return () => {
      queryClient.removeQueries({queryKey: ['detalleStock']});
    };
  }, []);

  // Filtro
  const dataFiltrada =
    stockSerie?.filter(item =>
      item.mate_nombre?.toLowerCase().includes(searchQuery.toLowerCase()),
    ) ?? [];

  return (
    <View
      style={[globalStyle.container, {flex: 1, backgroundColor: '#f9f9f9'}]}>
      <View style={{marginTop: 16, marginHorizontal: 16}}>
        <CustomTextInput
          placeholder="Descripción"
          onChangeText={setSearchQuery}
          value={searchQuery}
          autoCapitalize="characters"
          left={<TextInput.Icon icon="magnify" />}
        />
      </View>

      <View style={{flex: 1, marginHorizontal: 16}}>
        {isLoading ? null : dataFiltrada.length === 0 ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <SinResultados message="No se encontraron resultados." />
          </View>
        ) : (
          <CustomFlatList
            data={dataFiltrada}
            keyExtractor={(item, index) => `${item.mate_codigo}_${index}`}
            contentContainerStyle={{gap: 16, paddingTop: 16, paddingBottom: 32}}
            refreshing={isLoading}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View>
                <ItemStockSeries serie={item} />
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default StockSeriesScreen;
