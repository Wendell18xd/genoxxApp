import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {Formik} from 'formik';
import {TextInput} from 'react-native-paper';
import CustomTextInput from '../../../components/ui/CustomTextInput';
import AuthLayout from '../layout/AuthLayout';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import CustomSimpleCard from '../../../components/ui/CustomSimpleCard';
import CustomDatePicker from '../../../components/ui/CustomDatePicker';
import CustomScrollView from '../../../components/ui/CustomScrollView';
import CustomKeyboardAvoidingView from '../../../components/ui/CustomKeyboardAvoidingView';
import {useCambioPass} from '../hooks/useCambioPass';

const CambioPassScreen = () => {
  const {
    initialValues,
    user,
    mutation,
    startCambioPassSubmit,
    getValidationSchema,
  } = useCambioPass();

  return (
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
            Actualizar Contraseña
          </Text>

          <View>
            <Text
              variant="bodyMedium"
              style={{textAlign: 'center', marginBottom: 0}}>
              ¡Advertencia!
            </Text>
            <Text
              variant="bodyMedium"
              style={{textAlign: 'center', marginBottom: 16}}>
              Debe cambiar su contraseña.
            </Text>
          </View>

          <Formik
            initialValues={initialValues}
            onSubmit={startCambioPassSubmit}
            validationSchema={getValidationSchema(user?.usua_tipo || '')}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => {
              return (
                <View>
                  {user?.usua_tipo === 'USUA' ? (
                    <>
                      <CustomTextInput
                        label="Contraseña actual"
                        showPassword
                        mode="outlined"
                        value={values.actualPass}
                        onChangeText={handleChange('actualPass')}
                        onBlur={handleBlur('actualPass')}
                        error={touched.actualPass && !!errors.actualPass}
                        left={<TextInput.Icon icon="lock" />}
                        style={{marginBottom: 8}}
                        autoComplete="off"
                        textContentType="username"
                        importantForAutofill="no"
                      />
                      {touched.actualPass && errors.actualPass && (
                        <Text style={{color: 'red', marginBottom: 4}}>
                          {errors.actualPass}
                        </Text>
                      )}
                    </>
                  ) : (
                    <>
                      <CustomDatePicker
                        label="Fecha de nacimiento"
                        placeholder="Selecciona tu fecha"
                        value={values.fechaNacimiento}
                        style={{marginBottom: 8}}
                        onChange={val => setFieldValue('fechaNacimiento', val)}
                        error={
                          touched.fechaNacimiento && !!errors.fechaNacimiento
                        }
                      />
                      {touched.fechaNacimiento && errors.fechaNacimiento && (
                        <Text style={{color: 'red', marginBottom: 4}}>
                          {errors.fechaNacimiento}
                        </Text>
                      )}
                    </>
                  )}

                  <CustomTextInput
                    label="Nueva contraseña"
                    showPassword
                    mode="outlined"
                    value={values.nuevoPass}
                    onChangeText={handleChange('nuevoPass')}
                    onBlur={handleBlur('nuevoPass')}
                    error={touched.nuevoPass && !!errors.nuevoPass}
                    left={<TextInput.Icon icon="lock" />}
                    style={{marginBottom: 8}}
                    autoComplete="off"
                    textContentType="newPassword"
                    importantForAutofill="no"
                  />
                  {touched.nuevoPass && errors.nuevoPass && (
                    <Text style={{color: 'red', marginBottom: 4}}>
                      {errors.nuevoPass}
                    </Text>
                  )}

                  <CustomTextInput
                    label="Confirme contraseña"
                    showPassword
                    mode="outlined"
                    value={values.confirPass}
                    onChangeText={handleChange('confirPass')}
                    onBlur={handleBlur('confirPass')}
                    error={touched.confirPass && !!errors.confirPass}
                    left={<TextInput.Icon icon="lock-check" />}
                    style={{marginBottom: 8}}
                    autoComplete="off"
                    textContentType="password"
                    importantForAutofill="no"
                  />
                  {touched.confirPass && errors.confirPass && (
                    <Text style={{color: 'red', marginBottom: 4}}>
                      {errors.confirPass}
                    </Text>
                  )}

                  <PrimaryButton
                    onPress={() => handleSubmit()}
                    debounce
                    disabled={mutation.isPending}
                    loading={mutation.isPending}
                    style={{marginTop: 8, width: '100%'}}>
                    Cambiar contraseña
                  </PrimaryButton>
                  <View
                    style={{
                      paddingVertical: 16,
                      paddingHorizontal: 1,
                    }}>
                    <CustomSimpleCard
                      content="La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos especiales. (#?.;!@$%^&*-_)"
                      backgroundColor="#fff3cd"
                      textColor="#856404"
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        </CustomScrollView>
      </CustomKeyboardAvoidingView>
    </AuthLayout>
  );
};

export default CambioPassScreen;
