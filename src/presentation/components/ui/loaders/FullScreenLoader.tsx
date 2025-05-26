import {useEffect, useState} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Text, useTheme, Portal} from 'react-native-paper';

interface Props {
  message?: string;
  transparent?: boolean;
}

const FullScreenLoader = ({
  message = 'Cargando',
  transparent = false,
}: Props) => {
  const {colors} = useTheme();
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4); // ciclo de 0 a 3 puntos
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const animatedMessage = `${message} ${'.'.repeat(dotCount)}`;

  return (
    <Portal>
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: transparent
              ? 'rgba(0, 0, 0, 0.2)'
              : colors.background,
          },
        ]}>
        <View
          style={[
            transparent && styles.loaderBox,
            {
              backgroundColor: colors.background,
              borderColor: colors.outline,
            },
          ]}>
          <ActivityIndicator animating color={colors.onSurface} size={36} />
          <Text style={[styles.message, {color: colors.onSurface}]}>
            {animatedMessage}
          </Text>
        </View>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  message: {
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  },
});

export default FullScreenLoader;
