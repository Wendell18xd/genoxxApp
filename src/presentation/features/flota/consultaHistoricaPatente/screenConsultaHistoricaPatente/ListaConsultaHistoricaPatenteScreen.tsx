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
import {SearchConsultaHistoricaPatente} from './components/SearchConsultaHistoricaPatente';
import {ItemConsultaHistoricaPersonal} from './components/ItemConsultaHistoricaPersonal';
import {ItemConsultaHistoricaPatente} from './components/ItemConsultaHistoricaPatente';
import {View} from 'react-native';

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
  const [tipoBusqueda, setTipoBusqueda] = useState<
    'PERS' | 'PLACA' | undefined
  >(undefined);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const handleClose = (tipoSeleccionado: 'PERS' | 'PLACA') => {
    setTipoBusqueda(tipoSeleccionado);
    setBusquedaRealizada(true);
    close();
  };

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
      <View style={{flex: 1}}>
        {!busquedaRealizada || !tipoBusqueda ? (
          <SinResultados message="No se encontraron resultados, use la lupa para buscar" />
        ) : consultaHistoricaPatente && consultaHistoricaPatente.length > 0 ? (
          <>
            <Searchbar
              placeholder="Filtrar"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={{marginHorizontal: 16, marginTop: 16}}
            />

            <FlatList
              data={consultaHistoricaPatente.filter(item =>
                (
                  (item.nro_placa ?? '') +
                  ' ' +
                  (item.cod_perfil ?? '') +
                  ' ' +
                  (item.nom_perfil ?? '')
                )
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
              )}
              keyExtractor={item => item.cod_registro}
              contentContainerStyle={{gap: 16, padding: 16}}
              refreshing={isFetchConsultaHistoricaPatente}
              onRefresh={refetchConsultaHistoricaPatente}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>
                tipoBusqueda === 'PERS' ? (
                  <ItemConsultaHistoricaPersonal
                    consultaHistoricaPersonal={item}
                  />
                ) : (
                  <ItemConsultaHistoricaPatente
                    consultaHistoricaPatente={item}
                  />
                )
              }
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
          <SearchConsultaHistoricaPatente onClose={handleClose} />
        </CustomBottomSheet>
      </View>
    </DrawerLayout>
  );
};
