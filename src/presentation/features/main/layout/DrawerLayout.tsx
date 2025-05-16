import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {
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
import {useMainStore} from '../../../store/main/useMainStore';
import CurvaBottomView from '../../../components/ui/CurvaBottomView';
import {useKeyBoardVisible} from '../../../hooks/useKeyBoardVisible';

interface Props {
  title?: string | undefined;
  primary?: boolean;
  isCurva?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  curvaHeight?: number;
}

const DrawerLayout = ({
  title,
  children,
  style,
  primary = true,
  isCurva = false,
  curvaHeight = 10,
}: Props) => {
  const navigation = useNavigation<NavigationProp<MainStackParam>>();
  const {bottom, top} = useSafeAreaInsets();
  const {menuSelected} = useMainStore();
  const {colors} = useTheme();
  const {keyboardVisible} = useKeyBoardVisible();

  return (
    <View style={{flex: 1}}>
      <Appbar.Header
        style={{
          position: 'relative',
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
        style={{flex: 1}}
        keyboardVerticalOffset={keyboardVisible ? 0 : -(top + bottom)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={[
              styles.containerChildren,
              {
                backgroundColor: colors.background,
                paddingBottom: bottom,
              },
              style,
            ]}>
            {primary && isCurva && (
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                }}>
                <View
                  style={{backgroundColor: colors.primary, height: curvaHeight}}
                />
                <CurvaBottomView />
              </View>
            )}
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
    position: 'relative',
  },
});

export default DrawerLayout;
