import {useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';
import {Formik} from 'formik';
import CustomCheckbox from '../../../components/ui/CustomCheckbox';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import CustomTextInput from '../../../components/ui/CustomTextInput';
import AuthLayout from '../layout/AuthLayout';
import FullScreenLoader from '../../../components/ui/loaders/FullScreenLoader';
import {CustomDropdownInput} from '../../../components/ui/CustomDropdownInput';
import CustomKeyboardAvoidingView from '../../../components/ui/CustomKeyboardAvoidingView';
import CustomScrollView from '../../../components/ui/CustomScrollView';
import {useLogin} from '../hooks/useLogin';

const LoginScreen = () => {
  const {colors} = useTheme();
  const {
    empresas,
    disabled,
    formValues,
    loadingUser,
    navigation,
    loginMutation,
    getLoginSchema,
    loadUser,
    startLoginSubmit,
  } = useLogin();

  useEffect(() => {
    loadUser();
  }, []);

  if (loadingUser) {
    return <FullScreenLoader />;
  }

  return (
    <AuthLayout>
      {loginMutation.isPending && <FullScreenLoader transparent/>}
      <CustomKeyboardAvoidingView keyboardVerticalOffset={280}>
        <CustomScrollView>
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
            validationSchema={getLoginSchema(empresas)}
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
                    <CustomDropdownInput
                      label="Empresa"
                      placeholder="Seleccione una empresa"
                      options={empresas}
                      value={values.empresa}
                      onSelect={val => setFieldValue('empresa', val)}
                      icon="office-building-outline"
                      error={touched.empresa && !!errors.empresa}
                    />
                  </View>
                )}
                {touched.empresa && errors.empresa && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.empresa}
                  </Text>
                )}

                <View
                  style={{
                    marginTop: 16,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <CustomCheckbox
                    label="Recordar"
                    onChange={checked => setFieldValue('recordar', checked)}
                    isChecked={values.recordar}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('OlvidarPassScreen')}>
                    <Text style={{color: colors.primary}}>
                      ¿Olvido su contraseña?
                    </Text>
                  </TouchableOpacity>
                </View>

                <PrimaryButton
                  onPress={() => handleSubmit()}
                  debounce
                  disabled={loginMutation.isPending}
                  loading={loginMutation.isPending}
                  style={{marginTop: 32, width: '100%'}}>
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
        </CustomScrollView>
      </CustomKeyboardAvoidingView>
    </AuthLayout>
  );
};

export default LoginScreen;
