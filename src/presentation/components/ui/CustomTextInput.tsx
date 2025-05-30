import React, {cloneElement, isValidElement, useState} from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';

interface CustomTextInputProps extends TextInputProps {
  height?: number;
  showPassword?: boolean;
  isWhite?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  height = 60,
  style,
  showPassword = false,
  secureTextEntry,
  left,
  isWhite = false,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const modifiedLeft =
    isWhite && isValidElement(left) && left.type === TextInput.Icon
      ? cloneElement(left as any, {color: 'white'})
      : left;

  return (
    <TextInput
      mode="outlined"
      style={[{height, backgroundColor: 'transparent'}, style]}
      secureTextEntry={
        showPassword && !passwordVisible ? true : secureTextEntry
      }
      outlineColor={isWhite ? 'white' : undefined}
      activeOutlineColor={isWhite ? 'white' : undefined}
      placeholderTextColor={isWhite ? 'white' : undefined}
      textColor={isWhite ? 'white' : undefined}
      {...props}
      left={modifiedLeft}
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
