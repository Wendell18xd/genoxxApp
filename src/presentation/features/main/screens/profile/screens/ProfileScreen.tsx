import React from 'react';
import {StyleSheet, View} from 'react-native';
import {List, Text, useTheme, Divider} from 'react-native-paper';
import SafeAreaLayout from '../../../layout/SafeAreaLayout';
import {UserImage} from '../../../../../components/main/UserImage';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import {RenderListItemIcon} from '../../../../../components/ui/icons/RenderListItemIcon';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {ProfileStackParam} from '../navigations/ProfileStackNavigation';

const ProfileScreen = () => {
  const {colors} = useTheme();
  const {user} = useAuthStore();
  const navigation = useNavigation<NavigationProp<ProfileStackParam>>();

  return (
    <SafeAreaLayout primary isCurva curvaHeight={70} style={{flex: 1}}>
      <View style={styles.container}>
        {/* Encabezado con imagen y nombre */}
        <View style={styles.profileHeader}>
          <UserImage style={{height: 90, width: 90}} />
          <Text style={styles.name}>{user?.usua_nombre}</Text>
          <Text style={styles.email}>{user?.usua_codigo}</Text>
          <Text style={styles.email}>
            {user?.empr_codigo} - {user?.empr_nombre}
          </Text>
        </View>

        {/* Opciones */}
        <View style={styles.optionList}>
          <List.Section>
            <List.Item
              title="Cambiar contraseña"
              left={RenderListItemIcon('lock', colors.primary)}
              onPress={() => navigation.navigate('CambiarClaveScreen')}
            />
            <Divider />
            <List.Item
              title="Alertas"
              left={RenderListItemIcon('account-voice', colors.primary)}
              onPress={() => navigation.navigate('AlertasScreen')}
            />
            <Divider />
            <List.Item
              title="Cerrar sesión"
              left={RenderListItemIcon('logout', colors.primary)}
              onPress={() => navigation.dispatch(StackActions.pop(1))}
            />
          </List.Section>
        </View>
      </View>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  optionList: {
    marginTop: 16,
  },
});

export default ProfileScreen;
