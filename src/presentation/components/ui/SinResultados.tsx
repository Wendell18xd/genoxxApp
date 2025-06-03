import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {Text, useTheme} from 'react-native-paper';

interface Props {
  message?: string;
  animationName?: 'empty-list' | 'empty-photos';
}

const SinResultados = ({
  message = 'No se encontraron resultados',
  animationName = 'empty-list',
}: Props) => {
  const {colors} = useTheme();

  const getAnimationSource = () => {
    switch (animationName) {
      case 'empty-list':
        return require('../../../assets/lotties/no-result-animation.json');
      case 'empty-photos':
        return require('../../../assets/lotties/empty-photos.json');
      default:
        return require('../../../assets/lotties/no-result-animation.json');
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={getAnimationSource()}
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
    width: 250,
    height: 150,
    marginBottom: 16,
  },
  message: {
    textAlign: 'center',
  },
});

export default SinResultados;
