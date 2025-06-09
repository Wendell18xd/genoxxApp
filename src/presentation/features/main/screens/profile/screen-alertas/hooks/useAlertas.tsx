import {useQuery, useMutation} from '@tanstack/react-query';
import {useState, useEffect, useRef} from 'react';
import Toast from 'react-native-toast-message';
import {mapToDropdown} from '../../../../../../../infrastructure/mappers/mapToDropdown';
import {useAuthStore} from '../../../../../../store/auth/useAuthStore';
import * as Yup from 'yup';
import {
  enviarAlerta,
  getAlertas,
} from '../../../../../../../actions/profile/Alertas/Alertas';
import {useFotosStore} from '../../../../../foto/store/useFotosStore';
import {useNavigation} from '@react-navigation/native';
import {useLocationStore} from '../../../../../../store/location/useLocationStore';

interface AlertasFromValues {
  nom_audio: string;
  tipo: string;
  telefono: string;
  comentario: string;
}

const initialValues: AlertasFromValues = {
  tipo: '',
  telefono: '',
  comentario: '',
  nom_audio: '',
};

export const getAlertValidationSchema = Yup.object().shape({
  tipo: Yup.string().required('Seleccione un tipo de alerta'),
  telefono: Yup.string().required('Ingrese un número de teléfono'),
  comentario: Yup.string().required('Ingrese un comentario'),
});

export const useAlertas = () => {
  const {user} = useAuthStore();
  const [formValues] = useState<AlertasFromValues>(initialValues);
  const {fotos, onReset} = useFotosStore();
  const onResetRef = useRef(() => {});
  const navigation = useNavigation();
  const {getLocation} = useLocationStore();

  const {
    data: tipos,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['alertas'],
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
      onResetRef.current();
      onReset();
      navigation.goBack();
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Error al enviar alerta',
        text2: error.message,
      });
    },
  });

  const startAlertaSubmit = async (
    values: AlertasFromValues,
    resetForm: () => void,
    audioBase64?: string,
  ) => {
    onResetRef.current = resetForm;
    const location = await getLocation();
    const data = {
      vg_empr_codigo: user?.empr_codigo || '',
      vg_usua_codigo: user?.usua_codigo || '',
      vg_usua_perfil: user?.usua_perfil || '',
      txt_tipo: values.tipo,
      txt_telefono: values.telefono,
      txt_audio: audioBase64 || '',
      txt_comentario: values.comentario,
      vl_fotos: fotos.map(foto => foto.foto),
      vl_coord_x: location?.latitude?.toString() || '',
      vl_coord_y: location?.longitude?.toString() || '',
    };
    mutation.mutate(data);
  };

  return {
    //* Propiedades
    formValues,
    tipos,
    isFetching,
    initialValues,
    mutation,

    //* Metodos
    startAlertaSubmit,
    getAlertValidationSchema,
  };
};
