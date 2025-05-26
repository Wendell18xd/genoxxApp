import {useIsFocused} from '@react-navigation/native';
import {useState} from 'react';
import {FAB, Portal} from 'react-native-paper';

interface Props {
  bottomOffset?: number;
}

export const FABAudioBottom = ({bottomOffset}: Props) => {
  const [open, setOpen] = useState(false);
  const isFocused = useIsFocused();

  const onStateChange = (state: {open: boolean}) => setOpen(state.open);

  if (!isFocused){ return null;}

  return (
 <Portal>
      <FAB.Group
        open={open}
        visible={true}
        icon={open ? 'close' : 'microphone'}
        actions={[
          {
            icon: 'radiobox-marked',
            label: 'Grabar audio',
            onPress: () => console.log('Pressed grabar audio'),
          },
          {
            icon: 'stop-circle',
            label: 'Parar grabación',
            onPress: () => console.log('Pressed stop'),
          },
          {
            icon: 'play-circle',
            label: 'Reanudar grabación',
            onPress: () => console.log('Pressed reanudar'),
          },
        ]}
        onStateChange={onStateChange}
        style={{
          position: 'absolute',
          bottom: bottomOffset ?? 100,
          zIndex: 100,
        }}
      />
    </Portal>
  );
};
export default FABAudioBottom;
