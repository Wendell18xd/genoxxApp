import {View, StyleSheet} from 'react-native';
import DrawerLayout from '../../main/layout/DrawerLayout';
import {useLiquiMateStore} from '../liquidarMateriales/store/useLiquiMateStore';
import {useEffect} from 'react';
import {SegmentedButtons, useTheme} from 'react-native-paper';
import {DetalleObraScreen} from '../screenDetalleObra/DetalleObraScreen';
import {useObrasStore} from '../store/useObrasStore';
import {useMounted} from '../../../hooks/useMounted';
import {ChipsLiquidacionObrasScreen} from '../screenLiquidadoObra/ChipsLiquidacionObrasScreen';
import {ChipsFotosObrasScreen} from '../screenFotosObra/ChipsFotosObrasScreen';

export const SegmentedButtonsDetalleObras = () => {
  const {reset: resetLiquiMate} = useLiquiMateStore();
  const {reset: resetObras} = useObrasStore();
  const {colors} = useTheme();
  const {value, mounted, setValue} = useMounted({
    defaultValue: '1',
    initialParams: {
      '1': true,
      '2': false,
      '3': false,
    },
  });

  useEffect(() => {
    return () => {
      resetLiquiMate();
      resetObras();
    };
  }, []);

  return (
    <DrawerLayout title="Detalle de Obra">
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
              icon: 'format-list-bulleted-type',
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
            <DetalleObraScreen />
          </View>
        )}
        {mounted['2'] && (
          <View style={[styles.screen, value !== '2' && styles.hidden]}>
            <ChipsLiquidacionObrasScreen />
          </View>
        )}
        {mounted['3'] && (
          <View style={[styles.screen, value !== '3' && styles.hidden]}>
            <ChipsFotosObrasScreen />
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
