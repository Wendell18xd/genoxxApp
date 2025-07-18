import {Dialog, Button} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import {useOrdPendMate} from '../hooks/useOrdPendMate';
import {ItemLiquiMatATC} from '../../screenLiquiMatATC/components/ItemLiquiMatATC';

interface Props {
  title?: string;
  visible: boolean;
  onClose: () => void;
}

export const ModalOrdPendMate = ({
  title = 'Órdenes Pendientes',
  visible,
  onClose,
}: Props) => {
  const {
    ordenesPendienteMate,
    isFetchingOrdenesPendienteMate,
    refetchOrdenesPendienteMate,
  } = useOrdPendMate();

  return (
    <Dialog
      visible={visible}
      onDismiss={onClose}
      style={{backgroundColor: 'white'}}>
      <Dialog.Title style={{fontSize: 18}}>{title}</Dialog.Title>

      <Dialog.Content>
        <View style = {{flex: 1}}>
          <FlatList
            data={ordenesPendienteMate}
            contentContainerStyle={{gap: 12, padding: 12}}
            refreshing={isFetchingOrdenesPendienteMate}
            onRefresh={refetchOrdenesPendienteMate}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <ItemLiquiMatATC liquidacion={item} />}
          />
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onClose}>Cerrar</Button>
      </Dialog.Actions>
    </Dialog>
  );
};
