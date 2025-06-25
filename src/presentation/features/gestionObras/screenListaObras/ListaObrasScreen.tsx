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
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LiquidacionObrasStackParam} from '../navigations/LiquidacionObrasStackNavigation';
import {listAllSaveActividadSinObraDB} from '../../../services/database/tablas/SaveActividadSinOrdenTabla';
import { useEjecucionObrasStore } from '../ejecucionObras/store/useEjecucionObrasStore';

const valuesEjecucion = {
  cbo_proy_codigo: '',
  cbo_tipo: 'ORDN',
  txt_busqueda: '',
};

export const ListaObrasScreen = () => {
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
    close,
  } = useSarchObras();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const {seleccionarOpcion} = useObrasNavigationStore();
  const [obrasFilter, setObrasFilter] = useState(obras);
  const [chipValue, setChipValue] = useState('0');
  const navigation =
    useNavigation<NavigationProp<LiquidacionObrasStackParam>>();
  const [isInicio, setIsInicio] = useState(false);
  const {isSaveActividad, setIsSaveActividad} = useEjecucionObrasStore();

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
      handleSearch(valuesEjecucion);
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

  useEffect(() => {
    listAllSaveActividadSinObraDB().then(data => {
      setIsInicio(data.length === 0);
      setIsSaveActividad(false);
    });
  }, [isSaveActividad]);

  return (
    <DrawerLayout title="Lista de Obras">
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

        {opcionSeleccionada === 'ejecutar' && (
          <>
            <CustomFAB
              icon="plus"
              label={isInicio ? 'Iniciar Actividad' : 'Finalizar Actividad'}
              onPress={() => {
                navigation.navigate('ActividaSinObra');
              }}
              style={{bottom: 85, left: 16}}
              color={isInicio ? globalColors.secondary : globalColors.warning}
            />
            <CustomFAB
              icon="sync"
              label="Sincronizar"
              loading={isFetchObras}
              onPress={() => handleSearch(valuesEjecucion)}
              style={{bottom: 16, left: 16}}
              color={globalColors.primary}
            />
            {/* <CustomFABGroup
              actions={[
                {
                  icon: 'plus',
                  label: 'Iniciar Actividad',
                  onPress: () => console.log('Star'),
                  color: globalColors.primary,
                },
                {
                  icon: 'sync',
                  label: 'Sincronizar',
                  onPress: () => handleSearch(valuesEjecucion),
                },
              ]}
            /> */}
          </>
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
