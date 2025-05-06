import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import {getOlvidoClave} from '../../../../actions/auth/auth';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import CustomTextInput from '../../../components/ui/CustomTextInput';
import AuthLayout from '../layout/AuthLayout';
import Toast from 'react-native-toast-message';

interface OlvidarPassFormValues {
  usuario: string;
  // tipo_login: string;
  // correo: string;
  // estado: string;
}

const initialValues: OlvidarPassFormValues = {
  usuario: '',
  // tipo_login: '',
  // correo: '',
  // estado: '',
};

const OlvidarPassSchema = Yup.object().shape({
  usuario: Yup.string().required('Requerido'),
});

const OlvidarPassScreen = () => {
  const {colors} = useTheme();

  const forgotPassMutation = useMutation({
    mutationFn: getOlvidoClave,
    onSuccess: async data => {
      const {estado} = data.datos;
      const {tipo_login} = data.datos;
      const {correo} = data.datos;
      const {usuario} = data.datos;

      if (estado === 5) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No existe el usuario',
        });
      } else if (estado === 1) {
        if (tipo_login === 'USUA') {
          Toast.show({
            type: 'success',
            text1: 'Contraseña temporal enviada',
            text2: `Se ha enviado tu contraseña temporal al correo: ${correo}`,
          });
        } else {
          Toast.show({
            type: 'success',
            text1: 'Constraseña restablecida',
            text2: `Tu contraseña ha sido restablecida: ${usuario}`,
          });
        }
      } else if (estado === 2 && tipo_login === 'USUA') {
        Toast.show({
          type: 'error',
          text1: 'El usuario no tiene correo',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'No se pudo enviar el correo',
        });
      }
    },
    onError: error => {
      console.error('Error al recuperar contraseña:', error);
      Toast.show({
        type: 'error',
        text1: 'Hubo un error al recuperar la contraseña',
      });
    },
  });

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
            initialValues={initialValues}
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
                  left={<TextInput.Icon icon="person" />}
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
