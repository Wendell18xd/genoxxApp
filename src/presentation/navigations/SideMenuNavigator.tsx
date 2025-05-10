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
import {useAuthStore} from '../store/auth/useAuthStore';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackParam} from './MainStackNavigation';
import NoMenuAvailableScreen from '../features/main/screens/NoMenuAvailableScreen';

const Drawer = createDrawerNavigator();

const DrawerContent = (props: DrawerContentComponentProps) => {
  return <CustomDrawerContent {...props} />;
};

const DrawIcon = (color: string, name: string) => (
  <MaterialIcons color={color} name={name} />
);

const screenComponents: Record<string, React.ComponentType<any>> = {
  LiquidacionMaterialesFragment: LiquidarMaterialesObras,
  ListObrasFragment1: LiquidarPartidasObras,
};

export const SideMenuNavigator = () => {
  const {menu: menuSelected} =
    useRoute<RouteProp<MainStackParam, 'SideMenuNavigator'>>().params;
  const dimensions = useWindowDimensions();
  const {colors} = useTheme();
  const {menu} = useAuthStore();

  const menuFiltered = menu?.find(
    f => f.menu_codigo === menuSelected.menu_codigo,
  );

  const mapeo = menuFiltered?.menu_hijo.filter(
    menuItem => screenComponents[menuItem.menu_fileapp],
  );

  console.log(menuFiltered);

  if (mapeo?.length === 0) {
    return <NoMenuAvailableScreen />;
  }

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
      {menuFiltered?.menu_hijo
        .filter(menuItem => screenComponents[menuItem.menu_fileapp])
        .map((menuItem, index) => {
          const ScreenComponent = screenComponents[menuItem.menu_fileapp];
          return (
            <Drawer.Screen
              key={index}
              name={menuItem.menu_nombre}
              component={ScreenComponent}
              options={{
                drawerIcon: ({color}) => DrawIcon(color, menuItem.menu_icoapp),
              }}
            />
          );
        })}
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
