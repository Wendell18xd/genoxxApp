import {KeyboardAvoidingView, Platform, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CurvaBottomView from '../../../components/ui/CurvaBottomView';
import {Appbar, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useKeyBoardVisible} from '../../../hooks/useKeyBoardVisible';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  primary?: boolean;
  isCurva?: boolean;
  curvaHeight?: number;
  isHeader?: boolean;
  title?: string;
  isBack?: boolean;
}

const SafeAreaLayout = ({
  children,
  style,
  title = '',
  primary = false,
  isCurva = false,
  isHeader = false,
  isBack = true,
  curvaHeight = 0,
}: Props) => {
  const {top, bottom} = useSafeAreaInsets();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {keyboardVisible} = useKeyBoardVisible();

  return (
    <View
      style={[
        {
          flex: 1,
        },
        style,
      ]}>
      {isHeader && (
        <Appbar.Header
          style={{
            position: 'relative',
            backgroundColor: primary ? colors.primary : colors.background,
          }}>
          {navigation.canGoBack() && isBack && (
            <Appbar.Action
              icon="arrow-left"
              onPress={() => navigation.goBack()}
              color={primary ? 'white' : ''}
            />
          )}
          <Appbar.Content title={title} color={primary ? 'white' : ''} />
        </Appbar.Header>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={keyboardVisible ? 0 : -(top + bottom)}>
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <View
          style={{
            flex: 1,
            position: 'relative',
            paddingTop: isHeader ? 0 : top,
            backgroundColor: colors.background,
          }}>
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
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    </View>
  );
};
export default SafeAreaLayout;
