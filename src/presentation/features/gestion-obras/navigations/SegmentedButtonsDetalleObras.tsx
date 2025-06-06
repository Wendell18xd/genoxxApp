import {View, StyleSheet} from 'react-native';
import DrawerLayout from '../../main/layout/DrawerLayout';
import {useLiquiMateStore} from '../liquidar-materiales/store/useLiquiMateStore';
import {useEffect, useState} from 'react';
import {SegmentedButtons, useTheme} from 'react-native-paper';
import {DetalleObraScreen} from '../screen-detalle-obra/DetalleObraScreen';
import {FotosMaterialesObraScreen} from '../liquidar-materiales/screen-materiales-fotos-obra/FotosMaterialesObraScreen';
import {useObrasStore} from '../store/useObrasStore';
import {ChipsLiquidacionScreen} from '../liquidar-materiales/screen-materiales-obra/ChipsLiquidacionScreen';
import {MaterialesObraScreen} from '../liquidar-materiales/screen-materiales-obra/MaterialesObraScreen';

export const SegmentedButtonsDetalleObras = () => {
  const {reset: resetLiquiMate} = useLiquiMateStore();
  const {reset: resetObras} = useObrasStore();
  const [value, setValue] = useState('1');
  const {colors} = useTheme();

  const [mounted, setMounted] = useState<{[key: string]: boolean}>({
    '1': true,
    '2': false,
    '3': false,
  });

  useEffect(() => {
    return () => {
      resetLiquiMate();
      resetObras();
    };
  }, []);

  useEffect(() => {
    // Marcar como montado el valor actual si no lo está
    if (!mounted[value]) {
      setMounted(prev => ({...prev, [value]: true}));
    }
  }, [value]);

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
              label: 'Detalle',
              checkedColor: 'white',
              icon: 'format-list-bulleted-type',
            },
            {
              value: '2',
              label: 'Liquidado',
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
            <ChipsLiquidacionScreen>
              <MaterialesObraScreen />
            </ChipsLiquidacionScreen>
          </View>
        )}
        {mounted['3'] && (
          <View style={[styles.screen, value !== '3' && styles.hidden]}>
            <FotosMaterialesObraScreen />
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
