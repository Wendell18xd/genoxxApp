import {Searchbar} from 'react-native-paper';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {FlatList} from 'react-native-gesture-handler';
import SinResultados from '../../../../components/ui/SinResultados';
import CustomBottomSheet from '../../../../components/ui/bottomSheetModal/CustomBottomSheet';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import {useSearchConsultaHistoricaPatente} from './hooks/useSearchConsultaHistoricaPatente';
import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {useBottomSheetModal} from '../../../../hooks/useBottomSheet';
import {useQueryClient} from '@tanstack/react-query';
import {ItemConsultaHistoricaPatente} from './components/ItemConsultaHistoricaPatente';
import {SearchConsultaHistoricaPatente} from './components/SearchConsultaHistoricaPatente';

export const ListaConsultaHistoricaPatenteScreen = () => {
  const {
    consultaHistoricaPatente,
    errorConsultaHistoricaPatente,
    isFetchConsultaHistoricaPatente,
    refetchConsultaHistoricaPatente,
  } = useSearchConsultaHistoricaPatente();
  const {ref, open, close} = useBottomSheetModal();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (errorConsultaHistoricaPatente) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener la consulta',
      });
    }
  }, [errorConsultaHistoricaPatente]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['consultaHistoricaPatente'],
      });
    };
  }, []);
  return (
    <DrawerLayout title="Consulta Histórica de Patente">
      {consultaHistoricaPatente && consultaHistoricaPatente.length > 0 ? (
        <>
          <Searchbar
            placeholder="Filtrar"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{marginHorizontal: 16, marginTop: 16}}
          />
          <FlatList
            data={consultaHistoricaPatente?.filter(item =>
              item.cod_registro?.toLowerCase().includes(searchQuery.toLowerCase()),
            )}
            keyExtractor={item => item.cod_registro}
            contentContainerStyle={{gap: 16, padding: 16}}
            refreshing={isFetchConsultaHistoricaPatente}
            onRefresh={refetchConsultaHistoricaPatente}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <ItemConsultaHistoricaPatente consultaHistoricaPatente={item} />
            )}
          />
        </>
      ) : (
        <SinResultados message="No se encontraron resultados, use la lupa para buscar" />
      )}

      <CustomFAB
        icon="magnify"
        onPress={open}
        style={{bottom: 16, right: 16, marginBottom: 16}}
      />

      <CustomBottomSheet ref={ref}>
        <SearchConsultaHistoricaPatente onClose={close} />
      </CustomBottomSheet>
    </DrawerLayout>
  );
};
