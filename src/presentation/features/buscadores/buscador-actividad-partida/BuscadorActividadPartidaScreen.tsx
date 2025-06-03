import DrawerLayout from '../../main/layout/DrawerLayout';
import {FlatList} from 'react-native-gesture-handler';
import {SearchActividad} from './components/SearchActividad';
import {useSearchActividad} from './hooks/useSearchActividad';
import {ItemActividad} from './components/ItemActividad';
import {View} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';

export const BuscadorActividadPartidaScreen = () => {
  const {
    actividadPartida,
    isFetchActividadPartida,
    errorActividadPartida,
    refetchActividadPartida,
    handleSelectActividadPartida,
  } = useSearchActividad();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (errorActividadPartida) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener la consulta',
      });
    }
  }, [errorActividadPartida]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['consultaActividadPartida'],
      });
    };
  }, []);

  return (
    <DrawerLayout title="Búsqueda de Actividades">
      <View style={{flex: 1, padding: 16}}>
        <SearchActividad />
        <FlatList
          data={actividadPartida}
          keyExtractor={item => item.cod_para}
          contentContainerStyle={{gap: 16}}
          refreshing={isFetchActividadPartida}
          onRefresh={refetchActividadPartida}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ItemActividad
              item={item}
              onPress={() => {
                handleSelectActividadPartida(item);
              }}
            />
          )}
        />
      </View>
    </DrawerLayout>
  );
};
