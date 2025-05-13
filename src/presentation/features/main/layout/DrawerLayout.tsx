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
import {Appbar, useTheme} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {useMainStore} from '../../../store/main/useMainStore';
import CurvaBottomView from '../../../components/ui/CurvaBottomView';

interface Props {
  title?: string | undefined;
  primary?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  curbaHeight?: number;
}

const DrawerLayout = ({
  title,
  children,
  style,
  primary = false,
  curbaHeight = 10,
}: Props) => {
  const navigation = useNavigation<NavigationProp<MainStackParam>>();
  const {bottom} = useSafeAreaInsets();
  const {menuSelected} = useMainStore();

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const screenHeight = Dimensions.get('window').height;
  const calculatedMargin = keyboardVisible ? 0 : -(screenHeight * 0.08);
  const {colors} = useTheme();

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
      <Appbar.Header
        style={{
          position: 'relative',
          height: 56,
          backgroundColor: primary ? colors.primary : colors.background,
        }}>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
          color={primary ? 'white' : ''}
        />
        <Appbar.Content
          title={title ? title : menuSelected?.menu_nombre}
          color={primary ? 'white' : ''}
        />
        <Appbar.Action
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          color={primary ? 'white' : ''}
        />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={[
              styles.containerChildren,
              {
                backgroundColor: colors.background,
                marginBottom: calculatedMargin + bottom + 56,
              },
              style,
            ]}>
            {primary && (
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                }}>
                <View
                  style={{backgroundColor: colors.primary, height: curbaHeight}}
                />
                <CurvaBottomView />
              </View>
            )}
            <View style={styles.containerChildren2}>{children}</View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerChildren: {
    flex: 1,
    position: 'relative',
  },
  containerChildren2: {
    flex: 1,
    position: 'relative',
    paddingTop: 32,
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
});

export default DrawerLayout;
