import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import DrawerLayout from '../../main/layout/DrawerLayout';
import {FlatList} from 'react-native-gesture-handler';
import { useSearchPersonal } from './hooks/useSearchPersonal';
import { SearchPersonal } from './components/SearchPersonal';
import { ItemConductor } from './components/ItemConductor';

export const BuscadorPersonalScreen = () => {
  const {
    personal,
    errorPersonal,
    isFetchPersonal,
    refetchPersonal,
    handleSelectPersonal,
  } = useSearchPersonal();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (errorPersonal) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener la consulta',
      });
    }
  }, [errorPersonal]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['consultaPersonal'],
      });
    };
  }, []);

  return (
    <DrawerLayout title="Búsqueda de Personal">
        <>
          <SearchPersonal/>
          <FlatList
            data={personal}
            keyExtractor={item => item.cod_para}
            contentContainerStyle={{gap: 16, padding: 16}}
            refreshing={isFetchPersonal}
            onRefresh={refetchPersonal}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <ItemConductor
                personal={item}
                onPress={() => {
                  handleSelectPersonal(item);
                }}
              />
            )}
          />
        </>
    </DrawerLayout>
  );
};
