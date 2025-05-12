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
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainStackParam} from '../../../navigations/MainStackNavigation';
import {Appbar} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {useMainStore} from '../../../store/main/useMainStore';

interface Props {
  title?: string | undefined;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const DrawerLayout = ({title, children, style}: Props) => {
  const navigation = useNavigation<NavigationProp<MainStackParam>>();
  const {bottom} = useSafeAreaInsets();
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
    <View style={{flex: 1}}>
      <Appbar.Header style={{position: 'relative', height: 56}}>
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
            style={[
              styles.containerChildren,
              {
                backgroundColor: '#f2f2f2',
                marginBottom: calculatedMargin + bottom + 56,
              },
              style,
            ]}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerChildren: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
});

export default DrawerLayout;
