import {View} from 'react-native';
import {Divider, Text} from 'react-native-paper';

const DetalleMaterialesCampoScreen = () => {
  return (
    <View style={{flex: 1, padding: 16}}>
      <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
        Datos iniciales
      </Text>
      <Divider style={{marginVertical: 16}} />
    </View>
  );
};

export default DetalleMaterialesCampoScreen;
