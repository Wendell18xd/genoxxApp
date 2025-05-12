import {createStackNavigator} from '@react-navigation/stack';
import {SideMenuNavigator} from './sidebar/SideMenuNavigator';
import {MainBottomTabNavigation} from './MainBottomTabNavigation';
import {Menu} from '../../domain/entities/User';

export type MainStackParam = {
  MainBottomTabNavigation: undefined;
  SideMenuNavigator: {menu: Menu};
};

const Stack = createStackNavigator<MainStackParam>();

export const MainStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName="MainBottomTabNavigation">
      <Stack.Screen
        name="MainBottomTabNavigation"
        component={MainBottomTabNavigation}
      />
      <Stack.Screen name="SideMenuNavigator" component={SideMenuNavigator} />
    </Stack.Navigator>
  );
};
