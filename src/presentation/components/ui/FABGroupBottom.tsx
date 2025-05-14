import {useIsFocused} from '@react-navigation/native';
import {useState} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Portal, FAB} from 'react-native-paper';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const FABGroupBottom = ({style}: Props) => {
  const [open, setOpen] = useState(false);
  const isFocused = useIsFocused();
  const onStateChange = (state: {open: boolean}) => setOpen(state.open);

  return (
    isFocused && (
      <Portal>
        <FAB.Group
          open={open}
          visible={true}
          style={style}
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
        />
      </Portal>
    )
  );
};

export default FABGroupBottom;
