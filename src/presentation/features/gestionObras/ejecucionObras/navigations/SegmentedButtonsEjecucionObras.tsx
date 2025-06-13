import {View, StyleSheet} from 'react-native';
import {useEffect} from 'react';
import {SegmentedButtons, useTheme} from 'react-native-paper';
import {EjecucionObras} from '../ejecucionConObra/screen-ejecucion-obra/EjecucionObras';
import {useMounted} from '../../../../hooks/useMounted';
import {useLiquiMateStore} from '../../liquidarMateriales/store/useLiquiMateStore';
import {DetalleObraScreen} from '../../screenDetalleObra/DetalleObraScreen';
import {useObrasStore} from '../../store/useObrasStore';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {useFotosStore} from '../../../foto/store/useFotosStore';

export const SegmentedButtonsEjecucionObras = () => {
  const {reset: resetLiquiMate} = useLiquiMateStore();
  const {reset: resetObras} = useObrasStore();
  const {onReset: resetFotos} = useFotosStore();
  const {colors} = useTheme();
  const {value, mounted, setValue} = useMounted({
    defaultValue: '1',
    initialParams: {
      '1': true,
      '2': true,
      '3': false,
    },
  });

  useEffect(() => {
    return () => {
      resetLiquiMate();
      resetObras();
      resetFotos();
    };
  }, []);

  return (
    <DrawerLayout>
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
              label: 'Ejecución',
              checkedColor: 'white',
              icon: 'account-hard-hat-outline',
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
            <EjecucionObras />
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
