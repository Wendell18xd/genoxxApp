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
import {Dropdown, Option} from 'react-native-paper-dropdown';
import {mapToDropdown} from '../../../../infrastructure/mappers/mapToDropdown';

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
  const [value, setValue] = useState<string>();
  const [empresas, setEmpresas] = useState<Option[]>();

  const loginMutation = useMutation({
    mutationFn: getLogin,
    onSuccess: async data => {
      if (data.datos.estado === 5) {
        const options = mapToDropdown(
          data.datos.empresas,
          'empr_nombre',
          'empr_codigo',
        );
        setEmpresas(options);
      }
    },
    onError: error => {
      console.error('Error al obtener versión:', error);
    },
  });

  const startLoginSubmit = (values: LoginFormValues) => {
    const loginData = {
      usuaCodigo: values.usuario,
      usuaClave: values.contrasena,
      emprCodigo: value || '',
      recorded: values.recordar,
    };

    loginMutation.mutate(loginData);
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
                  left={<TextInput.Icon icon="account" />}
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
                  left={<TextInput.Icon icon="lock" />}
                  right={<TextInput.Icon icon="eye" />}
                  style={{marginTop: 8}}
                />
                {touched.contrasena && errors.contrasena && (
                  <Text style={{color: 'red', marginBottom: 4}}>
                    {errors.contrasena}
                  </Text>
                )}

                {empresas && empresas.length > 0 && (
                  <View style={{marginTop: 8}}>
                    <Dropdown
                      label="Empresa"
                      placeholder="Seleccione una empresa"
                      mode="outlined"
                      options={empresas}
                      value={value}
                      onSelect={setValue}
                    />
                  </View>
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

                <View pointerEvents={loginMutation.isPending ? 'none' : 'auto'}>
                  <PrimaryButton
                    onPress={() => handleSubmit()}
                    loading={loginMutation.isPending}
                    disabled={loginMutation.isPending}
                    style={{marginTop: 32}}>
                    Iniciar Sesión
                  </PrimaryButton>
                </View>

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
    </>
  );
};

export default LoginScreen;
