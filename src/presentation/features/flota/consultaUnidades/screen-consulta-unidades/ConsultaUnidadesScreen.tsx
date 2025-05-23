import { TextInput} from 'react-native-paper';

import { View } from 'react-native';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import SafeAreaLayout from '../../../main/layout/SafeAreaLayout';

export const ConsultaUnidadesScreen = () => {
  return (
    <SafeAreaLayout title="Consulta de Unidades" isHeader primary>
        <View style={{width: '100%'}}>
          <CustomTextInput
            placeholder="Buscar opción"
            mode="outlined"
            autoCapitalize="characters"
            value={''}
            onChangeText={() => {}}
            left={<TextInput.Icon icon="magnify" />}
          />
        </View>
    </SafeAreaLayout>
  );
};
