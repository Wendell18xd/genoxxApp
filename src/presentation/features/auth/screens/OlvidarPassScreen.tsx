import React, {useState} from 'react';
import {Alert, Image, ScrollView, View} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import CustomTextInput from '../../../components/ui/CustomTextInput';
import AuthLayout from '../layout/AuthLayout';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParam} from '../../../navigations/AuthStackNavigation';
import {useAuthStore} from '../../../store/auth/useAuthStore';
import Toast from 'react-native-toast-message';

interface OlvidarPassFormValues {
  usuario: string;
}

const initialValues: OlvidarPassFormValues = {
  usuario: '',
};

interface Props extends StackScreenProps<AuthStackParam, 'OlvidarPassScreen'> {}

const OlvidarPassScreen = ({navigation}: Props) => {
  const {colors} = useTheme();
  const [formValues, setFormValues] =
    useState<OlvidarPassFormValues>(initialValues);
  const {forgot} = useAuthStore();

  const OlvidarPassSchema = Yup.object().shape({
    usuario: Yup.string().required('Requerido'),
  });
  const forgotPassMutation = useMutation({
    mutationFn: forgot,
    onSuccess: async data => {
      const {estado, tipo, usua_correo} = data.datos;

      if (estado === 5) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'El usuario no existe',
        });
      } else if (estado === 1) {
        if (tipo === 'USUA') {
          Alert.alert(
            'Contraseña temporal enviada',
            `Se ha enviado tu contraseña temporal al correo: ${usua_correo}`,
            [
              {
                text: 'Ir al Login',
                onPress: () => {
                  navigateToLogin();
                },
              },
            ],
          );
        } else {
          navigation.navigate('CambioPassScreen');
        }
      } else if (estado === 2 && tipo === 'USUA') {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'El usuario no tiene correo',
        });
      } else {
        if (tipo === 'USUA') {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'No se pudo enviar el correo',
          });
        }
      }
    },
    onError: error => {
      console.error('Error al recuperar contraseña:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    },
  });

  const navigateToLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
    setFormValues(initialValues);
  };

  const startOlvidarPassSubmit = (values: OlvidarPassFormValues) => {
    const forgotData = {
      usuaCodigo: values.usuario,
    };
    forgotPassMutation.mutate(forgotData);
  };

  return (
    <>
      <AuthLayout>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={require('../../../../assets/images/logo.png')}
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              marginBottom: 32,
            }}
            resizeMode="contain"
          />

          <Text
            variant="headlineLarge"
            style={{textAlign: 'center', marginBottom: 16}}>
            ¿Cuál es el usuario con el que desea ingresar?
          </Text>
          <Text
            style={{
              marginBottom: 16,
              textAlign: 'center',
              color: colors.primary,
            }}>
            Puede ingresar un DNI/RUT o un usuario del sistema. Se restablecera
            la contraseña del tipo de usuario que ingreses.
          </Text>

          <Formik
            initialValues={formValues}
            validationSchema={OlvidarPassSchema}
            onSubmit={values => startOlvidarPassSubmit(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <CustomTextInput
                  label="Usuario"
                  mode="outlined"
                  autoCapitalize="characters"
                  value={values.usuario}
                  onChangeText={handleChange('usuario')}
                  onBlur={handleBlur('usuario')}
                  error={touched.usuario && !!errors.usuario}
                  left={<TextInput.Icon icon="account" />}
                />
                {touched.usuario && errors.usuario && (
                  <Text style={{color: 'red', marginBottom: 4}}>
                    {errors.usuario}
                  </Text>
                )}
                <View
                  pointerEvents={
                    forgotPassMutation.isPending ? 'none' : 'auto'
                  }>
                  <PrimaryButton
                    onPress={() => handleSubmit()}
                    loading={forgotPassMutation.isPending}
                    disabled={forgotPassMutation.isPending}
                    style={{marginTop: 32}}>
                    Enviar
                  </PrimaryButton>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </AuthLayout>
    </>
  );
};
export default OlvidarPassScreen;
