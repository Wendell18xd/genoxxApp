import { useSarchObras } from '../screenListaObras/hooks/useSarchObras';
import DrawerLayout from '../../main/layout/DrawerLayout';
import FullScreenLoader from '../../../components/ui/loaders/FullScreenLoader';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { ChipsFiltroEjecucion } from '../screenListaObras/components/ChipsFiltroEjecucion';
import CustomFlatList from '../../../components/ui/CustomFlatList';
import { ItemObra } from '../screenListaObras/components/ItemObra';
import SinResultados from '../../../components/ui/SinResultados';
import { CustomFAB } from '../../../components/ui/CustomFAB';
import CustomBottomSheet from '../../../components/ui/bottomSheetModal/CustomBottomSheet';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useObrasNavigationStore } from '../store/useObrasNavigationStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { EjecucionObrasStackParam } from '../navigations/EjecucionObrasStackNavigation';
import Toast from 'react-native-toast-message';
import { SeleccionarOpcionConsulta } from './components/SeleccionarOpcionConsulta';


export const ConsultaEjecucionScreen = () => {
 const {
    opcionSeleccionada,
    obras,
    errorObras,
    isFetchObras,
    isRefresthObra,
    ref,
    loadingActividades,
    refetchObras,
    handleSelectObra,
    handleSearch,
    handleOpenSearch,
  } = useSarchObras();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const {seleccionarOpcion} = useObrasNavigationStore();
  const [obrasFilter, setObrasFilter] = useState(obras);
  const [chipValue, setChipValue] = useState('0');
  const navigation = useNavigation<NavigationProp<EjecucionObrasStackParam>>();

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
        queryKey: [''],
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
      handleSearch();
    }
    if (opcionSeleccionada === 'menu') {
      setSearchQuery('');
      setObrasFilter(obras);
      setChipValue('0');
      queryClient.removeQueries({
        queryKey: ['obrasAsignadas'],
      });
    }
  }, [opcionSeleccionada, isRefresthObra]);

  return (
    <DrawerLayout title="Consulta de Ejecución">
      {(isFetchObras || loadingActividades) && (
        <FullScreenLoader
          message={
            opcionSeleccionada !== 'ejecutar' ? 'Cargando' : 'Sincronizando'
          }
          transparent={opcionSeleccionada !== 'ejecutar'}
        />
      )}

      <View style={{flex: 1}}>
        {obras && obras.length > 0 ? (
          <>
            <Searchbar
              placeholder="Filtrar por nro de orden"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={{marginHorizontal: 16, marginTop: 16}}
            />

            {opcionSeleccionada !== 'ejecutar' && (
              <ChipsFiltroEjecucion value={chipValue} setValue={setChipValue} />
            )}

            <CustomFlatList
              data={obrasFilter?.filter(obra =>
                obra.nro_orden
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()),
              )}
              keyExtractor={item => item.regi_codigo}
              contentContainerStyle={{gap: 16, padding: 16}}
              refreshing={isFetchObras}
              onRefresh={
                opcionSeleccionada === 'liquidar' ? refetchObras : undefined
              }
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

        {/* {opcionSeleccionada === 'ejecutar' && (
          <>
            <CustomFAB
              icon="plus"
              label={isInicio ? 'Iniciar Actividad' : 'Finalizar Actividad'}
              onPress={() => {
                navigation.navigate('');
              }}
              style={{bottom: 85, left: 16}}
              color={isInicio ? globalColors.secondary : globalColors.warning}
            />
            <CustomFAB
              icon="sync"
              label="Sincronizar"
              loading={isFetchObras}
              onPress={() => handleSearch()}
              style={{bottom: 16, left: 16}}
              color={globalColors.primary}
            />
          </>
        )} */}

        <CustomFAB
          icon="magnify"
          onPress={handleOpenSearch}
          style={{bottom: 16, right: 16}}
        />

        <CustomBottomSheet ref={ref}>
          <SeleccionarOpcionConsulta onClose={close} />
        </CustomBottomSheet>
      </View>
    </DrawerLayout>
  );
};


