import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {useKeyBoardVisible} from '../../hooks/useKeyBoardVisible';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  keyboardVerticalOffset?: number;
  style?: StyleProp<ViewStyle>;
  behavior?: 'height' | 'position' | 'padding';
  safeOffset?: number;
}

const CustomKeyboardAvoidingView = ({
  children,
  keyboardVerticalOffset = 80,
  behavior,
  style,
  safeOffset = 0,
}: Props) => {
  const {keyboardVisible} = useKeyBoardVisible();
  const {bottom} = useSafeAreaInsets();

  const verticalOffset = keyboardVisible
    ? keyboardVerticalOffset + safeOffset
    : 0;

  return (
    <KeyboardAvoidingView
      behavior={
        behavior ? behavior : Platform.OS === 'ios' ? 'padding' : 'height'
      }
      style={[{flex: 1}, style]}
      keyboardVerticalOffset={
        Platform.OS === 'ios'
          ? keyboardVerticalOffset + safeOffset + bottom
          : verticalOffset
      }
      >
      {children}
    </KeyboardAvoidingView>
  );
};
export default CustomKeyboardAvoidingView;
