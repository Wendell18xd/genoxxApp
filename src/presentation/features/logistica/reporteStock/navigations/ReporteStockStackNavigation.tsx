import {createStackNavigator} from '@react-navigation/stack';
import ReporteStockScreen from '../screens/ReporteStockScreen';

export type ReporteStockStackParam = {
  ReporteStockScreen: undefined;
};

const Stack = createStackNavigator<ReporteStockStackParam>();

export const ReporteStockStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ReporteStockScreen">
      <Stack.Screen name="ReporteStockScreen" component={ReporteStockScreen} />
    </Stack.Navigator>
  );
};
