import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import {globalStyle} from '../../../../../styles/globalStyle';
import {FlatList} from 'react-native-gesture-handler';
import {useDetalleStock} from './hooks/useDetalleStock';
import {useQueryClient} from '@tanstack/react-query';
import {ItemDetalleStock} from './components/ItemDetalleStock';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';

export const DetalleStockScreen = () => {
  const {detalleStock, isLoading} = useDetalleStock();

  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    return () => {
      queryClient.removeQueries({queryKey: ['detalleStock']});
    };
  }, []);

  // Filtro
  const dataFiltrada =
    detalleStock?.filter(item =>
      item.mate_nombre?.toLowerCase().includes(searchQuery.toLowerCase()),
    ) ?? [];

  return (
    <View style={[globalStyle.container, {backgroundColor: '#f9f9f9'}]}>
      {isLoading && <FullScreenLoader transparent />}
      <View style={{marginTop: 16, marginHorizontal: 16}}>
        <CustomTextInput
          placeholder="Descripción"
          onChangeText={setSearchQuery}
          value={searchQuery}
          autoCapitalize="characters"
          left={<TextInput.Icon icon="magnify" />}
        />

        {dataFiltrada.length === 0 ? (
          <Text style={{marginTop: 20, textAlign: 'center'}}>
            No se encontraron materiales.
          </Text>
        ) : (
          <FlatList
            data={dataFiltrada}
            keyExtractor={(item, index) => `${item.mate_codigo}_${index}`}
            contentContainerStyle={{gap: 16, paddingTop: 16}}
            refreshing={isLoading}
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
