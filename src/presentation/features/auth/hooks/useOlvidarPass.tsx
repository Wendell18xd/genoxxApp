import {useState} from 'react';
import {useAuthStore} from '../../../store/auth/useAuthStore';
import * as Yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {Alert} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParam} from '../../../navigations/AuthStackNavigation';

interface OlvidarPassFormValues {
  usuario: string;
}

const initialValues: OlvidarPassFormValues = {
  usuario: '',
};

export const useOlvidarPass = () => {
  const [formValues, setFormValues] =
    useState<OlvidarPassFormValues>(initialValues);
  const {forgot} = useAuthStore();
  const navigation =
    useNavigation<NavigationProp<AuthStackParam, 'OlvidarPassScreen'>>();

  const OlvidarPassSchema = Yup.object().shape({
    usuario: Yup.string().required('Requerido'),
  });

  const forgotPassMutation = useMutation({
    mutationFn: forgot,
    onSuccess: async data => {
      const {estado, tipo, usua_correo} = data.datos;

      if (estado === 5) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'El usuario no existe',
        });
      } else if (estado === 1) {
        if (tipo === 'USUA') {
          Alert.alert(
            'Contraseña temporal enviada',
            `Se ha enviado tu contraseña temporal al correo: ${usua_correo}`,
            [
              {
                text: 'Ir al Login',
                onPress: () => {
                  navigateToLogin();
                },
              },
            ],
          );
        } else {
          navigation.navigate('CambioPassScreen');
        }
      } else if (estado === 2 && tipo === 'USUA') {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'El usuario no tiene correo',
        });
      } else {
        if (tipo === 'USUA') {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'No se pudo enviar el correo',
          });
        }
      }
    },
    onError: error => {
      console.error('Error al recuperar contraseña:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    },
  });

  const navigateToLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
    setFormValues(initialValues);
  };

  const startOlvidarPassSubmit = (values: OlvidarPassFormValues) => {
    const forgotData = {
      usuaCodigo: values.usuario,
    };
    forgotPassMutation.mutate(forgotData);
  };

  return {
    //* Propiedades
    formValues,
    OlvidarPassSchema,
    forgotPassMutation,

    //* Metodos
    startOlvidarPassSubmit,
  };
};
