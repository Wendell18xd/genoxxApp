import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface Props {
  children: React.ReactNode;
  keyboardVerticalOffset?: number;
  style?: StyleProp<ViewStyle>;
  behavior?: 'height' | 'position' | 'padding';
}

const CustomKeyboardAvoidingView = ({
  children,
  keyboardVerticalOffset = 80,
  behavior,
  style,
}: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={
        behavior ? behavior : Platform.OS === 'ios' ? 'padding' : 'height'
      }
      style={[{flex: 1}, style]}
      keyboardVerticalOffset={
        Platform.OS === 'ios'
          ? keyboardVerticalOffset + 40
          : keyboardVerticalOffset
      }>
      {/* The children components will be rendered here */}
      {children}
    </KeyboardAvoidingView>
  );
};
export default CustomKeyboardAvoidingView;
