import React, {useRef} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
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
  const lastPressRef = useRef<number>(0);

  const handlePress = () => {
    const now = Date.now();
    if (now - lastPressRef.current < 1000) {
      return;
    } // debounce: 1 segundo
    lastPressRef.current = now;
    onPress();
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
      rippleColor="rgba(255,255,255,0.3)"
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
