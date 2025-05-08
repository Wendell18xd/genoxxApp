import {View, ScrollView, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {useMutation} from '@tanstack/react-query';
import {TextInput} from 'react-native-paper';
import CustomTextInput from '../../../components/ui/CustomTextInput';
import AuthLayout from '../layout/AuthLayout';
import PrimaryButton from '../../../components/ui/PrimaryButton';
import {useAuthStore} from '../../../store/auth/useAuthStore';
import CustomCard from '../../../components/CustomCard';

const tipoUsuario = 'USUA';
const usuaCodigo = '123456';

const isPasswordValid = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  return regex.test(password);
};

// Simulación del servicio de actualización
const updatePassword = async (_data: any) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {message: 'Contraseña actualizada con éxito'};
};

const validationSchema = Yup.object().shape({
  actualPass: Yup.string(),
  fechaNacimiento: Yup.string(),
  nuevoPass: Yup.string().required('Ingrese su nueva contraseña'),
  confirPass: Yup.string().required('Confirme su nueva contraseña'),
});

import React, {useState} from 'react';

const CambioPassScreen = () => {
  const [showPasswordError, setShowPasswordError] = useState(false);
  const {user} = useAuthStore();

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: data => {
      Toast.show({type: 'success', text1: data.message});
    },
    onError: () => {
      Toast.show({type: 'error', text1: 'Error al cambiar contraseña'});
    },
  });
  const formatFechaInput = (text: string): string => {
    // Elimina cualquier carácter que no sea un número
    const cleaned = text.replace(/\D/g, '');

    // Divide el texto en día, mes y año
    const day = cleaned.slice(0, 2);
    const month = cleaned.slice(2, 4);
    const year = cleaned.slice(4, 8);

    // Construye el texto formateado
    let formatted = day;
    if (month) {
      formatted += `/${month}`;
    }
    if (year) {
      formatted += `/${year}`;
    }

    return formatted;
  };

  const initialValues = {
    fechaNacimiento: '',
    actualPass: '',
    nuevoPass: '',
    confirPass: '',
  };

  const startCambioPassSubmit = (values: typeof initialValues) => {
    if (tipoUsuario === 'USUA' && !values.actualPass) {
      Toast.show({type: 'error', text1: 'Ingrese su contraseña actual'});
      return;
    }

    if (tipoUsuario !== 'USUA' && !values.fechaNacimiento) {
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
      setShowPasswordError(true); // Muestra el aviso de error
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
    setShowPasswordError(false); // Oculta el aviso si todo está correcto

    const data = {
      usuaCodigo,
      tipoLogin: tipoUsuario,
      usuaClave: values.actualPass,
      usuaClave2: values.nuevoPass,
      trabFecnaci: tipoUsuario !== 'USUA',
    };

    mutation.mutate(data);
  };

  return (
    <AuthLayout>
      <ScrollView contentContainerStyle={{padding: 20}}>
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
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue, // <== necesario para actualizar la fecha
          }) => {
            return (
              <View>
                {user?.usua_tipo === 'USUA' ? (
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
                ) : (
                  <CustomTextInput
                    label="Fecha de nacimiento"
                    placeholder="DD/MM/AAAA"
                    mode="outlined"
                    value={values.fechaNacimiento}
                    onChangeText={text => {
                      const formattedText = formatFechaInput(text); // Formatea el texto mientras se escribe
                      setFieldValue('fechaNacimiento', formattedText); // Actualiza el valor en Formik
                    }}
                    error={touched.fechaNacimiento && !!errors.fechaNacimiento}
                    left={<TextInput.Icon icon="calendar" />}
                    style={{marginBottom: 8}}
                    keyboardType="numeric" // Asegura que el teclado numérico se muestre
                  />
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

                <View style={{marginTop: 16, width: '100%'}}>
                  <PrimaryButton
                    onPress={() => handleSubmit()}
                    loading={mutation.isPending}
                    disabled={mutation.isPending}>
                    Cambiar contraseña
                  </PrimaryButton>
                </View>
                <View style={{marginTop: 16}}>
                  <CustomCard
                    title="La contraseña debe tener al menos 8 caracteres"
                    content="Incluyendo mayúsculas, minúsculas, números y símbolos especiales. (#?:!@$%^&*-_)."
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
