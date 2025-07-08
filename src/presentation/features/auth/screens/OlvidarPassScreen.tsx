import {Image} from 'react-native';
import {Text, TextInput, useTheme} from 'react-native-paper';
import {Formik} from 'formik';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import CustomTextInput from '../../../components/ui/CustomTextInput';
import AuthLayout from '../layout/AuthLayout';
import CustomKeyboardAvoidingView from '../../../components/ui/CustomKeyboardAvoidingView';
import CustomScrollView from '../../../components/ui/CustomScrollView';
import {useOlvidarPass} from '../hooks/useOlvidarPass';

const OlvidarPassScreen = () => {
  const {colors} = useTheme();
  const {
    forgotPassMutation,
    formValues,
    OlvidarPassSchema,
    startOlvidarPassSubmit,
  } = useOlvidarPass();

  return (
    <>
      <AuthLayout>
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
              ¿Cuál es el usuario con el que desea ingresar?
            </Text>
            <Text
              style={{
                marginBottom: 16,
                textAlign: 'center',
                color: colors.primary,
              }}>
              Puede ingresar un DNI/RUT o un usuario del sistema. Se
              restablecera la contraseña del tipo de usuario que ingreses.
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
                  <PrimaryButton
                    onPress={() => handleSubmit()}
                    debounce
                    disabled={forgotPassMutation.isPending}
                    loading={forgotPassMutation.isPending}
                    style={{marginTop: 32, width: '100%'}}>
                    Enviar
                  </PrimaryButton>
                </>
              )}
            </Formik>
          </CustomScrollView>
        </CustomKeyboardAvoidingView>
      </AuthLayout>
    </>
  );
};
export default OlvidarPassScreen;
