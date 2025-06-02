// ListaObrasScreen.tsx
import {FlatList, View} from 'react-native';
import {useSarchObras} from './hooks/useSarchObras';
import {SearchObras} from './components/SearchObras';
import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {useQueryClient} from '@tanstack/react-query';
import {Searchbar} from 'react-native-paper';
import DrawerLayout from '../../main/layout/DrawerLayout';
import {ItemObra} from '../components/ItemObra';
import SinResultados from '../../../components/ui/SinResultados';
import {CustomFAB} from '../../../components/ui/CustomFAB';
import CustomBottomSheet from '../../../components/ui/bottomSheetModal/CustomBottomSheet';
import {useBottomSheetModal} from '../../../hooks/useBottomSheet';

export const ListaObrasScreen = () => {
  const {obras, errorObras, isFetchObras, refetchObras, handleSelectObra} =
    useSarchObras();
  const {ref, open, close} = useBottomSheetModal();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (errorObras) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener las obras',
      });
    }
  }, [errorObras]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['obrasAsignadas'],
      });
    };
  }, []);

  return (
    <DrawerLayout title="Lista de Obras">
      <View style={{flex: 1}}>
        {obras && obras.length > 0 ? (
          <>
            <Searchbar
              placeholder="Filtrar por nro de orden"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={{marginHorizontal: 16, marginTop: 16}}
            />
            <FlatList
              data={obras?.filter(obra =>
                obra.nro_orden
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()),
              )}
              keyExtractor={item => item.regi_codigo}
              contentContainerStyle={{gap: 16, padding: 16}}
              refreshing={isFetchObras}
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
          </>
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
      </View>
    </DrawerLayout>
  );
};
