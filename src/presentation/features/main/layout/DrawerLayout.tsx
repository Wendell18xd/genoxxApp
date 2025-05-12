import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainStackParam} from '../../../navigations/MainStackNavigation';
import {Appbar} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {useMainStore} from '../../../store/main/useMainStore';

interface Props {
  title?: string | undefined;
  children: React.ReactNode;
}

const DrawerLayout = ({title, children}: Props) => {
  const navigation = useNavigation<NavigationProp<MainStackParam>>();
  const {top} = useSafeAreaInsets();
  const {menuSelected} = useMainStore();

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const screenHeight = Dimensions.get('window').height;
  const calculatedMargin = keyboardVisible ? 0 : -(screenHeight * 0.08);

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
    <View style={{flex: 1, marginTop: top}}>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
        />
        <Appbar.Content title={title ? title : menuSelected?.menu_nombre} />
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              padding: 16,
              backgroundColor: '#f2f2f2',
              marginBottom: calculatedMargin,
            }}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
export default DrawerLayout;
