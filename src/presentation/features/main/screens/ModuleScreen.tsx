import DrawerLayout from '../layout/DrawerLayout';
import {useMainStore} from '../../../store/main/useMainStore';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MenuItem from './home/components/MenuItem';
import SinResultados from '../../../components/ui/SinResultados';

export const ModuleScreen = () => {
  const navigation = useNavigation();
  const {moduloSelected, menusValid} = useMainStore();

  return (
    <DrawerLayout
      title={moduloSelected?.menu_nombre}
      style={{paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0}}
      primary>
      {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <PrimaryButton
          style={{paddingHorizontal: 20}}
          onPress={() => {
            navigation.goBack();
          }}>
          Ir al Inicio
        </PrimaryButton>
      </View> */}
      {menusValid && menusValid.length > 0 ? (
        <FlatList
          style={{padding: 16}}
          data={menusValid}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          keyExtractor={item => item.menu_codigo}
          columnWrapperStyle={{gap: 16}}
          contentContainerStyle={{gap: 16, paddingBottom: 40}}
          renderItem={({item}) => (
            <MenuItem
              menu={item}
              onPress={() => {
                navigation.navigate(item.menu_fileapp as never);
              }}
            />
          )}
        />
      ) : (
        <SinResultados />
      )}
    </DrawerLayout>
  );
};
