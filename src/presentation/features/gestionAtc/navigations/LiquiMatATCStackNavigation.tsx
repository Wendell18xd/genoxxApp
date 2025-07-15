import {createStackNavigator} from '@react-navigation/stack';
import {LiquidarMaterialesPartidasScreen} from '../LiquidarMaterialesPartidasScreen';
import {DetalleConsultaEjecucionScreen} from '../liquidarMateriales/screenDetalleMatATC/DetalleMatATCScreen';
import {SegmentedButtonsLiquiMatATC} from './SegmentedButtonsLiquiMatATC';
import {OrdenATC} from '../../../../domain/entities/OrdenATC';

export type LiquiMatATCStackParam = {
  LiquidarMaterialesPartidasScreen: undefined;
  DetalleConsultaEjecucionScreen: undefined;
  SegmentedButtonsLiquiMatATC: {SegmentedButtonsLiquiMatATC: OrdenATC};
};

const Stack = createStackNavigator<LiquiMatATCStackParam>();

export const LiquiMatATCStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName="LiquidarMaterialesPartidasScreen">
      <Stack.Screen
        name="LiquidarMaterialesPartidasScreen"
        component={LiquidarMaterialesPartidasScreen}
      />
      <Stack.Screen
        name="DetalleConsultaEjecucionScreen"
        component={DetalleConsultaEjecucionScreen}
      />
      <Stack.Screen
        name="SegmentedButtonsLiquiMatATC"
        component={SegmentedButtonsLiquiMatATC}
      />
    </Stack.Navigator>
  );
};
