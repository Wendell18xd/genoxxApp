import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import DrawerLayout from '../../main/layout/DrawerLayout';
import {FlatList} from 'react-native-gesture-handler';
import {useSearchPatente} from './hooks/useSearchPatente';
import { SearchPatente } from './components/SearchPatente';
import { ItemPatente } from './components/ItemPatente';

export const BuscadorPatenteScreen = () => {
  const {
    patente,
    errorPatente,
    isFetchPatente,
    refetchPatente,
    handleSelectPatente,
  } = useSearchPatente();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (errorPatente) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener la consulta',
      });
    }
  }, [errorPatente]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['consultaPatentes'],
      });
    };
  }, []);

  return (
    <DrawerLayout title="Búsqueda de Patente">
        <>
          <SearchPatente/>
          <FlatList
            data={patente}
            keyExtractor={item => item.nro_placa}
            contentContainerStyle={{gap: 16, padding: 16}}
            refreshing={isFetchPatente}
            onRefresh={refetchPatente}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <ItemPatente
                patente={item}
                onPress={() => {
                  handleSelectPatente(item);
                }}
              />
            )}
          />
        </>
    </DrawerLayout>
  );
};
