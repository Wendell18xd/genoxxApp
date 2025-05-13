import React from 'react';
import {Portal, FAB} from 'react-native-paper';

export const FABGroupBottom = () => {
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}: {open: boolean}) => setState({open});

  const {open} = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible={true}
        icon={open ? 'close' : 'plus'}
        actions={[
          {
            icon: 'plus',
            label: 'Seriados',
            onPress: () => console.log('Pressed plus'),
          },
          {
            icon: 'plus',
            label: 'No seriados',
            onPress: () => console.log('Pressed plus'),
          },
          {
            icon: 'plus',
            label: 'Recuperos',
            onPress: () => console.log('Pressed plus'),
          },
          {
            icon: 'close-circle',
            label: 'Finalizar',
            onPress: () => console.log('Pressed close-circle'),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

export default FABGroupBottom;
