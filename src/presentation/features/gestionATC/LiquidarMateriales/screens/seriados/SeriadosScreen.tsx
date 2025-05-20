import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import ListaLiquidados from '../components/ListaLiquidados';

const mockData = [
  {
    id: '1',
    codMaterial: 'CABLE 1X4',
    nombre: 'Cable de cobre',
    sku: 'MTR',
    cantidad: '100',
    motivo: 'Instalación',
    descripcion: 'Cable de cobre de 1x4mm',
    skuCliente: 'SKU123',
    nroSerie: 'SERIE001',
  },
  // ...otros materiales...
];

const SeriadosScreen = () => {

  return (
    <DrawerLayout>
      <View style={{ marginTop: 16, marginHorizontal: 32 }}>
        <CustomTextInput
          placeholder="Nro Serie"
          mode="outlined"
          autoCapitalize="characters"
          left={<TextInput.Icon icon="magnify" />}
        />
      </View>
      <ListaLiquidados data={mockData} hideTitle/>
    </DrawerLayout>
  );
};
export default SeriadosScreen;
