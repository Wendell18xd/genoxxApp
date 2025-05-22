import React from 'react';
import {Button} from 'react-native-paper';

interface GuardarProps {
    height?: number;
}


export const GuardarBottom: React.FC<GuardarProps> = () => {
  return (
    <Button
      icon="content-save"
      mode="contained"
      onPress={() => console.log('Pressed')}
      style={{ marginTop: 20 }}
      >
      Enviar
    </Button>
  );
};

export default GuardarBottom;
