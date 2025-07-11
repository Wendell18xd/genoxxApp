import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CurvaView from '../../../components/ui/CurvaView';
import MaterialIcons from '../../../components/ui/icons/MaterialIcons';
import {showPromt} from '../../../adapter/prompt.adapter';
import {
  API_URL,
  setApiHost,
  toggleApiHost,
} from '../../../../config/api/genoxxApi';
import {StorageAdapter} from '../../../adapter/storage-adapter';
import {useNavigation} from '@react-navigation/native';
import {useCanGoBackSafely} from '../../../hooks/useCanGoBackSafely';

interface Props {
  children?: React.ReactNode;
}

const AuthLayout = ({children}: Props) => {
  const {top, bottom} = useSafeAreaInsets();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const canGoBack = useCanGoBackSafely();

  const handlerConfig = async () => {
    const host = await StorageAdapter.getItem('host');

    showPromt({
      title: 'Host',
      message: 'Editar host',
      callbackOrButtons: [
        {
          text: 'Cambiar',
          onPress: async () => {
            await toggleApiHost();
          },
        },
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'destructive',
        },
        {
          text: 'Aceptar',
          onPress: async input => {
            await setApiHost(input);
          },
        },
      ],
      options: {
        type: 'plain-text',
        cancelable: false,
        defaultValue: host || API_URL,
        placeholder: 'Host Name',
      },
    });
  };

  return (
    <View style={{flex: 1, paddingTop: top, backgroundColor: colors.primary}}>
      <View style={styles.box}>
        <View style={styles.boxHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            {canGoBack && (
              <TouchableOpacity onPress={navigation.goBack}>
                <MaterialIcons name="arrow-left" color="white" />
              </TouchableOpacity>
            )}
            <Text variant="labelSmall" style={{color: 'white'}}>
              1.0.0
            </Text>
          </View>
          <TouchableOpacity onPress={handlerConfig}>
            <MaterialIcons name="cog" color="white" />
          </TouchableOpacity>
        </View>

        <Image
          source={require('../../../../assets/images/logo_app.png')}
          style={styles.boxImage}
        />
      </View>

      <View style={{width: '100%'}}>
        <CurvaView />
      </View>
      <View style={{flex: 1, backgroundColor: colors.background}}>
        <View
          style={[
            styles.containerChildren,
            {
              backgroundColor: colors.background,
              paddingBottom: bottom + 8,
            },
          ]}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 32,
    position: 'relative',
    height: 250,
  },
  boxHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxImage: {
    width: 120,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'stretch',
    top: 28,
    position: 'absolute',
  },
  containerChildren: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 32,
  },
});

export default AuthLayout;
