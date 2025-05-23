// ListaObrasScreen.tsx
import {FlatList} from 'react-native';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {useMainStore} from '../../../../store/main/useMainStore';
import {useSarchObras} from './hooks/useSarchObras';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import {SearchObras} from './components/SearchObras';
import {useBottomSheetModal} from '../../../../hooks/useBottomSheet';
import CustomBottomSheet from '../../../../components/ui/bottomSheetModal/CustomBottomSheet';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {useQueryClient} from '@tanstack/react-query';
import {ItemObra} from '../components/ItemObra';
import SinResultados from '../../../../components/ui/SinResultados';

export const ListaObrasScreen = () => {
  const {drawerKey} = useMainStore();
  const {obras, errorObras, refetchObras, handleSelectObra} = useSarchObras();
  const {ref, open, close} = useBottomSheetModal();
  const queryClient = useQueryClient();

  console.log(drawerKey);

  useEffect(() => {
    if (errorObras) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener las obras',
      });
    }
  }, [errorObras]);

  useEffect(() => {
    queryClient.removeQueries({
      queryKey: ['obrasAsignadas'],
    });
  }, []);

  return (
    <DrawerLayout title="Lista de Obras">
      {obras && obras.length > 0 ? (
        <FlatList
          data={obras}
          keyExtractor={item => item.regi_codigo}
          contentContainerStyle={{gap: 16, padding: 16}}
          refreshing={false}
          onRefresh={refetchObras}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ItemObra
              obra={item}
              onPress={() => {
                handleSelectObra(item);
              }}
            />
          )}
        />
      ) : (
        <SinResultados message="No se encontraron obras, use la lupa para buscar" />
      )}

      <CustomFAB
        icon="magnify"
        onPress={open}
        style={{bottom: 16, right: 16}}
      />

      <CustomBottomSheet ref={ref}>
        <SearchObras onClose={close} />
      </CustomBottomSheet>
    </DrawerLayout>
  );
};
