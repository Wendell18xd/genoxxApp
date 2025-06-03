import {Formik} from 'formik';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import {View} from 'react-native';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {useSearchConsultaHistoricaPatente} from '../hooks/useSearchConsultaHistoricaPatente';
import {Text, TextInput} from 'react-native-paper';
import {CustomDropdownInput} from '../../../../../components/ui/CustomDropdownInput';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ConsultaHistoricaPatenteStackParam} from '../../navigations/ConsultaHistoricaPatenteStackNavigation';

interface Props {
  onClose?: (tipoSeleccionado: 'PERS' | 'PLACA') => void;
  onTipoBusquedaChange?: (tipo: 'PERS' | 'PLACA') => void;
}

export const SearchConsultaHistoricaPatente = ({
  onClose,
  onTipoBusquedaChange,
}: Props) => {
  const {
    tiposBusqueda,
    initialValues,
    isFetchConsultaHistoricaPatente,
    handleSearch,
    getValidationSchema,
    setCodDestinatario,
    setOnSelectPersonal,
    setOnSelectPatente,
  } = useSearchConsultaHistoricaPatente();

  const navigation =
    useNavigation<NavigationProp<ConsultaHistoricaPatenteStackParam>>();

  return (
    <View>
      {isFetchConsultaHistoricaPatente && <FullScreenLoader transparent />}
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          handleSearch(values, () => {
            if (onClose) {
              if (
                values.cbo_bus_tipo === 'PERS' ||
                values.cbo_bus_tipo === 'PLACA'
              ) {
                onClose(values.cbo_bus_tipo);
              }
            }
          });
        }}
        validationSchema={getValidationSchema}>
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
                    if (
                      onTipoBusquedaChange &&
                      (val === 'PERS' || val === 'PLACA')
                    ) {
                      onTipoBusquedaChange(val);
                    }
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
                    icon={
                      values.txt_cod_destinatario &&
                      values.txt_cod_destinatario.length > 0
                        ? 'close'
                        : 'magnify'
                    }
                    onPress={() => {
                      if (
                        values.txt_cod_destinatario &&
                        values.txt_cod_destinatario.length > 0
                      ) {
                        setFieldValue('txt_cod_destinatario', '');
                        setCodDestinatario('');
                      } else {
                        if (
                          values.cbo_bus_tipo === 'PERS' ||
                          values.cbo_bus_tipo === undefined
                        ) {
                          setOnSelectPersonal(personal => {
                            setFieldValue(
                              'txt_cod_destinatario',
                              `${personal.cod_para} - ${personal.nom_para}`,
                            );
                            setCodDestinatario(personal.cod_para);
                          });
                          navigation.navigate('BuscadorPersonalScreen');
                        } else if (values.cbo_bus_tipo === 'PLACA') {
                          setOnSelectPatente(patente => {
                            setFieldValue(
                              'txt_cod_destinatario',
                              `${patente.cod_para} - ${patente.nom_para}`,
                            );
                            setCodDestinatario(patente.cod_para);
                          });
                          navigation.navigate('BuscadorPatenteScreen');
                        }
                      }
                    }}
                  />
                }
                error={
                  touched.txt_cod_destinatario && !!errors.txt_cod_destinatario
                }
                style={{width: '100%'}}
              />
               {touched.txt_cod_destinatario && errors.txt_cod_destinatario && (
                  <Text style={{color: 'red', marginBottom: 4}}>
                    {errors.txt_cod_destinatario}
                  </Text>
                )}

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
