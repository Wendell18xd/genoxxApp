import {useState} from 'react';
import {Portal, Dialog, Button} from 'react-native-paper';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useOrdPendMate} from '../hooks/useOrdPendMate';
import {ItemLiquiMatATC} from '../../screenLiquiMatATC/components/ItemLiquiMatATC';

interface Props {
  title?: string;
}

export const ModalOrdPendMate = ({title = 'Órdenes Pendientes'}: Props) => {
  const [visible, setVisible] = useState(false);
  const {
    ordenesPendienteMate,
    isFetchingOrdenesPendienteMate,
    refetchOrdenesPendienteMate,
    errorOrdenesPendienteMate,
  } = useOrdPendMate();

  const close = () => setVisible(false);

  return (
    <>
      {/* Botón o cualquier trigger personalizado */}

      <Portal>
        <Dialog
          visible={visible}
          onDismiss={close}
          style={{backgroundColor: 'white'}}>
          <Dialog.Title style={{fontSize: 18}}>{title}</Dialog.Title>

          <Dialog.Content>
            <FlatList
              data={ordenesPendienteMate}
              contentContainerStyle={{gap: 16, padding: 16}}
              refreshing={refetchOrdenesPendienteMate}
              onRefresh={refetchOrdenesPendienteMate}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                <ItemLiquiMatATC liquidacion={item} />
              }}
            />
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={close}>Cerrar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
