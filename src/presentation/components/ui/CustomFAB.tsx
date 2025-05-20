import React, {useRef} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {FAB} from 'react-native-paper';

interface CustomFABProps {
  icon: string;
  label?: string;
  color?: string;
  labelColor?: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const CustomFAB: React.FC<CustomFABProps> = ({
  icon,
  label,
  color = '#6200ee',
  labelColor = '#fff',
  style,
  onPress,
}) => {
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
      style={[styles.fab, {backgroundColor: color}, style]}
      color={labelColor}
      theme={{
        colors: {
          onSecondaryContainer: labelColor,
        },
      }}
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
