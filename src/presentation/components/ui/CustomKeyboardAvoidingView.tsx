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
      keyboardVerticalOffset={Platform.OS === 'ios' ? keyboardVerticalOffset + 40 : keyboardVerticalOffset}>
      {/* The children components will be rendered here */}
      {children}
    </KeyboardAvoidingView>
  );
};
export default CustomKeyboardAvoidingView;
