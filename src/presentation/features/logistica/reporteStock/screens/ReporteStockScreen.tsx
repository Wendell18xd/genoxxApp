import React from 'react';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import { StyleSheet, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { useMounted } from '../../../../hooks/useMounted';
import DetalleStockScreen from './screenDetalleStock/DetalleStockScreen';
import StockSeriesScreen from './screenStockSeries/StockSeriesScreen';


export const ReporteStockScreen = () => {
  const {colors} = useTheme();
  const {value, mounted, setValue} = useMounted({
      defaultValue: '1',
      initialParams: {
        '1': true,
        '2': false,
        '3': false,
      },
    });

  return (
    <DrawerLayout>
      {/* <Tab.Navigator>
        <Tab.Screen
          name="DETALLE DE STOCK"
          component={DetalleStockScreen}
        />
        <Tab.Screen name="STOCK DE SERIES" component={StockSeriesScreen} />
      </Tab.Navigator> */}


      <View style= {{paddingHorizontal: 16, paddingTop: 16}}>
        <SegmentedButtons
          theme={{
            colors: {
              secondaryContainer: colors.primary,
            },
          }}
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: '1',
              label: 'DETALLE DE STOCK',
              checkedColor: 'white',
              icon: 'warehouse',
            },
            {
              value: '2',
              label: 'STOCK DE SERIES',
              checkedColor: 'white',
              icon: 'cube-scan',
            },
          ]}
        />
      </View>

            {/* Todas las pantallas montadas siempre */}
            <View style={styles.screenContainer}>
              {mounted['1'] && (
                <View style={[styles.screen, value !== '1' && styles.hidden]}>
                  <DetalleStockScreen />
                </View>
              )}
              {mounted['2'] && (
                <View style={[styles.screen, value !== '2' && styles.hidden]}>
                  <StockSeriesScreen />
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


export default ReporteStockScreen;
