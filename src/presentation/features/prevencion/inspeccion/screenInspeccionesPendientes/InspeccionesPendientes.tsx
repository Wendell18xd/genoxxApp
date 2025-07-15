import {View} from 'react-native';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import CustomBottomSheet from '../../../../components/ui/bottomSheetModal/CustomBottomSheet';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import {useBottomSheetModal} from '../../../../hooks/useBottomSheet';
import GenerarAutoInspeccion from './components/GenerarAutoInspeccion';
import SinResultados from '../../../../components/ui/SinResultados';

const InspeccionesPendientes = () => {
  const {ref, open, close} = useBottomSheetModal();

  return (
    <DrawerLayout>
      <View style={{flex: 1, padding: 16}}>
        <SinResultados message="No se encontraron inspecciones asiganadas" />

        <CustomFAB
          icon="plus"
          onPress={open}
          style={{bottom: 16, right: 16}}
        />

        <CustomBottomSheet ref={ref}>
          <GenerarAutoInspeccion onClose={close} />
        </CustomBottomSheet>
      </View>
    </DrawerLayout>
  );
};

export default InspeccionesPendientes;
