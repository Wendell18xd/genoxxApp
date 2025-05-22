import {Image, View} from 'react-native';
import SafeAreaLayout from '../../../layout/SafeAreaLayout';
import {Text, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import CustomSimpleCard from '../../../../../components/ui/CustomSimpleCard';
import {ScrollView} from 'react-native-gesture-handler';
import {useCambiarClave} from './hooks/useCambiarClave';

export const CambiarClaveScreen = () => {
  const {initialValues, mutation, getValidationSchema, startCambioPassSubmit} =
    useCambiarClave();

  return (
    <SafeAreaLayout title="Cambiar contraseña" isHeader primary>
      <ScrollView
        contentContainerStyle={{
          padding: 32,
          flexGrow: 1,
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../../../../../assets/images/candado.png')}
          style={{
            width: 150,
            height: 150,
            alignSelf: 'center',
            marginBottom: 32,
          }}
          resizeMode="cover"
        />

        <Formik
          initialValues={initialValues}
          onSubmit={startCambioPassSubmit}
          validationSchema={getValidationSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => {
            return (
              <View>
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
      </ScrollView>
    </SafeAreaLayout>
  );
};
