import React from 'react';
import {Image, ScrollView} from 'react-native';
import {Appbar, Button, Text, TextInput, useTheme} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import CustomCheckbox from '../../components/CustomCheckbox';
import {getVersionApp} from '../../../actions/auth/auth';

const LoginSchema = Yup.object().shape({
  usuario: Yup.string().required('Requerido'),
  contrasena: Yup.string().required('Requerido'),
});

const LoginScreen = () => {
  const {colors} = useTheme();
  const _handleMore = () => console.log('Shown more');

  const versionMutation = useMutation({
    mutationFn: getVersionApp,
    onSuccess: async data => {
      console.log('Versión obtenida:', data);
      // Aquí haces la siguiente llamada
      // await loginUsuario({...});
    },
    onError: error => {
      console.error('Error al obtener versión:', error);
    },
  });

  return (
    <>
      <Appbar.Header style={{backgroundColor: colors.primary}}>
        <Appbar.Content title="Iniciar Sesión" titleStyle={{color: 'white'}} />
        <Appbar.Action icon="build" onPress={_handleMore} color="white" />
      </Appbar.Header>

      <ScrollView style={{flex: 1, padding: 32}}>
        <Text variant="bodySmall">1.0.0</Text>

        <Image
          source={require('../../../assets/images/logo.png')}
          style={{width: 250, alignSelf: 'center', marginVertical: 32}}
          resizeMode="contain"
        />

        <Formik
          initialValues={{usuario: '', contrasena: '', recordar: false}}
          validationSchema={LoginSchema}
          onSubmit={values => {
            console.log('Login con:', values);
            versionMutation.mutate(); // Llamada a getVersionApp
          }}>
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
              <TextInput
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

              <TextInput
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

              <CustomCheckbox
                label="Recordar"
                onChange={checked => setFieldValue('recordar', checked)}
                style={{marginTop: 16}}
              />

              <Button
                mode="contained"
                onPress={() => handleSubmit()}
                loading={versionMutation.isPending}
                disabled={versionMutation.isPending}
                style={{marginTop: 32}}>
                Iniciar Sesión
              </Button>
            </>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

export default LoginScreen;
