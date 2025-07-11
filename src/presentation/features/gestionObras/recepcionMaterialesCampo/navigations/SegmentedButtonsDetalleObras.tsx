import {View, StyleSheet} from 'react-native';
import {useEffect} from 'react';
import {SegmentedButtons, useTheme} from 'react-native-paper';
import DetalleMaterialesCampoScreen from '../screenDetalleMaterialesCampo/DetalleMaterialesCampoScreen';
import {useObrasStore} from '../../store/useObrasStore';
import {useMounted} from '../../../../hooks/useMounted';
import {DetalleObraScreen} from '../../screenDetalleObra/DetalleObraScreen';
import DrawerLayout from '../../../main/layout/DrawerLayout';

export const SegmentedButtonsMatesCampo = () => {
  const {reset: resetObras} = useObrasStore();
  const {colors} = useTheme();
  const {value, mounted, setValue} = useMounted({
    defaultValue: '1',
    initialParams: {
      '1': true,
      '2': true,
    },
  });

  useEffect(() => {
    return () => {
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
              label: 'Recepción',
              checkedColor: 'white',
              icon: 'cube',
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
            <DetalleMaterialesCampoScreen />
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
