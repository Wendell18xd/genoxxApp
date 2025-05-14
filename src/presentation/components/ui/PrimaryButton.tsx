import React from 'react';
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
interface Props {
  height?: number;
  borderRadius?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const PrimaryButton = ({
  height = 68,
  borderRadius = 12,
  children,
  onPress,
  style,
  loading = false,
  disabled = false,
}: Props) => {
  const {colors} = useTheme();

  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={!isDisabled ? onPress : undefined}
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
          <ActivityIndicator
            color="white"
            style={{marginRight: 8}}
          />
        )}
        <Text style={styles.label}>{children}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
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
