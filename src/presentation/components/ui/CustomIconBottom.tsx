import React, { useRef } from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import MaterialIcons from './icons/MaterialIcons';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';


interface Props {
  icon: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  debounce?: boolean;
  size?: number;
  iconColor?: string;
  containerColor?: string;
  style?: StyleProp<ViewStyle>;
}
export const CustomIconBottom = ({
  icon,
  onPress,
  loading = false,
  disabled = false,
  debounce = false,
  size = 40,
  iconColor = 'white',
  containerColor,
  style,
}: Props) => {
    const {colors} = useTheme();
    const lastPressRef = useRef<number>(0);
    const debounceTime = 1000;
    const isDisabled = disabled || loading;
    const handlePress = () => {
        if (!onPress) {return;}
        if (debounce) {
      const now = Date.now();
      if (now - lastPressRef.current < debounceTime) {return;}
      lastPressRef.current = now;
    }
    onPress();
};

return (
     <Pressable
      onPress={!isDisabled ? handlePress : undefined}
      disabled={isDisabled}
      style={({pressed}) => [
        styles.button,
        {
          backgroundColor: isDisabled
            ? colors.backdrop
            : containerColor || colors.secondary,
          opacity: pressed && !isDisabled ? 0.8 : 1,
          width: size + 16,
          height: size + 16,
          borderRadius: (size + 16) / 2,
        },
        style,
      ]}>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={iconColor} />
        ) : (
          <MaterialIcons name={icon} size={size} color={iconColor} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomIconBottom;
