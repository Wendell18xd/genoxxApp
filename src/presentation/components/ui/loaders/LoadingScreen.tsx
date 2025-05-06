import {View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useTheme} from 'react-native-paper';
interface LoadingScreenProps {
  state: boolean;
  message?: string;
}

const LoadingScreen = ({state, message = 'Cargando'}: LoadingScreenProps) => {
  const {colors} = useTheme();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Spinner
        visible={state}
        textContent={message}
        textStyle={{color: colors.onSurface, fontSize: 18}}
        color={colors.onSurface}
      />
    </View>
  );
};

export default LoadingScreen;
