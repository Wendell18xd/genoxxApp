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

interface Props {
  onClose?: () => void;
}

export const SearchConsultaHistoricaPatente = ({onClose}: Props) => {
  const {
    tiposBusqueda,
    initialValues,
    isFetchConsultaHistoricaPatente,
    handleSearch,
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
              <CustomDropdownInput
                label="Tipo de búsqueda"
                options={tiposBusqueda}
                value={values.cbo_bus_tipo}
                onSelect={val => setFieldValue('cbo_bus_tipo', val)}
              />
              <CustomTextInput
                label="Buscar"
                mode="outlined"
                value={values.txt_codigo}
                onChangeText={handleChange('txt_codigo')}
                onBlur={handleBlur('txt_codigo')}
                editable={false}
                right={
                  <TextInput.Icon
                    icon="magnify"
                    onPress={() => {
                      if (values.cbo_bus_tipo === 'PERS') {
                        navigation.navigate('BuscadorPersonalScreen');
                      } else if (values.cbo_bus_tipo === 'PLACA') {
                        navigation.navigate('BuscadorPatenteScreen');
                      }
                    }}
                  />
                }
                error={touched.txt_codigo && !!errors.txt_codigo}
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
