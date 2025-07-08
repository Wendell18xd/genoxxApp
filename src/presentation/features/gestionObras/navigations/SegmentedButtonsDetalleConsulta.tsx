import { SegmentedButtons, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import DrawerLayout from '../../main/layout/DrawerLayout';
import { useMounted } from '../../../hooks/useMounted';
import { FotosConsultaScreen } from '../screenConsultarEjecucion/screenConsultaFotos/FotosConsultaScreen';
import { DetalleConsultaEjecucionScreen } from '../screenConsultarEjecucion/screenDetalleConsulta/DetalleConsultaEjecucionScreen';
import { useConsultaEjecucionStore } from '../store/useConsultaEjecucionStore';

export const SegmentedButtonsDetalleConsulta = () => {
  const {colors} = useTheme();
  const {consulta} = useConsultaEjecucionStore();
  const {value, mounted, setValue} = useMounted({
    defaultValue: '1',
    initialParams: {
      '1': true,
      '2': false,
    },
  });

  if(!consulta) {return undefined;}

  return (
    <DrawerLayout title="Consultar Ejecucion">
      <View style = {{paddingHorizontal: 16, paddingTop: 16}}>
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
            <DetalleConsultaEjecucionScreen/>
          </View>
        )}
        {mounted['2'] && (
          <View style={[styles.screen, value !== '2' && styles.hidden]}>
            <FotosConsultaScreen/>
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
