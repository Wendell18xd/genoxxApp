import React, {useState} from 'react';
import {Image, ScrollView} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import CustomTextInput from '../../../components/ui/CustomTextInput';
import AuthLayout from '../layout/AuthLayout';
import { getLogin } from '../../../../actions/auth/auth';

interface CanbioPassFormValues {
  usuario: string;
}

const CambioPassSchema = Yup.object().shape({
  usuario: Yup.string().required('Requerido'),
});

export const CambioPassScreen = () => {
  const {colors} = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const versionMutation = useMutation({
    mutationFn: getLogin,
    onSuccess: async data => {
      console.log('Versión obtenida:', data);
      // Aquí haces la siguiente llamada
      // await loginUsuario({...});
      setIsSubmitting(false);
    },
    onError: error => {
      console.error('Error al obtener versión:', error);
      setIsSubmitting(false);
    },
  });

  const startCambioPassSubmit = (values: CanbioPassFormValues) => {
    if (isSubmitting) {
      // evita múltiples envíos
      return;
    }
    console.log('Login con:', values);
    setIsSubmitting(true);
    // versionMutation.mutate();
  };

  return (
    <AuthLayout>
      <ScrollView style={{flex: 1}}>
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
          Puede ingresar un DNI/RUT o un usuario del sistema. Se restablecera la contraseña del tipo de usuario que ingreses.

        </Text>
        <Formik
          initialValues={{usuario: '', contrasena: '', recordar: false}}
          validationSchema={CambioPassSchema}
          onSubmit={values => startCambioPassSubmit(values)}>
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
              <PrimaryButton
                onPress={() => handleSubmit()}
                loading={isSubmitting}
                disabled={isSubmitting}
                style={{marginTop: 32}}>
                Enviar
              </PrimaryButton>
            </>
          )}
        </Formik>
      </ScrollView>
    </AuthLayout>
  );
};
export default CambioPassScreen;
