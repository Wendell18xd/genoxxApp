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
}

const CustomKeyboardAvoidingView = ({
  children,
  keyboardVerticalOffset = 80,
  behavior,
  style,
}: Props) => {
  const {keyboardVisible} = useKeyBoardVisible();
  const {bottom} = useSafeAreaInsets();

  const verticalOffset = keyboardVisible
    ? keyboardVerticalOffset
    : 0;

  return (
    <KeyboardAvoidingView
      behavior={
        behavior ? behavior : Platform.OS === 'ios' ? 'padding' : 'height'
      }
      style={[{flex: 1}, style]}
      keyboardVerticalOffset={
        Platform.OS === 'ios'
          ? keyboardVerticalOffset + bottom
          : verticalOffset
      }
      >
      {children}
    </KeyboardAvoidingView>
  );
};
export default CustomKeyboardAvoidingView;
