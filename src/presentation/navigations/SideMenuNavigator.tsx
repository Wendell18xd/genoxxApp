import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {useWindowDimensions, View} from 'react-native';
import MaterialIcons from '../components/ui/icons/MaterialIcons';
import {List, useTheme} from 'react-native-paper';
import {useAuthStore} from '../store/auth/useAuthStore';
import {
  RouteProp,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import {MainStackParam} from './MainStackNavigation';
import NoMenuAvailableScreen from '../features/main/screens/NoMenuAvailableScreen';
import {drawerScreenComponents} from '../../types/drawerScreenComponents';
import {useMainStore} from '../store/main/useMainStore';

const Drawer = createDrawerNavigator();

const DrawerContent = (props: DrawerContentComponentProps) => {
  return <CustomDrawerContent {...props} />;
};

const DrawIcon = (color: string, name: string) => (
  <MaterialIcons color={color} name={name} />
);

export const SideMenuNavigator = () => {
  const {menu: menuSelected} =
    useRoute<RouteProp<MainStackParam, 'SideMenuNavigator'>>().params;
  const dimensions = useWindowDimensions();
  const {colors} = useTheme();
  const {menu} = useAuthStore();
  const {setMenuSelected} = useMainStore();

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

  console.log(validMenuItems);

  if (validMenuItems.length === 0) {
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
                name={menuItem.menu_nombre}
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

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {colors} = useTheme();
  const {menu} = useAuthStore();
  const {menu: menuSelected} =
    useRoute<RouteProp<MainStackParam, 'SideMenuNavigator'>>().params;

  const currentRouteName = useNavigationState(state => {
    const drawerState = state.routes.find(r => r.name === 'SideMenuNavigator');
    if (
      drawerState &&
      'state' in drawerState &&
      drawerState.state &&
      drawerState.state.index !== undefined
    ) {
      const activeDrawerRoute =
        drawerState.state.routes[drawerState.state.index];
      return activeDrawerRoute.name;
    }
    return null;
  });

  console.log(currentRouteName);

  const menuFiltered = menu?.find(
    f => f.menu_codigo === menuSelected.menu_codigo,
  );

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          height: 200,
          backgroundColor: colors.primary,
          margin: 30,
          borderRadius: 50,
        }}
      />

      {menuFiltered?.menu_hijo.map((item, index) => {
        const hasChildren = item.menu_hijo && item.menu_hijo.length > 0;
        const isValidParent = drawerScreenComponents[item.menu_fileapp];

        if (hasChildren) {
          return (
            <List.Accordion
              key={`parent-${index}`}
              title={item.menu_nombre}
              left={prop => DrawIcon(prop.color, item.menu_icoapp)}
              titleStyle={{fontWeight: 'bold'}}
              style={{paddingLeft: 10}}>
              {item.menu_hijo
                .filter(child => drawerScreenComponents[child.menu_fileapp])
                .map((subItem, subIndex) => (
                  <DrawerItem
                    key={`sub-${index}-${subIndex}`}
                    label={subItem.menu_nombre}
                    icon={({color}) => DrawIcon(color, subItem.menu_icoapp)}
                    focused={currentRouteName === subItem.menu_nombre}
                    labelStyle={{marginLeft: 20}}
                    onPress={() => {
                      props.navigation.navigate(subItem.menu_nombre);
                    }}
                  />
                ))}
            </List.Accordion>
          );
        }

        if (isValidParent) {
          return (
            <DrawerItem
              key={`single-${index}`}
              label={item.menu_nombre}
              icon={({color}) => DrawIcon(color, item.menu_icoapp)}
              focused={currentRouteName === item.menu_nombre}
              onPress={() => {
                props.navigation.navigate(item.menu_nombre);
              }}
            />
          );
        }

        return null;
      })}
    </DrawerContentScrollView>
  );
};
