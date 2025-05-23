import {View} from 'react-native';
import MaterialIcons from './icons/MaterialIcons';
import {Text} from 'react-native-paper';

interface Props {
  message?: string;
}

const SinResultados = ({message = 'No se encontraron resultados'}: Props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
      }}>
      <MaterialIcons name="magnify" style={{marginRight: 16}} size={25} />
      <Text variant="bodyLarge" style={{textAlign: 'center'}}>
        {message}
      </Text>
    </View>
  );
};
export default SinResultados;
