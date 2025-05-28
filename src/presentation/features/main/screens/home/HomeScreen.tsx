import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';
import SafeAreaLayout from '../../layout/SafeAreaLayout';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import {useEffect} from 'react';
import MenuItem from './components/MenuItem';
import CurvaBottomView from '../../../../components/ui/CurvaBottomView';
import {Menu} from '../../../../../domain/entities/User';
import SinResultados from '../../../../components/ui/SinResultados';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {UserImage} from '../../../../components/main/UserImage';
import {MainStackParam} from '../../../../navigations/MainStackNavigation';
import {useMainStore} from '../../../../store/main/useMainStore';
import {useFilterMenu} from '../../hooks/useFilterMenu';

const HomeScreen = () => {
  const {user, menu} = useAuthStore();
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationProp<MainStackParam>>();
  const {setModuloSelected} = useMainStore();
  const {buscar, handlerSearch, filterMenu} = useFilterMenu({menus: menu});

  const handleMenuPress = (menuItem: Menu) => {
    setModuloSelected(menuItem);
    navigation.navigate('SideMenuNavigator', {menu: menuItem});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault(); //detenemos la navegación

      Alert.alert('Cerrar Sesión', '¿Deseas cerrar sesión?', [
        {text: 'Cancelar', style: 'cancel', onPress: () => {}},
        {
          text: 'Sí, Cerrar',
          onPress: () => navigation.dispatch(e.data.action), //continúa la navegación
        },
      ]);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaLayout style={{backgroundColor: colors.primary}}>
      <View style={styles.header}>
        {/* Imagen de usuario */}
        <UserImage />

        {/* Contenido derecho */}
        <View style={styles.infoUser}>
          <Text
            variant="bodyMedium"
            style={{
              color: 'white',
              flexShrink: 1,
            }}>
            Hola, {user?.usua_nombre}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="exit-to-app" color="#f54949" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{color: 'white', marginTop: 32, marginHorizontal: 32}}
        variant="headlineMedium">
        ¿Que estás buscando?
      </Text>
      <View style={{marginTop: 16, marginHorizontal: 32}}>
        <CustomTextInput
          isWhite
          placeholder="Buscar modulo"
          mode="outlined"
          autoCapitalize="characters"
          value={buscar}
          onChangeText={value => handlerSearch(value)}
          left={<TextInput.Icon icon="magnify" />}
        />
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          position: 'relative',
          marginTop: 16,
        }}>
        <View style={{position: 'absolute', width: '100%'}}>
          <CurvaBottomView />
        </View>
        {filterMenu && filterMenu.length > 0 ? (
          <FlatList
            style={{padding: 16}}
            data={filterMenu}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            keyExtractor={item => item.menu_codigo}
            columnWrapperStyle={{gap: 16}}
            contentContainerStyle={{gap: 16, paddingBottom: 40}}
            renderItem={({item}) => (
              <MenuItem menu={item} onPress={() => handleMenuPress(item)} />
            )}
          />
        ) : (
          <SinResultados />
        )}
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginHorizontal: 32,
  },
  infoUser: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
