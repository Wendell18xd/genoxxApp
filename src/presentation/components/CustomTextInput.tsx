import React from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';

interface CustomTextInputProps extends TextInputProps {
  height?: number; // altura personalizada
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  height = 60,
  style,
  ...props
}) => {
  return <TextInput mode="outlined" style={[{height}, style]} {...props} />;
};

export default CustomTextInput;
