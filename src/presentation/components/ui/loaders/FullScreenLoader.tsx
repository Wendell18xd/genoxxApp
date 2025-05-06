import {View} from 'react-native';
import {ActivityIndicator, Text, useTheme} from 'react-native-paper';

interface Props {
  message?: string;
}

const FullScreenLoader = ({message = 'Cargando'}: Props) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator animating color={colors.onSurface} size={36} />
      <Text
        style={{
          color: colors.onSurface,
          fontSize: 18,
          marginTop: 16,
        }}>
        {message}
      </Text>
    </View>
  );
};
export default FullScreenLoader;
