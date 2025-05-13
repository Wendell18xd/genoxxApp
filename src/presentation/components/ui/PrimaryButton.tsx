import React from 'react';
import {Button, ButtonProps} from 'react-native-paper';
import {Platform, StyleSheet} from 'react-native';

interface Props extends ButtonProps {
  height?: number;
  borderRadius?: number;
}

const PrimaryButton = ({height = 68, borderRadius = 12, ...props}: Props) => {
  return (
    <Button
      {...props}
      mode={props.mode || 'contained'}
      contentStyle={[styles.content, {height}]}
      style={[styles.button, {borderRadius}, props.style]}
      labelStyle={styles.label}
      textColor="white"
      theme={{
        colors: {
          primary: '#0090D7',
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12, // default
  },
  content: {
    height: 68, // default
  },
  label: {
    textTransform: 'uppercase',
    fontWeight: Platform.OS === 'ios' ? '500' : '100',
  },
});

export default PrimaryButton;
