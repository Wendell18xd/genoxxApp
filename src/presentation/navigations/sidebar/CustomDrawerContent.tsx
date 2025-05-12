import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {List, Text, useTheme} from 'react-native-paper';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {
  RouteProp,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import {MainStackParam} from '../MainStackNavigation';
import {StyleSheet, View} from 'react-native';
import {drawerScreenComponents} from '../../../types/drawerScreenComponents';
import MaterialIcons from '../../components/ui/icons/MaterialIcons';

export const DrawIcon = (color: string, name: string) => (
  <MaterialIcons color={color} name={name} />
);

const ListIcon = (props: any, icon: string) => (
  <List.Icon {...props} icon={icon} />
);

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {colors} = useTheme();
  const {menu} = useAuthStore();
  const {menu: menuSelected} =
    useRoute<RouteProp<MainStackParam, 'SideMenuNavigator'>>().params;

  // Obtener la pantalla activa dentro del drawer
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

  const menuFiltered = menu?.find(
    f => f.menu_codigo === menuSelected.menu_codigo,
  );

  return (
    <DrawerContentScrollView {...props}>
      {/* Header personalizado */}
      <View
        style={{
          height: 150,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Text variant="titleLarge" style={{color: 'white'}}>
          Menú Principal
        </Text>
      </View>

      <DrawerItem
        label={menuSelected.menu_nombre}
        icon={({color}) => DrawIcon(color, 'view-module')}
        focused={currentRouteName === 'ModuleScreen'}
        onPress={() => {
          props.navigation.navigate('ModuleScreen');
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
              left={prop => ListIcon(prop, item.menu_icoapp)}
              style={styles.accordion}
              theme={{colors: {background: 'transparent'}}}>
              {item.menu_hijo
                .filter(subItem => drawerScreenComponents[subItem.menu_fileapp])
                .map((subItem, subIndex) => (
                  <DrawerItem
                    key={`sub-${index}-${subIndex}`}
                    label={subItem.menu_nombre}
                    icon={({color}) => DrawIcon(color, subItem.menu_icoapp)}
                    focused={currentRouteName === subItem.menu_nombre}
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
              labelStyle={{fontSize: 14}}
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

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: 'transparent',
    marginVertical: 5,
    borderRadius: 8,
  },
});
