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
import {hexToRgba} from '../../helper/utils';

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
  const {setMenuSelected, setMenusValid, setDrawerKey} = useMainStore();

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
        },
        drawerType: dimensions.width >= 768 ? 'permanent' : 'slide',
        // drawerItemStyle: {marginTop: -5},
        drawerInactiveTintColor: colors.onSurface,
        drawerActiveBackgroundColor: hexToRgba(colors.primary, 0.2),
        drawerActiveTintColor: colors.primary,
        drawerItemStyle: {
          borderColor: hexToRgba(colors.primary, 0.2),
          borderWidth: 1,
          marginTop: 8,
        },
      }}>
      <Drawer.Screen
        name="ModuleScreen"
        component={ModuleScreen}
        initialParams={{menus: validMenuItems}}
        options={{
          drawerIcon: ({color}) => DrawIcon(color, 'view-module'),
          drawerLabel: menuSelected?.menu_nombre,
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
                key={`${index}-${subIndex}-${Date.now()}`}
                name={menuItem.menu_fileapp}
                component={ScreenComponent}
                options={{
                  drawerIcon: ({color}) =>
                    DrawIcon(color, menuItem.menu_icoapp),
                  drawerLabel: menuItem.menu_nombre,
                }}
                listeners={{
                  focus: () => {
                    setMenuSelected(menuItem);
                    setDrawerKey(menuItem.menu_fileapp);
                  },
                }}
              />
            );
          });
      })}
    </Drawer.Navigator>
  );
};
