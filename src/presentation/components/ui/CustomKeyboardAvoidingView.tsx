import {KeyboardAvoidingView, Platform} from 'react-native';

interface Props {
  children: React.ReactNode;
  keyboardVerticalOffset?: number;
  behavior?: 'height' | 'position' | 'padding';
}

const CustomKeyboardAvoidingView = ({
  children,
  keyboardVerticalOffset = 80,
  behavior,
}: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={
        behavior ? behavior : Platform.OS === 'ios' ? 'padding' : 'height'
      }
      style={{flex: 1}}
      keyboardVerticalOffset={keyboardVerticalOffset}>
      {children}
    </KeyboardAvoidingView>
  );
};
export default CustomKeyboardAvoidingView;
