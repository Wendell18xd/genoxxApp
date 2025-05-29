import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {FAB, useTheme} from 'react-native-paper';

interface CustomFABProps {
  icon: string;
  label?: string;
  color?: string;
  labelColor?: string;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  onPress: () => void;
}

export const CustomFAB: React.FC<CustomFABProps> = ({
  icon,
  label,
  color = '',
  labelColor = '#fff',
  style,
  onPress,
  loading = false,
}) => {
  const {colors} = useTheme();
  const [tecladoAbierto, setTecladoAbierto] = useState(false);
  const lastPressRef = useRef<number>(0);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setTecladoAbierto(true);
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setTecladoAbierto(false);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const handlePress = () => {
    const now = Date.now();
    if (now - lastPressRef.current < 1000) {
      return;
    }
    lastPressRef.current = now;

    if (tecladoAbierto) {
      Keyboard.dismiss(); // solo cierro teclado
      return; // no ejecuto onPress
    }

    onPress(); // teclado cerrado, ejecuto onPress
  };

  return (
    <FAB
      icon={icon}
      label={label}
      style={[styles.fab, {backgroundColor: color || colors.secondary}, style]}
      color={labelColor}
      theme={{
        colors: {
          onSecondaryContainer: labelColor,
        },
      }}
      rippleColor={
        tecladoAbierto ? 'rgba(255,255,255,0.0)' : 'rgba(255,255,255,0.3)'
      }
      loading={loading}
      onPress={handlePress}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
