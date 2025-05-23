import {Formik} from 'formik';
import {Text} from 'react-native-paper';
import {useSarchObras} from '../hooks/useSarchObras';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import {View} from 'react-native';
import {CustomDropdownInput} from '../../../../../components/ui/CustomDropdownInput';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';

export const SearchObras = () => {
  const {
    tiposBusqueda,
    initialValues,
    proyectos,
    isFetchProyecto,
    isFetchObras,
    handleSearch,
    getValidationSchema,
  } = useSarchObras();

  if (isFetchProyecto) {
    return <FullScreenLoader />;
  }

  return (
    <View>
      {isFetchObras && <FullScreenLoader transparent />}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSearch}
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
            <View>
              <View>
                <CustomDropdownInput
                  label="Seleccione Proyecto"
                  options={proyectos || []}
                  value={values.cbo_proy_codigo}
                  onSelect={val => setFieldValue('cbo_proy_codigo', val)}
                  error={touched.cbo_proy_codigo && !!errors.cbo_proy_codigo}
                />
                {touched.cbo_proy_codigo && errors.cbo_proy_codigo && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.cbo_proy_codigo}
                  </Text>
                )}
              </View>
              <View style={{marginTop: 8, flexDirection: 'row', gap: 8}}>
                <View style={{flex: 0.4}}>
                  <CustomDropdownInput
                    label="Tipo búsqueda"
                    options={tiposBusqueda}
                    value={values.cbo_tipo}
                    onSelect={val => setFieldValue('cbo_tipo', val)}
                  />
                </View>
                <View style={{flex: 0.6}}>
                  <CustomTextInput
                    label="Buscar"
                    mode="outlined"
                    value={values.txt_busqueda}
                    onChangeText={handleChange('txt_busqueda')}
                    onBlur={handleBlur('txt_busqueda')}
                    error={touched.txt_busqueda && !!errors.txt_busqueda}
                  />
                </View>
              </View>

              <PrimaryButton
                label="Buscar"
                onPress={() => handleSubmit()}
                debounce
                icon="magnify"
                disabled={isFetchObras}
                loading={isFetchObras}
                style={{marginTop: 8, width: '100%'}}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
