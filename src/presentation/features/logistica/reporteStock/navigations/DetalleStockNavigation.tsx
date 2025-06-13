import React from 'react';
import {View} from 'react-native';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import { TextInput } from 'react-native-paper';

export const DetalleStockNavigation = () => {
  return (
    <View style={{marginTop: 16, marginHorizontal: 32}}>
      <CustomTextInput
        placeholder="Descripción"
        mode="outlined"
        autoCapitalize="characters"
        left={<TextInput.Icon icon="magnify" />}
      />
    </View>
  );
};
export default DetalleStockNavigation;
