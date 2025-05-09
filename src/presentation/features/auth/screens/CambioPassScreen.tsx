import {View, ScrollView, Image} from 'react-native';
import {Portal, Text} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {useMutation} from '@tanstack/react-query';
import {TextInput} from 'react-native-paper';
import CustomTextInput from '../../../components/ui/CustomTextInput';
import AuthLayout from '../layout/AuthLayout';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import {useAuthStore} from '../../../store/auth/useAuthStore';
import CustomSimpleCard from '../../../components/ui/CustomSimpleCard';
import {isPasswordValid} from '../../../helper/utils';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParam} from '../../../navigations/AuthStackNavigation';
import {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {format, parseISO} from 'date-fns';

interface CambioPassFormValues {
  fechaNacimiento: string;
  actualPass: string;
  nuevoPass: string;
  confirPass: string;
}

const initialValues: CambioPassFormValues = {
  fechaNacimiento: '',
  actualPass: '',
  nuevoPass: '',
  confirPass: '',
};

interface Props extends StackScreenProps<AuthStackParam, 'CambioPassScreen'> {}

const CambioPassScreen = ({navigation}: Props) => {
  const {user, update} = useAuthStore();
  const [open, setOpen] = useState(false);

  const getValidationSchema = (tipoUsuario: string) =>
    Yup.object().shape({
      actualPass: Yup.string().when([], {
        is: () => tipoUsuario === 'USUA',
        then: schema => schema.required('Ingrese su contraseña actual'),
        otherwise: schema => schema.notRequired(),
      }),
      fechaNacimiento: Yup.string().when([], {
        is: () => tipoUsuario !== 'USUA',
        then: schema => schema.required('Ingrese su fecha de nacimiento'),
        otherwise: schema => schema.notRequired(),
      }),
      nuevoPass: Yup.string().required('Ingrese su nueva contraseña'),
      confirPass: Yup.string().required('Confirme su nueva contraseña'),
    });

  const mutation = useMutation({
    mutationFn: update,
    onSuccess: data => {
      const estado = data.datos;

      if (estado === 1) {
        navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
        Toast.show({type: 'success', text1: 'Contraseña actualizada'});
      } else if (estado === 2) {
        if (user?.usua_tipo === 'USUA') {
          Toast.show({
            type: 'error',
            text1: 'La contraseña actual es incorrecta',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'La fecha de nacimiento es incorrecto.',
          });
        }
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
      tipoLogin: user?.usua_tipo || '',
      usuaClave: values.actualPass,
      usuaClave2: values.nuevoPass,
      trabFecnaci: values.fechaNacimiento,
    };

    mutation.mutate(data);
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
                    <CustomTextInput
                      label="Fecha de nacimiento"
                      placeholder="Selecciona tu fecha"
                      mode="outlined"
                      value={
                        values.fechaNacimiento
                          ? format(
                              parseISO(values.fechaNacimiento),
                              'dd/MM/yyyy',
                            )
                          : ''
                      }
                      onPressIn={() => setOpen(true)}
                      error={
                        touched.fechaNacimiento && !!errors.fechaNacimiento
                      }
                      left={<TextInput.Icon icon="calendar" />}
                      style={{marginBottom: 8}}
                      showSoftInputOnFocus={false}
                    />

                    <Portal>
                      <DatePicker
                        modal
                        open={open}
                        date={
                          values.fechaNacimiento
                            ? new Date(values.fechaNacimiento)
                            : new Date()
                        }
                        title="Selecciona tu fecha de nacimiento"
                        cancelText="Cancelar"
                        confirmText="Confirmar"
                        mode="date"
                        locale="es"
                        onConfirm={date => {
                          setOpen(false);
                          const formatted = format(date, 'yyyy-MM-dd');
                          setFieldValue('fechaNacimiento', formatted);
                        }}
                        onCancel={() => setOpen(false)}
                      />
                    </Portal>
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

                <View style={{marginTop: 16, width: '100%'}}>
                  <PrimaryButton
                    onPress={() => handleSubmit()}
                    loading={mutation.isPending}
                    disabled={mutation.isPending}>
                    Cambiar contraseña
                  </PrimaryButton>
                </View>
                <View style={{paddingVertical: 16, paddingHorizontal: 1}}>
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
    </AuthLayout>
  );
};

export default CambioPassScreen;
