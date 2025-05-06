import {View, ScrollView} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {useMutation} from '@tanstack/react-query';
import {TextInput} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useState} from 'react';
import CustomTextInput from '../../../components/ui/CustomTextInput';
import {ButtonSubmit} from '../../../components/ui/ButtonSubmit';
import AuthLayout from '../layout/AuthLayout';
import PrimaryButton from '../../../components/ui/PrimaryButton';

const tipoUsuario = 'USUA';
const usuaCodigo = '123456';

const isPasswordValid = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  return regex.test(password);
};

// Formatear fecha a yyyy-MM-dd
const formatFecha = (dateString: string) => {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};

// Simulación del servicio de actualización
const updatePassword = async (_data: any) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {message: 'Contraseña actualizada con éxito'};
};
const validationSchema = Yup.object().shape({
  actualPass: Yup.string(),
  fecha_nacimiento: Yup.string(),
  nuevoPass: Yup.string().required('Ingrese su nueva contraseña'),
  confirPass: Yup.string().required('Confirme su nueva contraseña'),
});

const CambioPassScreen = () => {
  const {colors} = useTheme(); // Obtén los colores del tema actual
  const [showDatePicker, setShowDatePicker] = useState(false);

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: data => {
      Toast.show({type: 'success', text1: data.message});
    },
    onError: () => {
      Toast.show({type: 'error', text1: 'Error al cambiar contraseña'});
    },
  });

  const initialValues = {
    fecha_nacimiento: '',
    actualPass: '',
    nuevoPass: '',
    confirPass: '',
  };

  const startCambioPassSubmit = (values: typeof initialValues) => {
    if (tipoUsuario === 'USUA' && !values.actualPass) {
      Toast.show({type: 'error', text1: 'Ingrese su contraseña actual'});
      return;
    }

    if (tipoUsuario !== 'USUA' && !values.fecha_nacimiento) {
      Toast.show({type: 'error', text1: 'Ingrese su fecha de nacimiento'});
      return;
    }

    if (!values.nuevoPass || !values.confirPass) {
      Toast.show({
        type: 'error',
        text1: 'Complete los campos de nueva contraseña',
      });
      return;
    }

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
      usuaCodigo,
      tipoLogin: tipoUsuario,
      usuaClave: values.actualPass,
      usuaClave2: values.nuevoPass,
      trabFecnaci:
        tipoUsuario !== 'USUA'
          ? formatFecha(values.fecha_nacimiento)
          : undefined,
    };

    mutation.mutate(data);
  };
  return (
    <AuthLayout>
      <ScrollView contentContainerStyle={{padding: 20}}>
        <Text variant="titleLarge" style={{marginBottom: 16}}>
          Cambiar contraseña
        </Text>

        <Formik
          initialValues={initialValues}
          onSubmit={startCambioPassSubmit}
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View>
              {tipoUsuario === 'USUA' ? (
                <CustomTextInput
                  label="Contraseña actual"
                  secureTextEntry
                  mode="outlined"
                  value={values.actualPass}
                  onChangeText={handleChange('actualPass')}
                  onBlur={handleBlur('actualPass')}
                  error={touched.actualPass && !!errors.actualPass}
                  left={<TextInput.Icon icon="lock" />}
                  style={{backgroundColor: colors.surface}}
                />
              ) : (
                <>
                  <CustomTextInput
                    label="Fecha de nacimiento"
                    placeholder="DD/MM/AAAA"
                    mode="outlined"
                    value={values.fecha_nacimiento}
                    onFocus={() => setShowDatePicker(true)}
                    error={
                      touched.fecha_nacimiento && !!errors.fecha_nacimiento
                    }
                    left={<TextInput.Icon icon="calendar" />}
                    style={{backgroundColor: colors.surface}}
                  />
                  <DateTimePickerModal
                    isVisible={showDatePicker}
                    mode="date"
                    onConfirm={date => {
                      const formatted = `${date
                        .getDate()
                        .toString()
                        .padStart(2, '0')}/${(date.getMonth() + 1)
                        .toString()
                        .padStart(2, '0')}/${date.getFullYear()}`;
                      setFieldValue('fecha_nacimiento', formatted);
                      setShowDatePicker(false);
                    }}
                    onCancel={() => setShowDatePicker(false)}
                  />
                </>
              )}

              <CustomTextInput
                label="Nueva contraseña"
                secureTextEntry
                mode="outlined"
                value={values.nuevoPass}
                onChangeText={handleChange('nuevoPass')}
                onBlur={handleBlur('nuevoPass')}
                error={touched.nuevoPass && !!errors.nuevoPass}
                left={<TextInput.Icon icon="lock" />}
                style={{backgroundColor: colors.surface}}
              />

              <CustomTextInput
                label="Confirmar contraseña"
                secureTextEntry
                mode="outlined"
                value={values.confirPass}
                onChangeText={handleChange('confirPass')}
                onBlur={handleBlur('confirPass')}
                error={touched.confirPass && !!errors.confirPass}
                left={<TextInput.Icon icon="lock-check" />}
                style={{backgroundColor: colors.surface}}
              />

              <View style={{marginTop: 16, width: '100%'}}>
                <PrimaryButton
                  onPress={() => handleSubmit()}
                  loading={mutation.isPending}
                  disabled={mutation.isPending}>
                  Cambiar contraseña
                </PrimaryButton>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </AuthLayout>
  );
};
export default CambioPassScreen;
