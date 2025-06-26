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

export const ConsultaEjecucionScreen = () => {
  const {ejecucion, errorConsultarEjecucion} = useSearchConsultaEjecucion();
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

  return (
    <DrawerLayout title="Consulta de Ejecución">
      {ejecucion && ejecucion.length > 0 ? (
        <>
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
        style={{bottom: 16, right: 16, marginBottom: 16}}
      />
      <CustomBottomSheet ref={ref}>
        <SearchConsultaEjecucion onClose={close} />
      </CustomBottomSheet>
    </DrawerLayout>
  );
};
