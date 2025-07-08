import DrawerLayout from '../../../main/layout/DrawerLayout';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useSearchConsulta} from './hooks/useSearchConsulta';
import {useBottomSheetModal} from '../../../../hooks/useBottomSheet';
import {useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {Searchbar} from 'react-native-paper';
import SinResultados from '../../../../components/ui/SinResultados';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import {ItemConsulta} from './components/ItemConsulta';
import CustomBottomSheet from '../../../../components/ui/bottomSheetModal/CustomBottomSheet';
import {SearchPlaca} from './components/SearchPlaca';
import { View } from 'react-native';

export const ListaConsultaUnidadesScreen = () => {
  const {
    consulta,
    errorConsulta,
    isFetchConsulta,
    refetchConsulta,
    handleSelectConsulta,
  } = useSearchConsulta();
  const {ref, open, close} = useBottomSheetModal();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (errorConsulta) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener la consulta',
      });
    }
  }, [errorConsulta]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['consultaUnidades'],
      });
    };
  }, []);

  return (
    <DrawerLayout title="Consulta de Unidades">
      <View style={{flex: 1}}>
        {consulta && consulta.length > 0 ? (
          <>
            <Searchbar
              placeholder="Filtrar por número de placa"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={{marginHorizontal: 16, marginTop: 16}}
            />
            <FlatList
              data={consulta?.filter(item =>
                item.nro_placa
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()),
              )}
              keyExtractor={item => item.nro_placa}
              contentContainerStyle={{gap: 16, padding: 16}}
              refreshing={isFetchConsulta}
              onRefresh={refetchConsulta}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <ItemConsulta
                  consulta={item}
                  onPress={() => {
                    handleSelectConsulta(item);
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
      </View>
    </DrawerLayout>
  );
};
