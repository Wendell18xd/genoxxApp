import DrawerLayout from '../../main/layout/DrawerLayout';
import {CustomFAB} from '../../../components/ui/CustomFAB';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useSearchConsultaEjecucion} from './hooks/useSearchConsultaEjecucion';
import Toast from 'react-native-toast-message';
import {SearchConsultaEjecucion} from './components/SearchConsultaEjecucion';
import CustomBottomSheet from '../../../components/ui/bottomSheetModal/CustomBottomSheet';
import SinResultados from '../../../components/ui/SinResultados';
import {useBottomSheetModal} from '../../../hooks/useBottomSheet';
import {ItemConsultaEjecucion} from './components/ItemConsultaEjecucion';
import {FlatList} from 'react-native-gesture-handler';
import CustomKeyboardAvoidingView from '../../../components/ui/CustomKeyboardAvoidingView';
import {View} from 'react-native';

export const ConsultaEjecucionScreen = () => {
  const {
    ejecucion,
    errorConsultarEjecucion,
    refetchConsultarEjecucion,
    isFetchConsultarEjecucion,
    handleSelectConsultaEjecucion,
  } = useSearchConsultaEjecucion();
  const {ref, open, close} = useBottomSheetModal();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (errorConsultarEjecucion) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener la consulta',
      });
    }
  }, [errorConsultarEjecucion]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['consultarEjecucion'],
      });
    };
  }, []);
  console.log('Ejecucion:', ejecucion);
  return (
    <DrawerLayout title="Consulta de Ejecución">
      <View style={{flex: 1}}>
        <CustomKeyboardAvoidingView>
          {ejecucion && ejecucion.length > 0 ? (
            <>
              <FlatList
                data={ejecucion}
                contentContainerStyle={{gap: 16, padding: 16}}
                refreshing={isFetchConsultarEjecucion}
                onRefresh={refetchConsultarEjecucion}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <ItemConsultaEjecucion
                    consulta={item}
                    onPress={() => {
                      item.nro_orden !== ''
                        ? handleSelectConsultaEjecucion(item)
                        : undefined;
                    }}
                  />
                )}
              />
              <CustomFAB
                icon="magnify"
                onPress={open}
                style={{bottom: 16, right: 16, marginBottom: 16}}
              />
            </>
          ) : (
            <SinResultados message="No se encontraron resultados" />
          )}
          <CustomFAB
            icon="magnify"
            onPress={open}
            style={{bottom: 16, right: 16}}
          />
          <CustomBottomSheet ref={ref}>
            <SearchConsultaEjecucion onClose={close} />
          </CustomBottomSheet>
        </CustomKeyboardAvoidingView>
      </View>
    </DrawerLayout>
  );
};
