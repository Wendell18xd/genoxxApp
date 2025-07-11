import {View} from 'react-native';
import {CustomDropdownInput} from '../../../../../components/ui/CustomDropdownInput';
import {useLiquiMatATC} from '../hooks/useLiquiMatATC';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {Formik} from 'formik';
import {Text, TextInput} from 'react-native-paper';
import CustomDateCalendarPicker from '../../../../../components/ui/CustomDateCalendarPicker';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';

interface Props {
  onClose?: () => void;
}

export const SearchLiquiATC = ({onClose}: Props) => {
  const {initialValues, proyectos, isFetchingProyectos, handleSearch} =
    useLiquiMatATC();
  return (
    <View>
      {isFetchingProyectos && <FullScreenLoader transparent />}
      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSearch(values, onClose)}>
        {({setFieldValue, values, errors, touched, handleSubmit}) => {
          return (
            <View style={{padding: 8}}>
              <View style={{marginBottom: 16}}>
                <CustomDropdownInput
                  label="Seleccione Proyecto"
                  options={proyectos || []}
                  value={values.proyecto}
                  onSelect={val => {
                    setFieldValue('proyecto', val);
                  }}
                  error={touched.proyecto && !!errors.proyecto}
                  loading={!proyectos && isFetchingProyectos}
                  disabled={!proyectos && isFetchingProyectos}
                />
                {touched.proyecto && errors.proyecto && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.proyecto}
                  </Text>
                )}
              </View>
              <View style={{marginBottom: 16}}>
                <CustomDateCalendarPicker
                  label="Fecha de Liquidación"
                  placeholder="Seleccione la fecha"
                  value={values.fechaLiquidacion}
                  onChange={val => setFieldValue('fechaLiquidacion', val)}
                  error={touched.fechaLiquidacion && !!errors.fechaLiquidacion}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  marginBottom: 8,
                }}>
                <View style={{width: 180}}>
                  <CustomDropdownInput
                    label="Tipo de Liquidación"
                    mode="outlined"
                    options={[
                      {label: 'Solicitud', value: 'Solicitud'},
                      {label: 'Petición', value: 'Petición'},
                    ]}
                    value={values.tipoLiquidacion}
                    onSelect={val => setFieldValue('tipoLiquidacion', val)}
                  />
                </View>

                {values.tipoLiquidacion === 'Solicitud' && (
                  <View style={{width: 180}}>
                    <CustomTextInput
                      label="Número de Solicitud"
                      mode="outlined"
                      autoCapitalize="characters"
                      value={values.nroSolicitud}
                      onChangeText={val => setFieldValue('nroSolicitud', val)}
                      error={touched.nroSolicitud && !!errors.nroSolicitud}
                      left={<TextInput.Icon icon="text-box-outline" />}
                    />
                  </View>
                )}

                {values.tipoLiquidacion === 'Petición' && (
                  <View style={{width: 180}}>
                    <CustomTextInput
                      label="Número de Petición"
                      mode="outlined"
                      autoCapitalize="characters"
                      value={values.nroPeticion}
                      onChangeText={val => setFieldValue('nroPeticion', val)}
                      error={touched.nroPeticion && !!errors.nroPeticion}
                      left={<TextInput.Icon icon="text-box-outline" />}
                    />
                  </View>
                )}
              </View>
              <PrimaryButton
                label="Buscar"
                onPress={() => handleSubmit()}
                debounce
                icon="magnify"
                disabled={isFetchingProyectos}
                loading={isFetchingProyectos}
                style={{marginTop: 16, width: '100%'}}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
