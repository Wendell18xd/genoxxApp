import React, {useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import CustomCheckbox from '../../../components/ui/CustomCheckbox';
import {getLogin} from '../../../../actions/auth/auth';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import CustomTextInput from '../../../components/ui/CustomTextInput';
import AuthLayout from '../layout/AuthLayout';

interface LoginFormValues {
  usuario: string;
  contrasena: string;
  recordar: boolean;
}

const LoginSchema = Yup.object().shape({
  usuario: Yup.string().required('Requerido'),
  contrasena: Yup.string().required('Requerido'),
});

const LoginScreen = () => {
  const {colors} = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const versionMutation = useMutation({
    mutationFn: getLogin,
    onSuccess: async data => {
      console.log('Versión obtenida:', data);
      setIsSubmitting(false);
    },
    onError: error => {
      console.error('Error al obtener versión:', error);
      setIsSubmitting(false);
    },
  });

  const startLoginSubmit = (values: LoginFormValues) => {
    if (isSubmitting) {
      return;
    }

    const loginData = {
      usuaCodigo: values.usuario,
      usuaClave: values.contrasena,
      emprCodigo: '',
      recorded: values.recordar,
    };

    setIsSubmitting(true);
    versionMutation.mutate(loginData);
  };

  return (
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
          Iniciar Sesión
        </Text>

        <Formik
          initialValues={{usuario: '', contrasena: '', recordar: false}}
          validationSchema={LoginSchema}
          onSubmit={values => startLoginSubmit(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
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

              <CustomTextInput
                label="Contraseña"
                secureTextEntry
                mode="outlined"
                value={values.contrasena}
                onChangeText={handleChange('contrasena')}
                onBlur={handleBlur('contrasena')}
                error={touched.contrasena && !!errors.contrasena}
                left={<TextInput.Icon icon="lock-closed" />}
                right={<TextInput.Icon icon="eye" />}
                style={{marginTop: 8}}
              />
              {touched.contrasena && errors.contrasena && (
                <Text style={{color: 'red', marginBottom: 4}}>
                  {errors.contrasena}
                </Text>
              )}

              <View
                style={{
                  marginTop: 16,
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <CustomCheckbox
                  label="Recordar"
                  onChange={checked => setFieldValue('recordar', checked)}
                />
                <Text>¿Olvido su contraseña?</Text>
              </View>

              <PrimaryButton
                onPress={() => handleSubmit()}
                loading={isSubmitting}
                disabled={isSubmitting}
                style={{marginTop: 32}}>
                Iniciar Sesión
              </PrimaryButton>
              <Text
                style={{
                  marginTop: 8,
                  textAlign: 'center',
                  color: colors.primary,
                }}>
                Privacidad y protección de datos
              </Text>
            </>
          )}
        </Formik>
      </ScrollView>
    </AuthLayout>
  );
};

export default LoginScreen;
