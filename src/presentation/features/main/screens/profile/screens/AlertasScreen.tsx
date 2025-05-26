import {TextInput} from 'react-native-paper';
import SafeAreaLayout from '../../../layout/SafeAreaLayout';
import {View} from 'react-native';
import {Dropdown} from 'react-native-paper-dropdown';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import {useEffect, useState} from 'react';
import FABAudioBottom from '../Components/FABAudioBottom';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {useMutation, useQuery} from '@tanstack/react-query';
import {mapToDropdown} from '../../../../../../infrastructure/mappers/mapToDropdown';
import {Formik} from 'formik';
import {getAlertas} from '../../../../../../actions/profile/Alertas';
import Toast from 'react-native-toast-message';
import GuardarBottom from '../Components/GuardarBottom';
import {enviarAlerta} from '../../../../../../infrastructure/interfaces/profile/alert/alertas.request';
import {useNavigation} from '@react-navigation/native';

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

export const AlertasScreen = () => {
  const navigation = useNavigation();
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

  if (isFetching) {
    return <FullScreenLoader />;
  }

  const startAlertaSubmit = (
    values: AlertasFromValues,
    resetForm: () => void,
  ) => {
    if (!values.tipo || !values.telefono || !values.comentario) {
      Toast.show({
        type: 'error',
        text1: 'Complete todos los campos',
      });
      return;
    }
    if (values.telefono.length !== 9) {
      Toast.show({
        type: 'error',
        text1: 'El número de teléfono debe tener al menos 9 dígitos',
      });
      return;
    }

    const data = {
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

  return (
    <SafeAreaLayout title="Alertas" isHeader primary>
      <Formik
        initialValues={formValues}
        onSubmit={(values, {resetForm}) => {
          startAlertaSubmit(values, resetForm);
        }}>
        {({values, setFieldValue, handleSubmit}) => (
          <View style={{padding: 8, width: '100%'}}>
            <View style={{marginBottom: 12}}>
              {tipos && (
                <Dropdown
                  label="Tipo"
                  mode="outlined"
                  options={tipos}
                  value={values.tipo}
                  onSelect={val => setFieldValue('tipo', val)}
                />
              )}
            </View>
            <CustomTextInput
              label="Número de teléfono"
              mode="outlined"
              keyboardType="numeric"
              value={values.telefono}
              onChangeText={text => {
                const onlyNumbers = text.replace(/[^0-9]/g, '').slice(0, 9);
                setFieldValue('telefono', onlyNumbers);
              }}
              left={<TextInput.Icon icon="phone" />}
            />
            <CustomTextInput
              placeholder="Comentario"
              mode="outlined"
              value={values.comentario}
              onChangeText={text => setFieldValue('comentario', text)}
              multiline={true}
              numberOfLines={5}
              style={{height: 150, marginTop: 12}}
            />
            <GuardarBottom onPress={handleSubmit} />
            <View>
              <FABAudioBottom />
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaLayout>
  );
};
