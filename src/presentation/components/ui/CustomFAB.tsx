import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {FAB, Text, useTheme} from 'react-native-paper';

interface CustomFABProps {
  icon: string;
  label?: string;
  color?: string;
  labelColor?: string;
  style?: StyleProp<ViewStyle>;
  fabStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  cantidad?: number;
  onPress?: () => void;
}

export const CustomFAB = ({
  icon,
  label,
  color = '',
  labelColor = '#fff',
  style,
  fabStyle,
  onPress,
  loading = false,
  cantidad = 0,
}: CustomFABProps) => {
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

    if (onPress) {
      onPress(); // teclado cerrado, ejecuto onPress
    }
  };

  return (
    <View style={[{position: 'absolute'}, style]}>
      {cantidad > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -6,
            right: -6,
            width: 20,
            height: 20,
            backgroundColor: 'red',
            borderRadius: 10, // Mitad del ancho/alto
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
            {cantidad}
          </Text>
        </View>
      )}

      <FAB
        icon={icon}
        label={label}
        style={[
          styles.fab,
          {backgroundColor: color || colors.secondary},
          fabStyle,
        ]}
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
        onPress={onPress ? handlePress : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'relative',
  },
});
