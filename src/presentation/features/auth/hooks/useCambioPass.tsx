import {useMutation} from '@tanstack/react-query';
import {useAuthStore} from '../../../store/auth/useAuthStore';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {isPasswordValid} from '../../../helper/utils';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParam} from '../../../navigations/AuthStackNavigation';

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

export const useCambioPass = () => {
  const {user, update} = useAuthStore();
  const navigation =
    useNavigation<NavigationProp<AuthStackParam, 'CambioPassScreen'>>();

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

  return {
    //* Propiedades
    initialValues,
    user,
    mutation,

    //* Metodos
    getValidationSchema,
    startCambioPassSubmit,
  };
};
