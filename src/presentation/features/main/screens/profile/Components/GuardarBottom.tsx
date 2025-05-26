import React from 'react';
import {Button} from 'react-native-paper';

interface GuardarProps {
    height?: number;
    onPress?: () => void;
}


export const GuardarBottom: React.FC<GuardarProps> = ({onPress}) => {
  return (
    <Button
      icon="content-save"
      mode="contained"
      onPress={onPress}
      style={{ marginTop: 20 }}
      >
      Enviar
    </Button>
  );
};

export default GuardarBottom;
