import {Formik} from 'formik';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import {View} from 'react-native';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {useSearchInspeccion} from '../hooks/useSearchInspeccion';
import {Text} from 'react-native-paper';
import CustomDateRangePicker from '../../../../../components/ui/CustomDateRangePicker';
import CustomScrollView from '../../../../../components/ui/CustomScrollView';
interface Props {
  onClose?: () => void;
}

export const SearchInspeccion = ({onClose}: Props) => {
  const {initialValues, isFetchInspeccion, handleSearch} =
    useSearchInspeccion();

  return (
    <View>
      {isFetchInspeccion && <FullScreenLoader transparent />}
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
            <CustomScrollView>
                <View style={{marginBottom: 16}}>
                  <CustomTextInput
                    label="Ingrese el número de placa"
                    mode="outlined"
                    value={values.txt_nro_placa}
                    onChangeText={handleChange('txt_nro_placa')}
                    onBlur={handleBlur('txt_nro_placa')}
                    error={touched.txt_nro_placa && !!errors.txt_nro_placa}
                    style={{width: '100%'}}
                  />
                  {touched.txt_nro_placa && errors.txt_nro_placa && (
                    <Text style={{color: 'red', marginTop: 4}}>
                      {errors.txt_nro_placa}
                    </Text>
                  )}
                </View>
                <CustomDateRangePicker
                  label="Rango de fechas"
                  desde={values.txt_bus_fecha_desde}
                  hasta={values.txt_bus_fecha_hasta}
                  onChange={(start, end) => {
                    setFieldValue('txt_bus_fecha_desde', start);
                    setFieldValue('txt_bus_fecha_hasta', end);
                  }}
                  error={
                    (touched.txt_bus_fecha_desde &&
                      !!errors.txt_bus_fecha_desde) ||
                    (touched.txt_bus_fecha_hasta &&
                      !!errors.txt_bus_fecha_hasta)
                  }
                />
                <PrimaryButton
                  label="Buscar"
                  onPress={() => handleSubmit()}
                  debounce
                  icon="magnify"
                  disabled={isFetchInspeccion}
                  loading={isFetchInspeccion}
                  style={{marginTop: 16, width: '100%'}}
                />
            </CustomScrollView>
          );
        }}
      </Formik>
    </View>
  );
};
