import { View } from 'react-native';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import { TextInput } from 'react-native-paper';
import { globalStyle } from '../../../../../styles/globalStyle';

export const StockSeriesScreen = () => {
  return (
    <View style={globalStyle.container}>
      {/* {<FullScreenLoader transparent />} */}
      <View style={{marginTop: 16, marginHorizontal: 32}}>
        <CustomTextInput
          placeholder="Descripción"
          mode="outlined"
          autoCapitalize="characters"
          left={<TextInput.Icon icon="magnify" />}
        />
      </View>
    </View>
  );
};

export default StockSeriesScreen;
