import {Dialog, Button, Text} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import {useEffect} from 'react';
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
    isFetching,
    refetch,
  } = useOrdPendMate();

  useEffect(() => {
    if (visible) {
      refetch(); // fuerza que se actualice al abrir
    }
  }, [visible]);

  return (
    <Dialog
      visible={visible}
      onDismiss={onClose}
      style={{backgroundColor: 'white'}}>
      <Dialog.Title style={{fontSize: 18}}>{title}</Dialog.Title>

      <Dialog.Content>
        {/* 🧱 View con altura fija para mostrar FlatList */}
        <View style={{maxHeight: 400}}>
          <FlatList
            data={ordenesPendienteMate ?? []}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{gap: 12, paddingBottom: 16}}
            refreshing={isFetching}
            onRefresh={refetch}
            showsVerticalScrollIndicator={true}
            renderItem={({item}) => <ItemLiquiMatATC liquidacion={item} />}
            ListEmptyComponent={
              !isFetching ? (
                <Text style={{textAlign: 'center'}}>
                  No hay órdenes pendientes
                </Text>
              ) : null
            }
          />
        </View>
      </Dialog.Content>

      <Dialog.Actions>
        <Button onPress={onClose}>Cerrar</Button>
      </Dialog.Actions>
    </Dialog>
  );
};
