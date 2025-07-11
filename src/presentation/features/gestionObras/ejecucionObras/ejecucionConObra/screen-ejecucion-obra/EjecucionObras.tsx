import {View} from 'react-native';
import {globalStyle} from '../../../../../styles/globalStyle';
import {Formik} from 'formik';
import {useEjecucionObras} from './hooks/useEjecucionObras';
import {CustomDropdownInput} from '../../../../../components/ui/CustomDropdownInput';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import {Text} from 'react-native-paper';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import {CustomFAB} from '../../../../../components/ui/CustomFAB';
import {mostrarSiNoCero} from '../../../../../helper/utils';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import CustomScrollView from '../../../../../components/ui/CustomScrollView';
import CustomKeyboardAvoidingView from '../../../../../components/ui/CustomKeyboardAvoidingView';

export const EjecucionObras = () => {
  const {
    mapDropFamilia,
    mapDropSubFamilia,
    mapDropActividad,
    initialValues,
    medida,
    isSaving,
    cantidadFotos,
    handelSelectedDropDown,
    handleChangeCantidad,
    handleSave,
    handleCamera,
    getValidationSchema,
  } = useEjecucionObras();

  return (
    <View style={globalStyle.defaultContainer}>
      {isSaving && <FullScreenLoader transparent />}

      <CustomKeyboardAvoidingView keyboardVerticalOffset={130}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSave}
          validationSchema={getValidationSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <CustomScrollView>
              <View>
                <CustomDropdownInput
                  label="Tipo registro"
                  options={mapDropFamilia || []}
                  value={values.tipo_registro}
                  onSelect={val =>
                    handelSelectedDropDown(
                      'tipo_registro',
                      val,
                      setFieldValue,
                      values,
                    )
                  }
                  error={touched.tipo_registro && !!errors.tipo_registro}
                />
                {touched.tipo_registro && errors.tipo_registro && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.tipo_registro}
                  </Text>
                )}
              </View>
              <View style={{marginTop: 8}}>
                <CustomDropdownInput
                  label="Agrupación"
                  options={mapDropSubFamilia || []}
                  value={values.agrupacion}
                  onSelect={val =>
                    handelSelectedDropDown(
                      'agrupacion',
                      val,
                      setFieldValue,
                      values,
                    )
                  }
                  error={touched.agrupacion && !!errors.agrupacion}
                />
                {touched.agrupacion && errors.agrupacion && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.agrupacion}
                  </Text>
                )}
              </View>
              <View style={{marginTop: 8}}>
                <CustomDropdownInput
                  label="Actividad"
                  options={mapDropActividad || []}
                  value={values.actividad}
                  onSelect={val =>
                    handelSelectedDropDown(
                      'actividad',
                      val,
                      setFieldValue,
                      values,
                    )
                  }
                  error={touched.actividad && !!errors.actividad}
                />

                {touched.actividad && errors.actividad && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.actividad}
                  </Text>
                )}
              </View>
              <View style={{marginTop: 8, flexDirection: 'row', gap: 8}}>
                <View style={{flex: 0.5}}>
                  <CustomTextInput
                    label="Tramo"
                    mode="outlined"
                    keyboardType="decimal-pad"
                    value={mostrarSiNoCero(values.tramo.toString())}
                    onChangeText={val =>
                      handleChangeCantidad(val, setFieldValue, 'tramo')
                    }
                    onBlur={handleBlur('tramo')}
                    error={touched.tramo && !!errors.tramo}
                  />
                  {touched.tramo && errors.tramo && (
                    <Text style={{color: 'red', marginTop: 4}}>
                      {errors.tramo}
                    </Text>
                  )}
                </View>
                <View style={{flex: 0.5}}>
                  <CustomTextInput
                    label={'Cantidad' + (medida ? ` (${medida})` : '')}
                    mode="outlined"
                    keyboardType="decimal-pad"
                    value={mostrarSiNoCero(values.cantidad.toString())}
                    onChangeText={val =>
                      handleChangeCantidad(val, setFieldValue, 'cantidad')
                    }
                    onBlur={handleBlur('cantidad')}
                    error={touched.cantidad && !!errors.cantidad}
                  />
                  {touched.cantidad && errors.cantidad && (
                    <Text style={{color: 'red', marginTop: 4}}>
                      {errors.cantidad}
                    </Text>
                  )}
                </View>
              </View>
              <View style={{marginTop: 16}}>
                <CustomTextInput
                  placeholder="Comentario"
                  mode="outlined"
                  autoCapitalize="characters"
                  value={values.comentario}
                  onChangeText={handleChange('comentario')}
                  onBlur={handleBlur('comentario')}
                  numberOfLines={3}
                  multiline
                  style={{height: 150}}
                  error={touched.comentario && !!errors.comentario}
                />
                {touched.comentario && errors.comentario && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.comentario}
                  </Text>
                )}
              </View>
              <View style={{marginTop: 16}}>
                <PrimaryButton
                  debounce
                  label="Enviar"
                  icon="content-save"
                  style={{width: '100%'}}
                  disabled={isSaving}
                  loading={isSaving}
                  onPress={handleSubmit}
                />
              </View>
            </CustomScrollView>
          )}
        </Formik>
      </CustomKeyboardAvoidingView>

      <CustomFAB
        icon="camera"
        onPress={handleCamera}
        cantidad={cantidadFotos}
        style={{right: 16, bottom: 16}}
      />
    </View>
  );
};
