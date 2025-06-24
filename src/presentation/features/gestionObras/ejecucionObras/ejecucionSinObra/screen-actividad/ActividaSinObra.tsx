import {ScrollView, View} from 'react-native';
import DrawerLayout from '../../../../main/layout/DrawerLayout';
import {globalColors} from '../../../../../styles/globalStyle';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {Formik} from 'formik';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import {CustomDropdownInput} from '../../../../../components/ui/CustomDropdownInput';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import {useActividadSinObra} from './hooks/useActividadSinObra';
import CustomTimePicker from '../../../../../components/ui/CustomTimePicker';
import {TurnoSelector} from './components/TurnoSelector';
import {useEffect} from 'react';
import {CustomFAB} from '../../../../../components/ui/CustomFAB';
import {formatTiempo} from '../../../../../helper/timeUtils';
import {CustomCardContent} from '../../../../../components/ui/CustomCardContent';
import {Text} from 'react-native-paper';
import CustomKeyboardAvoidingView from '../../../../../components/ui/CustomKeyboardAvoidingView';

export const ActividaSinObra = () => {
  const {
    initialValues,
    actividades,
    situacion,
    tiempo,
    saving,
    saveActividad,
    isSaving,
    loading,
    selectActividad,
    handleSave,
    getValidationSchema,
    start,
    reset,
    handleActividadChange,
  } = useActividadSinObra();

  useEffect(() => {
    start();
    return () => reset();
  }, []);

  return (
    <DrawerLayout
      title={
        saveActividad.length > 0 ? 'Finalizar actividad' : 'Iniciar actividad'
      }>
      {saving && <FullScreenLoader transparent message="Guardando" />}
      {isSaving && <FullScreenLoader transparent message="Grabando" />}
      {loading && <FullScreenLoader />}

      <CustomKeyboardAvoidingView keyboardVerticalOffset={80}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSave}
          validationSchema={() => getValidationSchema(saveActividad)}
          enableReinitialize>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <ScrollView
              contentContainerStyle={{flexGrow: 1, padding: 16}}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <View
                style={{
                  pointerEvents: saveActividad.length > 0 ? 'none' : 'auto',
                }}>
                <TurnoSelector
                  value={values.turno}
                  onChange={val => setFieldValue('turno', val)}
                />
                {touched.turno && errors.turno && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.turno}
                  </Text>
                )}
              </View>

              <View style={{marginTop: 8}}>
                <CustomDropdownInput
                  label="Actividad"
                  options={actividades || []}
                  value={values.actividad}
                  onSelect={val => handleActividadChange(setFieldValue, val)}
                  error={touched.actividad && !!errors.actividad}
                  disabled={saveActividad.length > 0}
                />
                {touched.actividad && errors.actividad && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.actividad}
                  </Text>
                )}
              </View>

              <View style={{marginTop: 8, flexDirection: 'row', gap: 8}}>
                <View style={{flex: 0.5}}>
                  <CustomTimePicker
                    label="Hora de inicio"
                    value={values.hora_inicio}
                    onChange={hora => setFieldValue('hora_inicio', hora)}
                    error={touched.hora_inicio && !!errors.hora_inicio}
                    disabled={saveActividad.length > 0}
                  />
                  {touched.hora_inicio && errors.hora_inicio && (
                    <Text style={{color: 'red', marginTop: 4}}>
                      {errors.hora_inicio}
                    </Text>
                  )}
                </View>

                {saveActividad.length > 0 && (
                  <View style={{flex: 0.5}}>
                    <CustomTimePicker
                      label="Hora final"
                      value={values.hora_final}
                      onChange={hora => setFieldValue('hora_final', hora)}
                      error={touched.hora_final && !!errors.hora_final}
                    />
                    {touched.hora_final && errors.hora_final && (
                      <Text style={{color: 'red', marginTop: 4}}>
                        {errors.hora_final}
                      </Text>
                    )}
                  </View>
                )}
              </View>

              <View style={{marginTop: 8}}>
                <CustomDropdownInput
                  label="Situacion"
                  options={situacion || []}
                  value={values.situacion}
                  onSelect={val => setFieldValue('situacion', val)}
                  error={touched.situacion && !!errors.situacion}
                  disabled={saveActividad.length > 0}
                />
                {touched.situacion && errors.situacion && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.situacion}
                  </Text>
                )}
              </View>

              <View style={{marginTop: 16}}>
                <CustomTextInput
                  placeholder="Observación"
                  mode="outlined"
                  autoCapitalize="characters"
                  value={values.observacion}
                  onChangeText={handleChange('observacion')}
                  onBlur={handleBlur('observacion')}
                  numberOfLines={3}
                  multiline
                  maxLength={250}
                  height={120}
                  error={touched.observacion && !!errors.observacion}
                />
                {touched.observacion && errors.observacion && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.observacion}
                  </Text>
                )}
              </View>

              <View style={{marginTop: 16}}>
                <PrimaryButton
                  debounce
                  label={
                    saveActividad.length > 0
                      ? 'Finalizar actividad'
                      : 'Iniciar actividad'
                  }
                  icon="content-save"
                  style={{width: '100%'}}
                  disabled={saving}
                  loading={saving}
                  onPress={handleSubmit}
                />
              </View>

              {selectActividad?.descripcion && (
                <CustomCardContent
                  style={{
                    marginTop: 16,
                    borderColor: globalColors.primary,
                    borderWidth: 1,
                  }}
                  mode="outlined">
                  <Text variant="labelMedium" style={{fontWeight: 'bold'}}>
                    LA ACTIVIDAD CORRESPONDE A:
                  </Text>
                  <Text variant="labelSmall">
                    {selectActividad?.descripcion}
                  </Text>
                </CustomCardContent>
              )}
            </ScrollView>
          )}
        </Formik>
      </CustomKeyboardAvoidingView>

      <CustomFAB
        icon="timer"
        label={formatTiempo(tiempo)}
        fabStyle={{backgroundColor: globalColors.primary}}
        style={{bottom: 32, right: 16}}
      />
    </DrawerLayout>
  );
};
