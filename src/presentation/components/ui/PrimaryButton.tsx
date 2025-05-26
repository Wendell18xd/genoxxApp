import React, {useRef} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import MaterialIcons from './icons/MaterialIcons';

interface Props {
  height?: number;
  borderRadius?: number;
  children?: React.ReactNode;
  label?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  debounce?: boolean;
  icon?: string;
}

const PrimaryButton = ({
  height = 68,
  borderRadius = 12,
  children,
  label,
  onPress,
  style,
  loading = false,
  disabled = false,
  debounce = false,
  icon = '',
}: Props) => {
  const {colors} = useTheme();
  const lastPressRef = useRef<number>(0);
  const debounceTime = 1000;

  const isDisabled = disabled || loading;

  const handlePress = () => {
    if (!onPress) {
      return;
    }

    if (debounce) {
      const now = Date.now();
      if (now - lastPressRef.current < debounceTime) {
        return;
      }
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
          opacity: pressed && !isDisabled ? 0.8 : 1,
          backgroundColor: isDisabled ? colors.backdrop : colors.secondary,
          height,
          borderRadius,
        },
        style,
      ]}>
      <View style={styles.content}>
        {loading && (
          <ActivityIndicator color="white" style={{marginRight: 8}} />
        )}
        {icon && !loading && (
          <MaterialIcons name={icon} color="white" style={{marginEnd: 8}} />
        )}
        {(children || label) && (
          <Text style={styles.label}>{children ?? label}</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textTransform: 'uppercase',
    fontWeight: '500',
    color: 'white',
    fontSize: 15,
  },
});

export default PrimaryButton;
