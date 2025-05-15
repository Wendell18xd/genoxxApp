import {View} from 'react-native';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import {TextInput} from 'react-native-paper';

const LiquidarPartidasObras = () => {
  return (
    <DrawerLayout style={{backgroundColor: 'black'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20,
        }}>
        <View style={{width: '100%', marginTop: 16}}>
          <CustomTextInput
            placeholder="Buscar opción"
            mode="outlined"
            autoCapitalize="characters"
            value={''}
            onChangeText={() => {}}
            left={<TextInput.Icon icon="magnify" />}
          />
        </View>
      </View>
    </DrawerLayout>
  );
};
export default LiquidarPartidasObras;
