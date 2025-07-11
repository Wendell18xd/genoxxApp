import {useTheme} from 'react-native-paper';
import {
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from '../../../components/ui/icons/MaterialIcons';
import NoSeriadosScreen from '../liquidarMateriales/screens/NoSeriadosScreen';
import RecuperosScreen from '../liquidarMateriales/screens/RecuperosScreen';
import DetalleLiquidarMatScreen from '../liquidarMateriales/screens/DetalleLiquidarMatScreen';
import SeriadosScreen from '../liquidarMateriales/screens/seriados/SeriadosScreen';

export type DetalleBottomTabParam = {
  DetalleLiquidarMatScreen: undefined;
  SeriadosScreen: undefined;
  FinalizarOrden: undefined;
  NoSeriadosScreen: undefined;
  RecuperosScreen: undefined;
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

const Tab = createBottomTabNavigator<DetalleBottomTabParam>();

const FinalizarOrdenTabBarButton = (props: any) => {
  // Flatten the style prop to avoid passing an array
  const style =
    Array.isArray(props.style)
      ? Object.assign({}, ...props.style)
      : props.style;

  return (
    <TouchableOpacity
      {...props}
      onPress={() =>
        Alert.alert('Acción', 'Se ejecutó una acción personalizada')
      }
      style={[style, {alignItems: 'center'}]}
    />
  );
};

export const LiquiMatBottomNavigator = () => {
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
      initialRouteName="DetalleLiquidarMatScreen">
      <Tab.Screen
        name="DetalleLiquidarMatScreen"
        component={DetalleLiquidarMatScreen}
        options={{
          title: 'Detalle',
          tabBarIcon: ({focused, size}) =>
            TabBarIcon({focused, size, colors, name: 'semantic-web'}),
        }}
      />
      <Tab.Screen
        name="SeriadosScreen"
        component={SeriadosScreen}
        options={{
          title: 'Seriados',
          tabBarIcon: ({focused, size}) =>
            TabBarIcon({focused, size, colors, name: 'plus'}),
        }}
      />
      <Tab.Screen
        name="NoSeriadosScreen"
        component={NoSeriadosScreen}
        options={{
          title: 'No Seriados',
          tabBarIcon: ({focused, size}) =>
            TabBarIcon({focused, size, colors, name: 'plus'}),
        }}
      />
      <Tab.Screen
        name="RecuperosScreen"
        component={RecuperosScreen}
        options={{
          title: 'Recuperos',
          tabBarIcon: ({focused, size}) =>
            TabBarIcon({focused, size, colors, name: 'plus'}),
        }}
      />
      <Tab.Screen
        name="FinalizarOrden"
        options={{
          tabBarLabel: 'Acción',
          tabBarIcon: ({focused, size}) =>
            TabBarIcon({focused, size, colors, name: 'close-circle'}),
          tabBarButton: FinalizarOrdenTabBarButton,
        }}>
        {() => null}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
