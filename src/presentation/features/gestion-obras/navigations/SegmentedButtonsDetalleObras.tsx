import {View, StyleSheet} from 'react-native';
import DrawerLayout from '../../main/layout/DrawerLayout';
import {useLiquiMateStore} from '../liquidar-materiales/store/useLiquiMateStore';
import {useEffect, useState} from 'react';
import {SegmentedButtons, useTheme} from 'react-native-paper';
import {DetalleObraScreen} from '../screen-detalle-obra/DetalleObraScreen';
import {MaterialesObraScreen} from '../liquidar-materiales/screen-materiales-obra/MaterialesObraScreen';
import {FotosMaterialesObraScreen} from '../liquidar-materiales/screen-materiales-fotos-obra/FotosMaterialesObraScreen';
import {useObrasStore} from '../store/useObrasStore';
import {useMainStore} from '../../../store/main/useMainStore';
import {Menu} from '../../../../types/menus';
import {PartidasObrasScreen} from '../liquidar-partidas/screen-partidas-obra/PartidasObrasScreen';

export const SegmentedButtonsDetalleObras = () => {
  const {reset: resetLiquiMate} = useLiquiMateStore();
  const {reset: resetObras} = useObrasStore();
  const [value, setValue] = useState('1');
  const {colors} = useTheme();
  const {drawerKey} = useMainStore();
  const [isMateriales, setIsMateriales] = useState(false);

  useEffect(() => {
    setIsMateriales(
      drawerKey === Menu.LIQUIDACION_MATERIALES_OBRAS ||
        drawerKey === Menu.LIQUIDACION_MATERIALES_OBRAS_ENERGIA,
    );

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
              label: 'Detalle',
              checkedColor: 'white',
              icon: 'format-list-bulleted-type',
            },
            {
              value: '2',
              label: isMateriales ? 'Materiales' : 'Partidas',
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
        <View style={[styles.screen, value !== '1' && styles.hidden]}>
          <DetalleObraScreen />
        </View>
        <View style={[styles.screen, value !== '2' && styles.hidden]}>
          {isMateriales ? <MaterialesObraScreen /> : <PartidasObrasScreen />}
        </View>
        <View style={[styles.screen, value !== '3' && styles.hidden]}>
          {isMateriales ? (
            <FotosMaterialesObraScreen />
          ) : (
            <FotosMaterialesObraScreen />
          )}
        </View>
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
