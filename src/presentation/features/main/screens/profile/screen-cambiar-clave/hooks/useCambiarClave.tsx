import {useMutation} from '@tanstack/react-query';
import {useAuthStore} from '../../../../../../store/auth/useAuthStore';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {isPasswordValid} from '../../../../../../helper/utils';

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

export const useCambiarClave = () => {
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

  return {
    //* Propiedades
    initialValues,
    mutation,

    //* Metodos
    getValidationSchema,
    startCambioPassSubmit,
  };
};
