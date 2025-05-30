import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {Text, useTheme} from 'react-native-paper';

interface Props {
  message?: string;
}

const SinResultados = ({message = 'No se encontraron resultados'}: Props) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/lotties/no-result-animation.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text
        variant="titleMedium"
        style={[styles.message, {color: colors.onSurfaceVariant}]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  animation: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  message: {
    textAlign: 'center',
  },
});

export default SinResultados;
