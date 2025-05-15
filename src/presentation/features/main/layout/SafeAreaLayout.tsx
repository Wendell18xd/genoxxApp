import {View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CurvaBottomView from '../../../components/ui/CurvaBottomView';
import {useTheme} from 'react-native-paper';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  primary?: boolean;
  isCurva?: boolean;
  curvaHeight?: number;
}

const SafeAreaLayout = ({
  children,
  style,
  primary = false,
  isCurva = false,
  curvaHeight = 10,
}: Props) => {
  const {top} = useSafeAreaInsets();
  const {colors} = useTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: top,
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
  );
};
export default SafeAreaLayout;
