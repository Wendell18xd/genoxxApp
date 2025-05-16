import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View} from 'react-native';
import MaterialIcons from '../../components/ui/icons/MaterialIcons';
import DrawerHeader from '../../components/main/DrawerHeader';

export const DrawIcon = (color: string, name: string) => (
  <MaterialIcons color={color} name={name} />
);

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        marginLeft: 0,
        paddingStart: 0,
        paddingEnd: 0,
        paddingTop: 0,
      }}>
      <DrawerHeader />

      <View style={{paddingHorizontal: 20, marginTop: 15}}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};
