import React from 'react';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DetalleStockScreen from './screenDetalleStock/DetalleStockScreen';
import StockSeriesScreen from './screenStockSeries/StockSeriesScreen';

const Tab = createMaterialTopTabNavigator();

export const ReporteStockScreen = () => {
  return (
    <DrawerLayout>
      <Tab.Navigator>
        <Tab.Screen
          name="DETALLE DE STOCK"
          component={DetalleStockScreen}
        />
        <Tab.Screen name="STOCK DE SERIES" component={StockSeriesScreen} />
      </Tab.Navigator>
    </DrawerLayout>
  );
};

export default ReporteStockScreen;
