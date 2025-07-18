import {useQueryClient} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {Text} from 'react-native-paper';

import DrawerLayout from '../main/layout/DrawerLayout';
import {CustomFAB} from '../../components/ui/CustomFAB';
import SinResultados from '../../components/ui/SinResultados';
import CustomBottomSheet from '../../components/ui/bottomSheetModal/CustomBottomSheet';
import {useBottomSheetModal} from '../../hooks/useBottomSheet';
import {SearchLiquiATC} from './liquidarMateriales/screenLiquiMatATC/components/SearchLiquiATC';
import {ItemLiquiMatATC} from './liquidarMateriales/screenLiquiMatATC/components/ItemLiquiMatATC';
import {useLiquiMatATC} from './liquidarMateriales/screenLiquiMatATC/hooks/useLiquiMatATC';
import Toast from 'react-native-toast-message';
import { ModalOrdPendMate } from './liquidarMateriales/screenOrdenPendMateScreen/components/ModalOrdPendMate';

export const LiquidarMaterialesPartidasScreen = () => {
  const {ref, open, close} = useBottomSheetModal();
  const queryClient = useQueryClient();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    liquidacion,
    isFetchingLiquidacion,
    refetchLiquidacion,
    errorLiquidacion,
    handleSelectLiquiMatATC,
  } = useLiquiMatATC();

  useEffect(() => {
    if (errorLiquidacion) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener la consulta',
      });
    }
  }, [errorLiquidacion]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['liquidacionATC'],
      });
    };
  }, []);
  return (
    <DrawerLayout title="Liquidación">
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          marginTop: 12,
        }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: '#FFC107',
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            elevation: 2,
          }}>
          <Text style={{fontWeight: 'bold'}}>MATERIALES: 25</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log('Ver pendientes de partidas')}
          style={{
            backgroundColor: '#FFC107',
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            elevation: 2,
          }}>
          <Text style={{fontWeight: 'bold'}}>PARTIDAS: 28</Text>
        </TouchableOpacity>
      </View>

      {liquidacion && liquidacion.length > 0 ? (
        <FlatList
          data={liquidacion}
          contentContainerStyle={{gap: 16, padding: 16}}
          refreshing={isFetchingLiquidacion}
          onRefresh={refetchLiquidacion}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ItemLiquiMatATC
              liquidacion={item}
              onPress={() => {
                item.nro_ots !== '' ? handleSelectLiquiMatATC(item) : undefined;
              }}
            />
          )}
        />
      ) : (
        <SinResultados message="No se encontraron resultados" />
      )}

      <CustomFAB
        icon="magnify"
        onPress={open}
        style={{bottom: 16, right: 16, marginBottom: 16}}
      />

      <CustomBottomSheet ref={ref}>
        <SearchLiquiATC onClose={close} />
      </CustomBottomSheet>

      <ModalOrdPendMate
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </DrawerLayout>
  );
};
