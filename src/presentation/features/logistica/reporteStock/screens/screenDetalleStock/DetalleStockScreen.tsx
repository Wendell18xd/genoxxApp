import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {TextInput, ActivityIndicator} from 'react-native-paper';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import {globalStyle} from '../../../../../styles/globalStyle';
import {FlatList} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {useDetalleStock} from './hooks/useDetalleStock';
import {useQueryClient} from '@tanstack/react-query';
import {ItemDetalleStock} from './components/ItemDetalleStock';

export const DetalleStockScreen = () => {
  const {
    dataDetalleStock,
    isFetchDetalleStock,
    refetchDetalleStock,
    errorDetalleStock,
  } = useDetalleStock();

  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (errorDetalleStock) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener la consulta',
      });
    }
  }, [errorDetalleStock]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({queryKey: ['detalleStock']});
    };
  }, []);

  // Filtro
  const dataFiltrada = dataDetalleStock?.filter(item =>
    item.mate_nombre?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Loader mientras carga
  if (isFetchDetalleStock && !dataDetalleStock.length) {
    return (
      <View style={[globalStyle.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator size="large" animating />
      </View>
    );
  }

  return (
    <View style={[globalStyle.container, {backgroundColor: '#f9f9f9'}]}>
      <View style={{marginTop: 16, marginHorizontal: 32}}>
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
            keyExtractor={item => item.mate_codigo}
            contentContainerStyle={{gap: 16, padding: 16}}
            refreshing={isFetchDetalleStock}
            onRefresh={refetchDetalleStock}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <ItemDetalleStock
                detalle={item}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default DetalleStockScreen;
