import {FlatList, TouchableOpacity, View} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';
import {FadeInImage} from '../../../../components/ui/FadeInImage';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import {API_URL} from '../../../../../config/api/genoxxApi';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';
import SafeAreaLayout from '../../layout/SafeAreaLayout';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import {useState} from 'react';
import MenuItem from './components/MenuItem';
import CurvaBottomView from '../../../../components/ui/CurvaBottomView';

const fallbackImage = require('../../../../../assets/images/avatar3.jpg');

const HomeScreen = () => {
  const {user, menu} = useAuthStore();
  const {colors} = useTheme();
  const [buscar, setBuscar] = useState<string>('');

  return (
    <SafeAreaLayout style={{backgroundColor: colors.primary}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15,
          marginTop: 32,
          marginHorizontal: 32,
        }}>
        <FadeInImage
          uri={`${API_URL}/public/dist/PERSONAL/${user?.trab_documento}.jpg?1`}
          style={{height: 70, width: 70, borderRadius: 100}}
          defaultImage={fallbackImage}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text variant="bodyMedium" style={{color: 'white'}}>
            Hola, {user?.usua_nombre}
          </Text>
          <TouchableOpacity>
            <MaterialIcons name="bell" color="white" />
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
          placeholder="Buscar"
          mode="outlined"
          autoCapitalize="characters"
          value={buscar}
          onChangeText={value => setBuscar(value)}
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
        {menu && menu.length > 0 && (
          <FlatList
            style={{padding: 16}}
            data={menu}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            keyExtractor={item => item.menu_codigo}
            columnWrapperStyle={{gap: 16}}
            contentContainerStyle={{gap: 16, paddingBottom: 40}}
            renderItem={({item}) => <MenuItem menu={item} />}
          />
        )}
      </View>
    </SafeAreaLayout>
  );
};
export default HomeScreen;
