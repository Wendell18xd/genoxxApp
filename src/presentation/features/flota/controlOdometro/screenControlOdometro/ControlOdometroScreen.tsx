import DrawerLayout from '../../../main/layout/DrawerLayout';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import {View} from 'react-native';
import PrimaryButton from '../../../../components/ui/PrimaryButton';
import CustomKeyboardAvoidingView from '../../../../components/ui/CustomKeyboardAvoidingView';
import CustomScrollView from '../../../../components/ui/CustomScrollView';
import {useFormOdometro} from './hooks/useFormOdometro';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import {Formik} from 'formik';
import {formatearFecha} from '../../../../helper/timeUtils';
import {Text} from 'react-native-paper';

const ControlOdometroScreen = () => {
  const {
    initialValues,
    isSaving,
    isLoadingData,
    handleSave,
    handleCamera,
    cantidadFotos,
    formKey,
    getValidationSchema,
  } = useFormOdometro();

  if (isLoadingData) {
    return <FullScreenLoader />;
  }

  return (
    <DrawerLayout title="Control de Odómetro">
      {isSaving && <FullScreenLoader transparent />}
      <Formik
        key={formKey}
        initialValues={initialValues}
        onSubmit={handleSave}
        validationSchema={getValidationSchema}
        enableReinitialize>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <CustomKeyboardAvoidingView>
            <CustomScrollView contentContainerStyle={{padding: 16}}>
              <View style={{marginTop: 8, marginBottom: 8}}>
                <CustomTextInput
                  label={'Número de Patente'}
                  value={values.txt_nro_placa}
                  mode="outlined"
                  editable={false}
                />
              </View>
              <View style={{marginBottom: 8}}>
                <CustomTextInput
                  label={'Próximo Mantenimiento'}
                  value={values.prox_mant}
                  mode="outlined"
                  editable={false}
                />
              </View>
              <View style={{marginBottom: 8}}>
                <CustomTextInput
                  label={'Fecha de Mantenimiento'}
                  value={formatearFecha(values.fecha_prox_mantenimiento)}
                  mode="outlined"
                  editable={false}
                />
              </View>
              <View style={{marginBottom: 8}}>
                <CustomTextInput
                  label={'Dirección / Comentario de Mantenimiento'}
                  value={values.dir_coment}
                  mode="outlined"
                  multiline={true}
                  numberOfLines={5}
                  style={{height: 150}}
                  editable={false}
                />
              </View>
              <View style={{marginBottom: 4}}>
                <CustomTextInput
                  label={'Ingrese kilometraje'}
                  value={values.txt_kilometraje}
                  onChangeText={handleChange('txt_kilometraje')}
                  keyboardType="numeric"
                  mode="outlined"
                  error={touched.txt_kilometraje && !!errors.txt_kilometraje}
                />
                {touched.txt_kilometraje && errors.txt_kilometraje && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.txt_kilometraje}
                  </Text>
                )}
              </View>
              <View style={{marginBottom: 8, marginLeft: 4}}>
                <Text>No debe ser menor al último ingreso</Text>
              </View>
              <View style={{marginBottom: 8}}>
                <CustomTextInput
                  label={'Ingrese un comentario'}
                  value={values.txt_comentario}
                  autoCapitalize="characters"
                  onChangeText={handleChange('txt_comentario')}
                  mode="outlined"
                  multiline={true}
                  numberOfLines={5}
                  style={{height: 150}}
                  error={touched.txt_comentario && !!errors.txt_comentario}
                />
                {touched.txt_comentario && errors.txt_comentario && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.txt_comentario}
                  </Text>
                )}
              </View>
              <PrimaryButton
                label="Grabar"
                onPress={() => handleSubmit()}
                debounce
                icon="content-save"
                disabled={isSaving}
                loading={isSaving}
                style={{marginTop: 16, width: '100%'}}
              />
            </CustomScrollView>
          </CustomKeyboardAvoidingView>
        )}
      </Formik>
      <View
        pointerEvents="box-none"
        style={{
          position: 'absolute',
          bottom: 150,
          right: 40,
          alignItems: 'center',
        }}>
        <CustomFAB
          icon="camera"
          onPress={handleCamera}
          cantidad={cantidadFotos}
          style={{marginTop: 70}}
        />
      </View>
    </DrawerLayout>
  );
};

export default ControlOdometroScreen;
