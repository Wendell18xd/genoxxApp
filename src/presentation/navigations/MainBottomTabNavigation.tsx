import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/main/screens/home/HomeScreen';
import {useTheme} from 'react-native-paper';
import MaterialIcons from '../components/ui/icons/MaterialIcons';
import {View} from 'react-native';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ProfileStackNavigation} from '../features/main/screens/profile/navigations/ProfileStackNavigation';
import {NoticiasScreen} from '../features/main/screens/noticias/NoticiasScreen';

export type MainBottomTabParam = {
  HomeScreen: undefined;
  ProfileStackNavigation: undefined;
  NoticiasScreen: undefined;
};

interface TabBarIconProps {
  focused: boolean;
  size: number;
  name: string;
  colors: MD3Colors;
}

const TabBarIcon = ({focused, size, colors, name}: TabBarIconProps) => (
  <View
    style={{
      backgroundColor: focused ? 'white' : 'transparent',
      borderRadius: 25,
      paddingHorizontal: 10,
      width: 45,
    }}>
    <MaterialIcons
      name={name}
      color={focused ? colors.secondary : 'white'}
      size={size}
    />
  </View>
);

const Tab = createBottomTabNavigator<MainBottomTabParam>();

export const MainBottomTabNavigation = () => {
  const {colors} = useTheme();
  const {bottom} = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 65 + bottom,
        },
        tabBarItemStyle: {
          marginTop: 4,
        },
        tabBarLabelStyle: {
          marginTop: 4,
          color: 'white',
        },
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: 'white',
      }}
      initialRouteName="HomeScreen">
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          tabBarIcon: ({focused, size}) =>
            TabBarIcon({focused, size, colors, name: 'home'}),
        }}
      />
      <Tab.Screen
        name="ProfileStackNavigation"
        component={ProfileStackNavigation}
        options={{
          title: 'Perfil',
          tabBarIcon: ({focused, size}) =>
            TabBarIcon({focused, size, colors, name: 'account'}),
        }}
      />
      <Tab.Screen
        name="NoticiasScreen"
        component={NoticiasScreen}
        options={{
          title: 'Noticias',
          tabBarIcon: ({focused, size}) =>
            TabBarIcon({focused, size, colors, name: 'newspaper'}),
        }}
      />
    </Tab.Navigator>
  );
};
