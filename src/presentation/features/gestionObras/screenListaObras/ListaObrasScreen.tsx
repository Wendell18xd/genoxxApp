// ListaObrasScreen.tsx
import {FlatList, View} from 'react-native';
import {useSarchObras} from './hooks/useSarchObras';
import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {useQueryClient} from '@tanstack/react-query';
import {Searchbar} from 'react-native-paper';
import DrawerLayout from '../../main/layout/DrawerLayout';
import {ItemObra} from './components/ItemObra';
import SinResultados from '../../../components/ui/SinResultados';
import {CustomFAB} from '../../../components/ui/CustomFAB';
import CustomBottomSheet from '../../../components/ui/bottomSheetModal/CustomBottomSheet';
import {SeleccionarOpcionObra} from './components/SeleccionarOpcionObra';
import {useObrasNavigationStore} from '../store/useObrasNavigationStore';
import FullScreenLoader from '../../../components/ui/loaders/FullScreenLoader';
import {ChipsFiltroEjecucion} from './components/ChipsFiltroEjecucion';
import {globalColors} from '../../../styles/globalStyle';

export const ListaObrasScreen = () => {
  const {
    opcionSeleccionada,
    obras,
    errorObras,
    isFetchObras,
    ref,
    loadingActividades,
    refetchObras,
    handleSelectObra,
    handleSearch,
    handleOpenSearch,
    close,
  } = useSarchObras();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const {seleccionarOpcion} = useObrasNavigationStore();
  const [obrasFilter, setObrasFilter] = useState(obras);
  const [chipValue, setChipValue] = useState('0');

  useEffect(() => {
    if (opcionSeleccionada === 'ejecutar') {
      setObrasFilter(
        obras?.filter(obra => obra.estado_ejecucion === chipValue) || [],
      );
    } else {
      setObrasFilter(obras);
    }
  }, [obras, chipValue]);

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

  useEffect(() => {
    return () => {
      seleccionarOpcion('menu');
    };
  }, []);

  useEffect(() => {
    if (opcionSeleccionada === 'ejecutar') {
      const values = {
        cbo_proy_codigo: '',
        cbo_tipo: 'ORDN',
        txt_busqueda: '',
      };
      handleSearch(values);
    }
    if (opcionSeleccionada === 'menu') {
      setSearchQuery('');
      setObrasFilter(obras);
      setChipValue('0');
      queryClient.removeQueries({
        queryKey: ['obrasAsignadas'],
      });
    }
  }, [opcionSeleccionada]);

  return (
    <DrawerLayout title="Lista de Obras">
      {(isFetchObras || loadingActividades) && <FullScreenLoader transparent />}

      <View style={{flex: 1}}>
        {obras && obras.length > 0 ? (
          <>
            <Searchbar
              placeholder="Filtrar por nro de orden"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={{marginHorizontal: 16, marginTop: 16}}
            />

            {opcionSeleccionada !== 'liquidar' && (
              <ChipsFiltroEjecucion value={chipValue} setValue={setChipValue} />
            )}

            <FlatList
              data={obrasFilter?.filter(obra =>
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
                  opcionSeleccionada={opcionSeleccionada}
                  onPress={() => {
                    handleSelectObra(item);
                  }}
                />
              )}
            />
          </>
        ) : (
          <SinResultados
            message={
              opcionSeleccionada === 'ejecutar'
                ? 'No tienes ordenes asignadas, Consultar con despacho'
                : 'No se encontraron obras, use la lupa para buscar'
            }
          />
        )}

        {opcionSeleccionada === 'ejecutar' && (
          <CustomFAB
            icon="sync"
            label="Sincronizar"
            loading={isFetchObras}
            onPress={refetchObras}
            style={{bottom: 16, left: 16}}
            color={globalColors.primary}
          />
        )}

        <CustomFAB
          icon="magnify"
          onPress={handleOpenSearch}
          style={{bottom: 16, right: 16}}
        />

        <CustomBottomSheet ref={ref}>
          <SeleccionarOpcionObra onClose={close} />
        </CustomBottomSheet>
      </View>
    </DrawerLayout>
  );
};
