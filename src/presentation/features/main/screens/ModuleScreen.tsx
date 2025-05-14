import DrawerLayout from '../layout/DrawerLayout';
import {useMainStore} from '../../../store/main/useMainStore';
import {FlatList, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import MenuItem from './home/components/MenuItem';
import SinResultados from '../../../components/ui/SinResultados';
import CustomTextInput from '../../../components/ui/CustomTextInput';
import {TextInput} from 'react-native-paper';
import {useFilterMenu} from '../hooks/useFilterMenu';
import {Menu} from '../../../../domain/entities/User';

export const ModuleScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {menus} = route.params as {menus: Menu[]};

  const {moduloSelected} = useMainStore();
  const {buscar, handlerSearch, filterMenu} = useFilterMenu({
    menus,
  });

  return (
    <DrawerLayout
      title={moduloSelected?.menu_nombre}
      primary
      curvaHeight={100}>
      <View style={{marginTop: 16, marginHorizontal: 32}}>
        <CustomTextInput
          placeholder="Buscar"
          mode="outlined"
          autoCapitalize="characters"
          value={buscar}
          onChangeText={value => handlerSearch(value)}
          left={<TextInput.Icon icon="magnify" />}
        />
      </View>
      {filterMenu && filterMenu.length > 0 ? (
        <FlatList
          style={{padding: 16, marginTop: 16}}
          data={filterMenu}
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
