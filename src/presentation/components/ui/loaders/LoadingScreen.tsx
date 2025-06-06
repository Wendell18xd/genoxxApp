import {View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {globalColors} from '../../../styles/globalStyle';
interface LoadingScreenProps {
  state: boolean;
  message?: string;
}

const LoadingScreen = ({state, message = 'Cargando'}: LoadingScreenProps) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalColors.white,
      }}>
      <Spinner
        overlayColor="white"
        visible={state}
        textContent={message}
        textStyle={{color: globalColors.textPrimary, fontSize: 18}}
        color={globalColors.textPrimary}
      />
    </View>
  );
};

export default LoadingScreen;
