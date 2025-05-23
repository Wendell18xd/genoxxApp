// ListaObrasScreen.tsx
import {FlatList, View} from 'react-native';
import {Text} from 'react-native-paper';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {useMainStore} from '../../../../store/main/useMainStore';
import {useSarchObras} from './hooks/useSarchObras';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import {SearchObras} from './components/SearchObras';
import {useBottomSheetModal} from '../../../../hooks/useBottomSheet';
import CustomBottomSheet from '../../../../components/ui/bottomSheetModal/CustomBottomSheet';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';

export const ListaObrasScreen = () => {
  const {drawerKey} = useMainStore();
  const {obras, errorObras} = useSarchObras();
  const {ref, open, close} = useBottomSheetModal();

  console.log(drawerKey);

  useEffect(() => {
    if (errorObras) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener las obras',
      });
    }
  }, [errorObras]);

  return (
    <DrawerLayout>
      <View style={{flex: 1, padding: 16}}>
        <FlatList
          data={obras}
          keyExtractor={item => item.regi_codigo}
          renderItem={() => <Text>ListaObrasScreen</Text>}
        />

        <CustomFAB
          icon="magnify"
          onPress={open}
          style={{bottom: 16, right: 16}}
        />

        <CustomBottomSheet ref={ref}>
          <SearchObras onClose={close} />
        </CustomBottomSheet>
      </View>
    </DrawerLayout>
  );
};
