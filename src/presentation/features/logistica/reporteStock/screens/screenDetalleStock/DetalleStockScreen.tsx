import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import {globalStyle} from '../../../../../styles/globalStyle';
import {useDetalleStock} from './hooks/useDetalleStock';
import {useQueryClient} from '@tanstack/react-query';
import {ItemDetalleStock} from './components/ItemDetalleStock';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import SinResultados from '../../../../../components/ui/SinResultados';
import CustomFlatList from '../../../../../components/ui/CustomFlatList';

export const DetalleStockScreen = () => {
  const {detalleStock, isLoading} = useDetalleStock();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    return () => {
      queryClient.removeQueries({queryKey: ['detalleStock']});
    };
  }, []);

  const dataFiltrada =
    detalleStock?.filter(item =>
      item.mate_nombre?.toLowerCase().includes(searchQuery.toLowerCase()),
    ) ?? [];

  if (isLoading) {
    return <FullScreenLoader/>;
  }

  return (
    <View
      style={[globalStyle.container, {flex: 1, backgroundColor: '#f9f9f9'}]}>

      <View style={{flex: 1, marginTop: 16, marginHorizontal: 16}}>
        <CustomTextInput
          placeholder="Descripción"
          onChangeText={setSearchQuery}
          value={searchQuery}
          autoCapitalize="characters"
          left={<TextInput.Icon icon="magnify" />}
        />

        {dataFiltrada.length === 0 ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <SinResultados message="No se encontraron resultados." />
          </View>
        ) : (
          <CustomFlatList
            data={dataFiltrada}
            keyExtractor={(item, index) => `${item.mate_codigo}_${index}`}
            contentContainerStyle={{gap: 16, paddingTop: 16}}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View>
                <ItemDetalleStock detalle={item} />
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default DetalleStockScreen;
