import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {useWindowDimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackParam} from '../MainStackNavigation';
import NoMenuAvailableScreen from '../../features/main/screens/NoMenuAvailableScreen';
import {drawerScreenComponents} from '../../../types/drawerScreenComponents';
import {useMainStore} from '../../store/main/useMainStore';
import {CustomDrawerContent, DrawIcon} from './CustomDrawerContent';
import {ModuleScreen} from '../../features/main/screens/ModuleScreen';
import {useEffect} from 'react';

const Drawer = createDrawerNavigator();

const DrawerContent = (props: DrawerContentComponentProps) => {
  return <CustomDrawerContent {...props} />;
};

export const SideMenuNavigator = () => {
  const {menu: menuSelected} =
    useRoute<RouteProp<MainStackParam, 'SideMenuNavigator'>>().params;
  const dimensions = useWindowDimensions();
  const {colors} = useTheme();
  const {menu} = useAuthStore();
  const {setMenuSelected, setMenusValid} = useMainStore();

  // Filtrar y recorrer todos los menús y submenús
  const getValidMenuItems = (menuItems: any[]) => {
    return menuItems.reduce((acc: any[], item) => {
      // Si el item tiene pantalla asociada, agregarlo al array
      if (drawerScreenComponents[item.menu_fileapp]) {
        acc.push(item);
      }

      // Si tiene hijos, procesarlos recursivamente
      if (item.menu_hijo && item.menu_hijo.length > 0) {
        acc = [...acc, ...getValidMenuItems(item.menu_hijo)]; // Llamada recursiva
      }

      return acc;
    }, []);
  };

  const menuFiltered = menu?.find(
    f => f.menu_codigo === menuSelected.menu_codigo,
  );

  const validMenuItems = getValidMenuItems(menuFiltered?.menu_hijo || []);

  useEffect(() => {
    setMenusValid(validMenuItems);
  }, []);

  if (validMenuItems.length === 0) {
    return <NoMenuAvailableScreen />;
  }

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.background,
          // width: screenWidth * 0.8,
        },
        drawerType: dimensions.width >= 768 ? 'permanent' : 'slide',
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: colors.primary,
      }}>
      <Drawer.Screen
        name="ModuleScreen"
        component={ModuleScreen}
        options={{
          drawerIcon: ({color}) => DrawIcon(color, 'view-module'),
        }}
      />

      {menuFiltered?.menu_hijo.flatMap((item, index) => {
        const subItems = item.menu_hijo || [];
        const allItems = [item, ...subItems];

        return allItems
          .filter(menuItem => drawerScreenComponents[menuItem.menu_fileapp])
          .map((menuItem, subIndex) => {
            const ScreenComponent =
              drawerScreenComponents[menuItem.menu_fileapp];
            return (
              <Drawer.Screen
                key={`${index}-${subIndex}`}
                name={menuItem.menu_fileapp}
                component={ScreenComponent}
                options={{
                  drawerIcon: ({color}) =>
                    DrawIcon(color, menuItem.menu_icoapp),
                }}
                listeners={{
                  focus: () => {
                    setMenuSelected(menuItem);
                  },
                }}
              />
            );
          });
      })}
    </Drawer.Navigator>
  );
};
