import DrawerLayout from '../../../main/layout/DrawerLayout';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useBottomSheetModal} from '../../../../hooks/useBottomSheet';
import {useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {Searchbar} from 'react-native-paper';
import SinResultados from '../../../../components/ui/SinResultados';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import CustomBottomSheet from '../../../../components/ui/bottomSheetModal/CustomBottomSheet';
import { useSearchInspeccion } from './hooks/useSearchInspeccion';
import { SearchInspeccion } from './components/SearchInspeccion';
import { ItemInspeccion } from './components/ItemInspeccion';

export const ListaConsultaInspeccionesScreen = () => {
  const {
    inspeccion,
    errorInspeccion,
    isFetchInspeccion,
    refetchInspeccion,
    handleSelectInspeccion,
  } = useSearchInspeccion();
  const {ref, open, close} = useBottomSheetModal();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (errorInspeccion) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener la consulta',
      });
    }
  }, [errorInspeccion]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['consultaInspecciones'],
      });
    };
  }, []);

  return (
    <DrawerLayout title="Consulta de Inspecciones">
      {inspeccion && inspeccion.length > 0 ? (
        <>
          <Searchbar
            placeholder="Filtrar por número de placa"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{marginHorizontal: 16, marginTop: 16}}
          />
          <FlatList
            data={inspeccion?.filter(item =>
              item.placa?.toLowerCase().includes(searchQuery.toLowerCase()),
            )}
            keyExtractor={item => item.numero_inspeccion}
            contentContainerStyle={{gap: 16, padding: 16}}
            refreshing={isFetchInspeccion}
            onRefresh={refetchInspeccion}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <ItemInspeccion
                inspeccion={item}
                onPress={() => {
                  handleSelectInspeccion(item);
                }}
              />
            )}
          />
        </>
      ) : (
        <SinResultados message="No se encontraron inspecciones, use la lupa para buscar" />
      )}

      <CustomFAB
        icon="magnify"
        onPress={open}
        style={{bottom: 16, right: 16, marginBottom: 16}}
      />

      <CustomBottomSheet ref={ref}>
        <SearchInspeccion onClose={close} />
      </CustomBottomSheet>
    </DrawerLayout>
  );
};
