import {View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

const SafeAreaLayout = ({children, style}: Props) => {
  const {top,bottom} = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: top,
          paddingBottom: bottom,
        },
        style,
      ]}>
      {children}
    </View>
  );
};
export default SafeAreaLayout;
