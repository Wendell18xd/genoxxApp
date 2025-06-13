import React from 'react';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DetalleStockNavigation from '../navigations/DetalleStockNavigation';
import StockSeriesNavigation from '../navigations/StockSeriesNavigation';

const Tab = createMaterialTopTabNavigator();

export const ReporteStockScreen = () => {
  return (
    <DrawerLayout>
      <Tab.Navigator>
        <Tab.Screen
          name="DETALLE DE STOCK"
          component={DetalleStockNavigation}
        />
        <Tab.Screen name="STOCK DE SERIES" component={StockSeriesNavigation} />
      </Tab.Navigator>
    </DrawerLayout>
  );
};

export default ReporteStockScreen;
