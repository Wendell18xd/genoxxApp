import {View, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {UserImage} from './UserImage';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const DrawerHeader = () => {
  const {user} = useAuthStore();
  const {colors} = useTheme();
  const {top} = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.primary, paddingTop: top + 20},
      ]}>
      <UserImage style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text variant="titleMedium" style={[styles.name, {color: 'white'}]}>
          {user?.usua_nombre}
        </Text>
        <Text variant="labelLarge" style={[styles.subText, {color: 'white'}]}>
          {user?.usua_codigo}
        </Text>
        <Text variant="labelLarge" style={[styles.subText, {color: 'white'}]}>
          {user?.empr_nombre}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subText: {
    color: '#555',
  },
});

export default DrawerHeader;
