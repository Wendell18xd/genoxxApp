import {useEffect, useRef} from 'react';
import {BackHandler, StyleSheet, View, Animated} from 'react-native';
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

  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      );
    };

    const animations = [
      animateDot(dot1, 0),
      animateDot(dot2, 200),
      animateDot(dot3, 400),
    ];

    animations.forEach(anim => anim.start());

    return () => animations.forEach(anim => anim.stop());
  }, []);

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
          <View style={{transform: [{scale: 1.5}]}}>
            <ActivityIndicator animating color={colors.onSurface} />
          </View>
          <View style={styles.messageContainer}>
            <Text style={[styles.message, {color: colors.onSurface}]}>
              {message}
            </Text>
            <View style={styles.dots}>
              {[dot1, dot2, dot3].map((dot, i) => (
                <Animated.Text
                  key={i}
                  style={[styles.dot, {opacity: dot, color: colors.onSurface}]}>
                  .
                </Animated.Text>
              ))}
            </View>
          </View>
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
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    marginLeft: 4,
  },
  dot: {
    fontSize: 18,
    marginHorizontal: 1,
  },
});

export default FullScreenLoader;
