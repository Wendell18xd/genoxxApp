import {Formik} from 'formik';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import {View} from 'react-native';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {useSearchConsultaHistoricaPatente} from '../hooks/useSearchConsultaHistoricaPatente';
import {Text, TextInput} from 'react-native-paper';
import {CustomDropdownInput} from '../../../../../components/ui/CustomDropdownInput';

interface Props {
  onClose?: (tipoSeleccionado: 'PERS' | 'PLACA') => void;
}

export const SearchConsultaHistoricaPatente = ({onClose}: Props) => {
  const {
    tiposBusqueda,
    initialValues,
    isFetchConsultaHistoricaPatente,
    handleSearch,
    handleSelectPatente,
    handleSelectPersonal,
    getValidationSchema,
  } = useSearchConsultaHistoricaPatente();
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
                  }}
                />
              </View>

               <CustomTextInput
                label="Buscar"
                mode="outlined"
                value={values.cbo_bus_tipo === 'PERS' ? values.personal : values.patente}
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
                      if (values.cbo_bus_tipo === 'PLACA') {
                        handleSelectPatente(values.patente, setFieldValue);
                      } else if (values.cbo_bus_tipo === 'PERS') {
                        handleSelectPersonal(values.personal, setFieldValue);
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
