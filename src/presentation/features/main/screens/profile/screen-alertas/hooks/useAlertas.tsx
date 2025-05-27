import {useNavigation} from '@react-navigation/native';
import {useQuery, useMutation} from '@tanstack/react-query';
import {useState, useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {mapToDropdown} from '../../../../../../../infrastructure/mappers/mapToDropdown';
import {useAuthStore} from '../../../../../../store/auth/useAuthStore';
import * as Yup from 'yup';
import { enviarAlerta, getAlertas } from '../../../../../../../actions/profile/Alertas/Alertas';

interface AlertasFromValues {
  tipo: string;
  telefono: string;
  comentario: string;
}

const initialValues: AlertasFromValues = {
  tipo: '',
  telefono: '',
  comentario: '',
};

export const getAlertValidationSchema = Yup.object().shape({
  tipo: Yup.string().required('Seleccione un tipo de alerta'),
  telefono: Yup.string()
    .required('Ingrese un número de teléfono'),
  comentario: Yup.string().required('Ingrese un comentario'),
});

export const useAlertas = () => {
  const navigation = useNavigation();
  const {user} = useAuthStore();
  const [formValues] = useState<AlertasFromValues>(initialValues);

  const {
    data: tipos,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['alertas'],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const resp = await getAlertas();
      return mapToDropdown(resp.datos, 'nom_para', 'cod_para');
    },
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, []);

  const mutation = useMutation({
    mutationFn: enviarAlerta,
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Alerta enviada correctamente',
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Error al enviar alerta',
        text2: error.message,
      });
    },
  });

  const startAlertaSubmit = (
    values: AlertasFromValues,
    resetForm: () => void,
  ) => {
    const data = {
      vg_empr_codigo: user?.empr_codigo || '',
      vg_usua_codigo: user?.usua_codigo || '',
      txt_trab_codigo: user?.usua_perfil || '',
      txt_tipo: values.tipo,
      txt_telefono: values.telefono,
      txt_comentario: values.comentario,
    };
    mutation.mutate(data, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Alerta enviada correctamente',
        });
        resetForm();
        navigation.goBack();
      },
    });
  };

  return {
    formValues,
    tipos,
    isFetching,
    startAlertaSubmit,
    initialValues,
    getAlertValidationSchema,
  };
};
