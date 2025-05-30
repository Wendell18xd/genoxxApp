import {Formik} from 'formik';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import {View} from 'react-native';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {useSearchConsultaHistoricaPatente} from '../hooks/useSearchConsultaHistoricaPatente';
import {TextInput} from 'react-native-paper';
import {CustomDropdownInput} from '../../../../../components/ui/CustomDropdownInput';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ConsultaHistoricaPatenteStackParam} from '../../navigations/ConsultaHistoricaPatenteStackNavigation';
import {usePersonalStore} from '../../../../buscadores/buscador-conductor/store/usePersonal';
import {usePatenteStore} from '../../../../buscadores/buscador-patente/store/usePatente';

interface Props {
  onClose?: () => void;
}

export const SearchConsultaHistoricaPatente = ({onClose}: Props) => {
  const {
    tiposBusqueda,
    initialValues,
    isFetchConsultaHistoricaPatente,
    handleSearch,
    setCodDestinatario,
  } = useSearchConsultaHistoricaPatente();

  const navigation =
    useNavigation<NavigationProp<ConsultaHistoricaPatenteStackParam>>();

  return (
    <View>
      {isFetchConsultaHistoricaPatente && <FullScreenLoader transparent />}
      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSearch(values, onClose)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => {
          return (
            <View style={{padding: 8}}>
              <View style={{marginBottom: 16}}>
                <CustomDropdownInput
                  label="Tipo de búsqueda"
                  options={tiposBusqueda}
                  value={values.cbo_bus_tipo}
                  onSelect={val => {
                    setFieldValue('cbo_bus_tipo', val);
                    setFieldValue('txt_cod_destinatario', '');
                    setCodDestinatario('');
                  }}
                />
              </View>
              <CustomTextInput
                label="Buscar"
                mode="outlined"
                value={values.txt_cod_destinatario}
                onChangeText={handleChange('txt_cod_destinatario')}
                onBlur={handleBlur('txt_cod_destinatario')}
                editable={false}
                right={
                  <TextInput.Icon
                    icon="magnify"
                    onPress={() => {
                      if (values.cbo_bus_tipo === 'PERS') {
                        usePersonalStore.getState().setOnSelect(personal => {
                          setFieldValue(
                            'txt_cod_destinatario',
                            `${personal.cod_para} - ${personal.nom_para}`,
                          );
                          setCodDestinatario(personal.cod_para);
                        });
                        navigation.navigate('BuscadorPersonalScreen');
                      } else if (values.cbo_bus_tipo === 'PLACA') {
                        usePatenteStore.getState().setOnSelect(patente => {
                          setFieldValue(
                            'txt_cod_destinatario',
                            `${patente.nro_placa}`,
                          );
                          setCodDestinatario(patente.nro_placa);
                        });
                        navigation.navigate('BuscadorPatenteScreen');
                      }
                    }}
                  />
                }
                error={
                  touched.txt_cod_destinatario && !!errors.txt_cod_destinatario
                }
                style={{width: '100%'}}
              />

              <PrimaryButton
                label="Buscar"
                onPress={() => handleSubmit()}
                debounce
                icon="magnify"
                disabled={isFetchConsultaHistoricaPatente}
                loading={isFetchConsultaHistoricaPatente}
                style={{marginTop: 16, width: '100%'}}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
