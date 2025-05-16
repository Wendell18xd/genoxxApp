import {Image, View} from 'react-native';
import SafeAreaLayout from '../../../layout/SafeAreaLayout';
import {Text, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import {useAuthStore} from '../../../../../store/auth/useAuthStore';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import CustomSimpleCard from '../../../../../components/ui/CustomSimpleCard';
import * as Yup from 'yup';
import {isPasswordValid} from '../../../../../helper/utils';
import Toast from 'react-native-toast-message';
import {useMutation} from '@tanstack/react-query';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

interface CambioPassFormValues {
  actualPass: string;
  nuevoPass: string;
  confirPass: string;
}

const initialValues: CambioPassFormValues = {
  actualPass: '',
  nuevoPass: '',
  confirPass: '',
};

export const CambiarClaveScreen = () => {
  const {user, update} = useAuthStore();
  const navigation = useNavigation();

  const getValidationSchema = () =>
    Yup.object().shape({
      actualPass: Yup.string().required('Ingrese su contraseña actual'),
      nuevoPass: Yup.string().required('Ingrese su nueva contraseña'),
      confirPass: Yup.string().required('Confirme su nueva contraseña'),
    });

  const mutation = useMutation({
    mutationFn: update,
    onSuccess: data => {
      const estado = data.datos;

      if (estado === 1) {
        Toast.show({type: 'success', text1: 'Contraseña actualizada'});
        navigation.goBack();
      } else if (estado === 2) {
        Toast.show({
          type: 'error',
          text1: 'La contraseña actual es incorrecta',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error al actualizar contraseña.',
        });
      }
    },
    onError: error => {
      Toast.show({type: 'error', text1: error.message});
    },
  });

  const startCambioPassSubmit = (values: CambioPassFormValues) => {
    if (!isPasswordValid(values.nuevoPass)) {
      Toast.show({
        type: 'error',
        text1: 'Contraseña inválida',
        text2:
          'Debe tener al menos 8 caracteres, mayúsculas, minúsculas, números y símbolos.',
      });
      return;
    }

    if (values.nuevoPass !== values.confirPass) {
      Toast.show({type: 'error', text1: 'Las contraseñas no coinciden'});
      return;
    }

    const data = {
      usuaCodigo: user?.usua_codigo || '',
      tipoLogin: user?.usua_login || '',
      usuaClave: values.actualPass,
      usuaClave2: values.nuevoPass,
      trabFecnaci: '',
    };

    mutation.mutate(data);
  };

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
                  style={{marginTop: 8}}>
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
