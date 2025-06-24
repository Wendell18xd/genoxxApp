import {useState} from 'react';
import {Option} from 'react-native-paper-dropdown';
import {useAuthStore} from '../../../store/auth/useAuthStore';
import * as Yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {mapToDropdown} from '../../../../infrastructure/mappers/mapToDropdown';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParam} from '../../../navigations/AuthStackNavigation';
import {StorageAdapter} from '../../../adapter/storage-adapter';

interface LoginFormValues {
  usuario: string;
  contrasena: string;
  empresa: string;
  recordar: boolean;
}

const initialValues: LoginFormValues = {
  usuario: '',
  contrasena: '',
  empresa: '',
  recordar: false,
};

export const useLogin = () => {
  const [formValues, setFormValues] = useState<LoginFormValues>(initialValues);
  const [empresas, setEmpresas] = useState<Option[]>();
  const [disabled, setDisabled] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const {login} = useAuthStore();
  const navigation =
    useNavigation<NavigationProp<AuthStackParam, 'LoginScreen'>>();

  const getLoginSchema = (arrEmpresas: Option[] | undefined) =>
    Yup.object().shape({
      usuario: Yup.string().required('Requerido'),
      contrasena: Yup.string().required('Requerido'),
      empresa: Yup.string().when([], {
        is: () => arrEmpresas && arrEmpresas.length > 0,
        then: schema => schema.required('Seleccione una empresa'),
        otherwise: schema => schema.notRequired(),
      }),
    });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async data => {
      const {estado} = data.datos;

      if (estado === 1) {
        /* Toast.show({
          type: 'success',
          text1: 'Bienvenido al sistema',
        }); */
        navigateToMenu();
      } else if (estado === 0) {
        Toast.show({
          type: 'error',
          text1: 'Login fallido',
          text2: 'Credenciales incorrectas',
        });
      } else if (estado === 2) {
        Toast.show({
          type: 'error',
          text1: 'Login fallido',
          text2: 'Usuario de baja',
        });
      } else if (estado === 3) {
        navigation.navigate('CambioPassScreen');
      } else if (estado === 4) {
        Toast.show({
          type: 'error',
          text1: 'Login fallido',
          text2: 'No cuentas con empresa asignada',
        });
      } else if (estado === 5) {
        const arrEmpresa = data.datos.empresas;

        if (arrEmpresa.length > 0) {
          if (arrEmpresa.length === 1) {
            setFormValues({
              ...formValues,
              empresa: arrEmpresa[0].empr_codigo,
            });
            startLoginSubmit(formValues);
          } else {
            const options = mapToDropdown(
              data.datos.empresas,
              'empr_nombre',
              'empr_codigo',
            );
            setEmpresas(options);
            setDisabled(true);
          }
        } else {
          navigateToMenu();
        }
      }
    },
    onError: error => {
      console.error('Error al obtener versión:', error);
      Toast.show({
        type: 'error',
        text1: 'Login fallido',
        text2: error.message,
      });
    },
  });

  const startLoginSubmit = (values: LoginFormValues) => {
    const loginData = {
      usuaCodigo: values.usuario,
      usuaClave: values.contrasena,
      emprCodigo: values.empresa,
      recorded: values.recordar,
    };

    loginMutation.mutate(loginData);
  };

  const navigateToMenu = async () => {
    navigation.navigate('MainStackNavigation');
    setDisabled(false);
    setEmpresas([]);
    setFormValues(initialValues);
    loadUser();
  };

  const loadUser = async () => {
    const user = await StorageAdapter.getItem('usuario');
    if (user) {
      const parsedUser = JSON.parse(user);
      setFormValues({
        usuario: parsedUser.usua_codigo,
        contrasena: parsedUser.usua_clave,
        empresa: '',
        recordar: parsedUser.recorded,
      });
    }
    setLoadingUser(false);
  };

  return {
    //* Propiedades
    empresas,
    disabled,
    loadingUser,
    navigation,
    formValues,
    loginMutation,

    //* Metodos
    getLoginSchema,
    loadUser,
    startLoginSubmit,
  };
};
