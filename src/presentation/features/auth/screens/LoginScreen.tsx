import React, {useEffect, useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import CustomCheckbox from '../../../components/ui/CustomCheckbox';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import CustomTextInput from '../../../components/ui/CustomTextInput';
import AuthLayout from '../layout/AuthLayout';
import {Dropdown, Option} from 'react-native-paper-dropdown';
import {mapToDropdown} from '../../../../infrastructure/mappers/mapToDropdown';
import Toast from 'react-native-toast-message';
import LoadingScreen from '../../../components/ui/LoadingScreen';
import {useAuthStore} from '../../../store/auth/useAuthStore';
import {StorageAdapter} from '../../../../config/adapter/storage-adapter';

interface LoginFormValues {
  usuario: string;
  contrasena: string;
  empresa: string;
  recordar: boolean;
}

const initialValues: LoginFormValues = {
  usuario: '',
  contrasena: '',
  empresa: '',
  recordar: false,
};

const LoginSchema = Yup.object().shape({
  usuario: Yup.string().required('Requerido'),
  contrasena: Yup.string().required('Requerido'),
});

const LoginScreen = () => {
  const {colors} = useTheme();
  const [formValues, setFormValues] = useState<LoginFormValues>(initialValues);
  const [empresas, setEmpresas] = useState<Option[]>();
  const [disabled, setDisabled] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const {login} = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async data => {
      const {estado} = data.datos;

      if (estado === 1) {
        Toast.show({
          type: 'success',
          text1: 'Bienvenido al sistema',
        });
        //TODO: navegar al menu principal
      } else if (estado === 0) {
        Toast.show({
          type: 'error',
          text1: 'Login fallido',
          text2: 'Credenciales incorrectas',
        });
      } else if (estado === 2) {
        Toast.show({
          type: 'error',
          text1: 'Login fallido',
          text2: 'Usuario de baja',
        });
      } else if (estado === 3) {
        //TODO: navegar a actualizar clave
      } else if (estado === 4) {
        Toast.show({
          type: 'error',
          text1: 'Login fallido',
          text2: 'No cuentas con empresa asignada',
        });
      } else if (estado === 5) {
        const arrEmpresa = data.datos.empresas;

        if (arrEmpresa.length > 0) {
          const options = mapToDropdown(
            data.datos.empresas,
            'empr_nombre',
            'empr_codigo',
          );
          setEmpresas(options);
          setDisabled(true);
        } else {
          //TODO: navegar al menu principal
        }
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
      emprCodigo: values.empresa,
      recorded: values.recordar,
    };

    loginMutation.mutate(loginData);
  };

  useEffect(() => {
    const loadUser = async () => {
      const user = await StorageAdapter.getItem('usuario');
      if (user) {
        const parsedUser = JSON.parse(user);
        setFormValues({
          usuario: parsedUser.usua_codigo,
          contrasena: parsedUser.usua_clave,
          empresa: '',
          recordar: parsedUser.recorded,
        });
      }
      setLoadingUser(false);
    };

    loadUser();
  }, []);

  if (loadingUser) {
    return <LoadingScreen state={true} />;
  }

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
            initialValues={formValues}
            validationSchema={LoginSchema}
            enableReinitialize
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
                  disabled={disabled}
                />
                {touched.usuario && errors.usuario && (
                  <Text style={{color: 'red', marginBottom: 4}}>
                    {errors.usuario}
                  </Text>
                )}

                <CustomTextInput
                  label="Contraseña"
                  mode="outlined"
                  value={values.contrasena}
                  onChangeText={handleChange('contrasena')}
                  onBlur={handleBlur('contrasena')}
                  error={touched.contrasena && !!errors.contrasena}
                  left={<TextInput.Icon icon="lock" />}
                  showPassword
                  style={{marginTop: 8}}
                  disabled={disabled}
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
                      value={values.empresa} // <- valor de Formik
                      onSelect={val => setFieldValue('empresa', val)}
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
                    isChecked={values.recordar}
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
