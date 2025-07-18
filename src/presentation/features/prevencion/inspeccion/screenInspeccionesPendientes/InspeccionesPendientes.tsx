import {View} from 'react-native';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import CustomBottomSheet from '../../../../components/ui/bottomSheetModal/CustomBottomSheet';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import {useBottomSheetModal} from '../../../../hooks/useBottomSheet';
import GenerarAutoInspeccion from './components/GenerarAutoInspeccion';
import SinResultados from '../../../../components/ui/SinResultados';
import {useFirmaStore} from '../../../firma/store/useFirmaStore';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {InspeccionesStackParam} from '../navigation/InspeccionesStackNavigation';
import {useScannerStore} from '../../../barcodeScanner/store/useScannerStore';
import {useEffect} from 'react';
import {Text} from 'react-native-paper';
import {FadeInImage} from '../../../../components/ui/FadeInImage';

const InspeccionesPendientes = () => {
  const {ref, open, close} = useBottomSheetModal();
  const navigation = useNavigation<NavigationProp<InspeccionesStackParam>>();
  const {firma, clearFirma} = useFirmaStore();
  const {codigo, resetCodigo} = useScannerStore();

  const openFirma = () => {
    clearFirma();
    navigation.navigate('FirmaScreen');
  };

  const openScanBar = () => {
    resetCodigo();
    navigation.navigate('BarcodeScannerScreen');
  };

  useEffect(() => {
    return () => {
      clearFirma();
      resetCodigo();
    };
  }, []);

  console.log(firma);

  return (
    <DrawerLayout>
      <View style={{flex: 1, padding: 16}}>
        {/*
        <SinResultados message="No se encontraron inspecciones asiganadas" />
        {firma && (
          <FadeInImage uri={firma} style={{width: '100%', height: 200}} />
        )} */}

        {firma && (
          <FadeInImage uri={firma} style={{width: '100%', height: 200}} />
        )}

        <Text>{codigo}</Text>

        <CustomFAB
          icon="plus"
          onPress={openFirma}
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
