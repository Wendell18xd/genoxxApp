import {Formik} from 'formik';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import {View} from 'react-native';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {useSearchInspeccion} from '../hooks/useSearchInspeccion';
import CustomDatePicker from '../../../../../components/ui/CustomDatePicker';
import {Text} from 'react-native-paper';

interface Props {
  onClose?: () => void;
}

export const SearchInspeccion = ({onClose}: Props) => {
  const {initialValues, isFetchInspeccion, handleSearch, getValidationSchema} =
    useSearchInspeccion();

  return (
    <View>
      {isFetchInspeccion && <FullScreenLoader transparent />}
      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSearch(values, onClose)}
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
               <View style={{marginBottom: 4}}>
                <Text variant="titleMedium">Rango de fechas</Text>
               </View>
              <View style={{marginBottom: 16}}>
                <CustomDatePicker
                  label="Desde"
                  placeholder="Selecciona una fecha"
                  value={values.txt_bus_fecha_desde}
                  onChange={val => setFieldValue('txt_bus_fecha_desde', val)}
                  error={
                    touched.txt_bus_fecha_desde && !!errors.txt_bus_fecha_desde
                  }
                />
                {touched.txt_bus_fecha_desde && errors.txt_bus_fecha_desde && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.txt_bus_fecha_desde}
                  </Text>
                )}
              </View>

              <CustomDatePicker
                label="Hasta"
                placeholder="Selecciona una fecha"
                value={values.txt_bus_fecha_hasta}
                onChange={val => setFieldValue('txt_bus_fecha_hasta', val)}
                error={
                  touched.txt_bus_fecha_hasta && !!errors.txt_bus_fecha_hasta
                }
              />
              {touched.txt_bus_fecha_hasta && errors.txt_bus_fecha_hasta && (
                <Text style={{color: 'red', marginTop: 4}}>
                  {errors.txt_bus_fecha_hasta}
                </Text>
              )}

              <PrimaryButton
                label="Buscar"
                onPress={() => handleSubmit()}
                debounce
                icon="magnify"
                disabled={isFetchInspeccion}
                loading={isFetchInspeccion}
                style={{marginTop: 16, width: '100%'}}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
