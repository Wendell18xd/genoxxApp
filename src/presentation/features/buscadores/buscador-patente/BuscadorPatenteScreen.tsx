
import {useQueryClient} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import DrawerLayout from '../../main/layout/DrawerLayout';
import {Searchbar} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import SinResultados from '../../../components/ui/SinResultados';
import {CustomFAB} from '../../../components/ui/CustomFAB';
import CustomBottomSheet from '../../../components/ui/bottomSheetModal/CustomBottomSheet';
import { useSearchPatente } from './hooks/useSearchPatente';
import { useBottomSheetModal } from '../../../hooks/useBottomSheet';

export const BuscadorPatenteScreen = () => {
  const {
    consultaPatente,
    errorConsultaPatente,
    isFetchConsultaPatente,
    refetchConsultaPatente,
    handleSelectConsultaPatente,
  } = useSearchPatente();
  const {ref, open, close} = useBottomSheetModal();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (errorConsultaPatente) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener la consulta',
      });
    }
  }, [errorConsultaPatente]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['consultaUnidades'],
      });
    };
  }, []);

  return (
    <DrawerLayout title="Consulta de Patente">
      {consultaPatente && consultaPatente.length > 0 ? (
        <>
          <Searchbar
            placeholder="Filtrar por número de placa"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{marginHorizontal: 16, marginTop: 16}}
          />
          <FlatList
            data={consultaPatente?.filter(item =>
              item.nro_placa?.toLowerCase().includes(searchQuery.toLowerCase()),
            )}
            keyExtractor={item => item.nro_placa}
            contentContainerStyle={{gap: 16, padding: 16}}
            refreshing={isFetchConsultaPatente}
            onRefresh={refetchConsultaPatente}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <ItemConsultaPatente
                consulta={item}
                onPress={() => {
                  handleSelectConsultaPatente(item);
                }}
              />
            )}
          />
        </>
      ) : (
        <SinResultados message="No se encontraron unidades, use la lupa para buscar" />
      )}

      <CustomFAB
        icon="magnify"
        onPress={open}
        style={{bottom: 16, right: 16, marginBottom: 16}}
      />

      <CustomBottomSheet ref={ref}>
        <SearchPlaca onClose={close} />
      </CustomBottomSheet>
    </DrawerLayout>
  );
};
