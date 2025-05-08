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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
      }}>
      <Text variant="bodyLarge">
        <MaterialIcons name="magnify" />
        {message}
      </Text>
    </View>
  );
};
export default SinResultados;
