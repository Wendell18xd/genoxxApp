import {SegmentedButtons, useTheme} from 'react-native-paper';
import {useLiquiMatATC} from '../liquidarMateriales/screenLiquiMatATC/hooks/useLiquiMatATC';
import {useMounted} from '../../../hooks/useMounted';
import DrawerLayout from '../../main/layout/DrawerLayout';
import {StyleSheet, View} from 'react-native';
import { DetalleConsultaEjecucionScreen } from '../liquidarMateriales/screenDetalleMatATC/DetalleMatATCScreen';
import { ChipsLiquidacionMatScreen } from '../liquidarMateriales/screenMatLiquidadosATC/ChipsLiquidacionMatScreen';

export const SegmentedButtonsLiquiMatATC = () => {
  const {colors} = useTheme();
  const {liquidacion} = useLiquiMatATC();
  const {value, mounted, setValue} = useMounted({
    defaultValue: '1',
    initialParams: {
      '1': true,
      '2': false,
      '3': false,
    },
  });

  if(!liquidacion) {return undefined;}

  return (
    <DrawerLayout title="Detalle de Liquidación Material">
      <View style={{paddingHorizontal: 16, paddingTop: 16}}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          theme={{
            colors: {
              secondaryContainer: colors.secondary,
            },
          }}
          buttons={[
            {
              value: '1',
              label: 'Info',
              checkedColor: 'white',
              icon: 'cube',
            },
            {
              value: '2',
              label: 'Liquidaciones',
              checkedColor: 'white',
              icon: 'cube',
            },
            {
              value: '3',
              label: 'Fotos',
              checkedColor: 'white',
              icon: 'camera',
            },
          ]}
        />
      </View>

      {/* Todas las pantallas montadas siempre */}
      <View style={styles.screenContainer}>
        {mounted['1'] && (
          <View style={[styles.screen, value !== '1' && styles.hidden]}>
            <DetalleConsultaEjecucionScreen />
          </View>
        )}
        {mounted['2'] && (
          <View style={[styles.screen, value !== '2' && styles.hidden]}>
            <ChipsLiquidacionMatScreen/>
          </View>
        )}
        {mounted['3'] && (
          <View style={[styles.screen, value !== '3' && styles.hidden]}>
            {/* </> */}
          </View>
        )}
      </View>
    </DrawerLayout>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  hidden: {
    display: 'none',
  },
});
