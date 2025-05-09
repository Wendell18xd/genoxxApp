import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useWindowDimensions, View} from 'react-native';
import MaterialIcons from '../components/ui/icons/MaterialIcons';
import {useTheme} from 'react-native-paper';
import LiquidarMaterialesObras from '../features/gestionObras/liquidarMateriales/screen/LiquidarMaterialesObras';
import LiquidarPartidasObras from '../features/gestionObras/liquidarPartidas/screen/LiquidarPartidasObras';

const Drawer = createDrawerNavigator();

const DrawerContent = (props: DrawerContentComponentProps) => {
  return <CustomDrawerContent {...props} />;
};

const DrawIcon = (color: string, name: string) => (
  <MaterialIcons color={color} name={name} />
);

export const SideMenuNavigator = () => {
  const dimensions = useWindowDimensions();
  const {colors} = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
        drawerType: dimensions.width >= 768 ? 'permanent' : 'slide',
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: colors.primary,
        drawerItemStyle: {borderRadius: 100, paddingHorizontal: 20},
      }}>
      {/* <Drawer.Screen name="StackNavigator" component={StackNavigator} /> */}
      <Drawer.Screen
        name="Tabs"
        component={LiquidarMaterialesObras}
        options={{
          drawerIcon: ({color}) => DrawIcon(color, 'house'),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={LiquidarPartidasObras}
        options={{
          drawerIcon: ({color}) => DrawIcon(color, 'user'),
        }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {colors} = useTheme();

  return (
    <DrawerContentScrollView>
      <View
        style={{
          height: 200,
          backgroundColor: colors.primary,
          margin: 30,
          borderRadius: 50,
        }}
      />

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
