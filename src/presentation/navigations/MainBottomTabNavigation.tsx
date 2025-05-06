import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/main/screens/HomeScreen';
import ProfileScreen from '../features/main/screens/ProfileScreen';
import {useTheme} from 'react-native-paper';
import MaterialIcons from '../components/ui/icons/MaterialIcons';

export type MainBottomTabParam = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
};

const Tab = createBottomTabNavigator<MainBottomTabParam>();

export const MainBottomTabNavigation = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 65,
        },
        tabBarItemStyle: {
          marginTop: 4,
        },
        tabBarLabelStyle: {
          marginTop: 4,
        },
        tabBarActiveTintColor: colors.onPrimary,
        tabBarInactiveTintColor: colors.secondary,
      }}
      initialRouteName="HomeScreen">
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          tabBarIcon: props =>
            MaterialIcons({name: 'home', color: props.color, size: props.size}),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: props =>
            MaterialIcons({
              name: 'account',
              color: props.color,
              size: props.size,
            }),
        }}
      />
    </Tab.Navigator>
  );
};
