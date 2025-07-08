import {Image, View} from 'react-native';
import AuthLayout from '../layout/AuthLayout';
import {Text, useTheme} from 'react-native-paper';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParam} from '../../../navigations/AuthStackNavigation';
import CustomScrollView from '../../../components/ui/CustomScrollView';

interface Props extends StackScreenProps<AuthStackParam, 'GetStartScreen'> {}

const GetStartScreen = ({navigation}: Props) => {
  const {colors} = useTheme();

  return (
    <AuthLayout>
      <CustomScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Image
            source={require('../../../../assets/images/logo.png')}
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
          />

          <View style={{marginTop: 16, alignItems: 'center'}}>
            <Text variant="headlineMedium">Bienvenidos</Text>
            <Text
              variant="bodyMedium"
              style={{marginTop: 16, textAlign: 'justify'}}>
              Esta app está diseñada para ayudarte a gestionar de manera fácil y
              eficiente todos los aspectos de tu negocio, desde el control de
              inventarios hasta la gestión de ventas y procesos productivos.
            </Text>
          </View>

          <View style={{marginTop: 32, width: '100%'}}>
            <PrimaryButton
              style={{width: '100%'}}
              onPress={() => navigation.navigate('LoginScreen')}>
              Ingresar
            </PrimaryButton>
            <Text
              style={{
                marginTop: 8,
                textAlign: 'center',
                color: colors.primary,
              }}>
              Privacidad y protección de datos
            </Text>
          </View>
        </View>
      </CustomScrollView>
    </AuthLayout>
  );
};
export default GetStartScreen;
