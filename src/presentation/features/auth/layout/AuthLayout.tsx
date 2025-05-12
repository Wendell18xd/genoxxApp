import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CurvaView from '../../../components/ui/CurvaView';
import {useEffect, useState} from 'react';
import MaterialIcons from '../../../components/ui/icons/MaterialIcons';
import {showPromt} from '../../../adapter/prompt.adapter';
import {
  API_URL,
  setApiHost,
  toggleApiHost,
} from '../../../../config/api/genoxxApi';
import {StorageAdapter} from '../../../adapter/storage-adapter';
import {useNavigation} from '@react-navigation/native';

interface Props {
  children?: React.ReactNode;
}

const AuthLayout = ({children}: Props) => {
  const {top} = useSafeAreaInsets();
  const {colors} = useTheme();
  const navigation = useNavigation();

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const screenHeight = Dimensions.get('window').height;
  const calculatedMargin = keyboardVisible ? 0 : -(screenHeight * 0.08);

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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    // Cleanup listeners on unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={{flex: 1, paddingTop: top, backgroundColor: colors.primary}}>
      <View style={styles.box}>
        <View style={styles.boxHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            {navigation.canGoBack() && (
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

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={[
              styles.containerChildren,
              {
                backgroundColor: colors.background,
                marginBottom: calculatedMargin,
              },
            ]}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
});

export default AuthLayout;
