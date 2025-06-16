import {Text, View} from 'react-native';
import DrawerLayout from '../../../../main/layout/DrawerLayout';
import {globalColors, globalStyle} from '../../../../../styles/globalStyle';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {Formik} from 'formik';
import CustomScrollView from '../../../../../components/ui/CustomScrollView';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import {CustomDropdownInput} from '../../../../../components/ui/CustomDropdownInput';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import {useActividadSinObra} from './hooks/useActividadSinObra';
import CustomTimePicker from '../../../../../components/ui/CustomTimePicker';
import {TurnoSelector} from './components/TurnoSelector';
import {useEffect} from 'react';
import {CustomFAB} from '../../../../../components/ui/CustomFAB';
import {formatTiempo} from '../../../../../helper/timeUtils';

export const ActividaSinObra = () => {
  const {
    initialValues,
    actividades,
    situacion,
    tiempo,
    handleSave,
    getValidationSchema,
    start,
    reset,
  } = useActividadSinObra();

  useEffect(() => {
    start();
    return () => reset();
  }, []);

  return (
    <DrawerLayout title="Iniciar Actividad">
      <View style={globalStyle.defaultContainer}>
        {false && <FullScreenLoader transparent />}

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
            <CustomScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flex: 1}}>
              <TurnoSelector
                value={values.turno}
                onChange={val => setFieldValue('turno', val)}
              />
              {touched.turno && errors.turno && (
                <Text style={{color: 'red', marginTop: 4}}>
                  {errors.turno}
                </Text>
              )}

              <View style={{marginTop: 8}}>
                <CustomDropdownInput
                  label="Actividad"
                  options={actividades || []}
                  value={values.actividad}
                  onSelect={val => setFieldValue('actividad', val)}
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
                  <CustomTimePicker
                    label="Hora de inicio"
                    value={values.hora_inicio}
                    onChange={hora => setFieldValue('hora_inicio', hora)}
                    error={touched.hora_inicio && !!errors.hora_inicio}
                  />
                  {touched.hora_inicio && errors.hora_inicio && (
                    <Text style={{color: 'red', marginTop: 4}}>
                      {errors.hora_inicio}
                    </Text>
                  )}
                </View>
              </View>

              <View style={{marginTop: 8}}>
                <CustomDropdownInput
                  label="Situacion"
                  options={situacion || []}
                  value={values.situacion}
                  onSelect={val => setFieldValue('situacion', val)}
                  error={touched.situacion && !!errors.situacion}
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
                  style={{height: 150}}
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
                  label="Iniciar Actividad"
                  icon="content-save"
                  style={{width: '100%'}}
                  disabled={false}
                  loading={false}
                  onPress={handleSubmit}
                />
              </View>
            </CustomScrollView>
          )}
        </Formik>

        <CustomFAB
          icon="timer"
          label={formatTiempo(tiempo)}
          fabStyle={{backgroundColor: globalColors.primary}}
          style={{bottom: 16, right: 16}}
        />
      </View>
    </DrawerLayout>
  );
};
