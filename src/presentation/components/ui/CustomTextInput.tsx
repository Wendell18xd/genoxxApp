import React, {useState} from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';

interface CustomTextInputProps extends TextInputProps {
  height?: number;
  showPassword?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  height = 60,
  style,
  showPassword = false,
  secureTextEntry,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <TextInput
      mode="outlined"
      style={[{height}, style]}
      secureTextEntry={
        showPassword && !passwordVisible ? true : secureTextEntry
      }
      {...props}
      left={props.left}
      right={
        showPassword ? (
          <TextInput.Icon
            icon={passwordVisible ? 'eye-off' : 'eye'}
            onPressIn={() => setPasswordVisible(!passwordVisible)}
            forceTextInputFocus={false}
          />
        ) : (
          props.right
        )
      }
    />
  );
};

export default CustomTextInput;
