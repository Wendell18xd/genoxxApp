import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainStackParam} from '../../../../navigations/MainStackNavigation';
import PrimaryButton from '../../../../components/ui/PrimaryButton';
const LiquidarMaterialesObras = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<MainStackParam>>();

  return (
    <View style={{flex: 1, paddingHorizontal: 20, marginTop: top + 20}}>
      <Text>LiquidarMateriales</Text>

      <PrimaryButton
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
        Abrir menu
      </PrimaryButton>
    </View>
  );
};
export default LiquidarMaterialesObras;
