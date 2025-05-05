import Spinner from 'react-native-loading-spinner-overlay';
interface LoadingScreenProps {
  state: boolean;
  message?: string;
}

const LoadingScreen = ({
  state,
  message = 'Cargando',
}: LoadingScreenProps) => {
  return (
    <Spinner
      visible={state}
      textContent={message}
      textStyle={{color: '#FFF', fontSize: 18}}
    />
  );
};

export default LoadingScreen;
