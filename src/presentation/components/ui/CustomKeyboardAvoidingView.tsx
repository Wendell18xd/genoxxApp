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
  isBottom?: boolean;
}

const CustomKeyboardAvoidingView = ({
  children,
  keyboardVerticalOffset = 80,
  behavior,
  style,
  safeOffset = 0,
  isBottom = true,
}: Props) => {
  const {keyboardVisible} = useKeyBoardVisible();
  const {bottom} = useSafeAreaInsets();
  const bottomOffset = (isBottom ? bottom : 0) + safeOffset;
  console.log(bottom);

  const verticalOffset = keyboardVisible
    ? keyboardVerticalOffset
    : -bottomOffset;
  return (
    <KeyboardAvoidingView
      behavior={
        behavior ? behavior : Platform.OS === 'ios' ? 'padding' : 'height'
      }
      style={[{flex: 1}, style]}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? verticalOffset + 40 : verticalOffset
      }>
      {children}
    </KeyboardAvoidingView>
  );
};
export default CustomKeyboardAvoidingView;
