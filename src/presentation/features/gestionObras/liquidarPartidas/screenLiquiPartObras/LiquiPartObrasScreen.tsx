import DrawerLayout from '../../../main/layout/DrawerLayout';
import {globalStyle} from '../../../../styles/globalStyle';
import {Formik} from 'formik';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import {Text, TextInput} from 'react-native-paper';
import PrimaryButton from '../../../../components/ui/PrimaryButton';
import {useLiquiPartObras} from './hooks/useLiquiPartObras';
import {mostrarSiNoCero} from '../../../../helper/utils';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import CustomScrollView from '../../../../components/ui/CustomScrollView';
import CustomKeyboardAvoidingView from '../../../../components/ui/CustomKeyboardAvoidingView';
import CustomDateCalendarPicker from '../../../../components/ui/CustomDateCalendarPicker';

export const LiquiPartObrasScreen = () => {
  const {
    initialValues,
    mutation,
    mapUnidadesMedida,
    txt_tipo,
    getValidationSchema,
    handleSavePartida,
    handleSelectActividad,
    handleChangeCantidad,
  } = useLiquiPartObras();

  return (
    <DrawerLayout>
      {mutation.isPending && (
        <FullScreenLoader message="Grabando partida" transparent />
      )}

      <CustomKeyboardAvoidingView>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values, {resetForm}) => {
            handleSavePartida(values, resetForm);
          }}
          validationSchema={getValidationSchema}>
          {({
            handleSubmit,
            handleBlur,
            handleChange,
            setFieldValue,
            values,
            errors,
            touched,
          }) => {
            return (
              <CustomScrollView
                contentContainerStyle={[
                  globalStyle.padding,
                  {position: 'relative'},
                ]}>
                <CustomDateCalendarPicker
                  label="Fecha de Producción"
                  placeholder="Seleccione una fecha de producción"
                  value={values.fecha_liquidacion}
                  onChange={val => setFieldValue('fecha_liquidacion', val)}
                  error={
                    touched.fecha_liquidacion && !!errors.fecha_liquidacion
                  }
                />
                {touched.fecha_liquidacion && errors.fecha_liquidacion && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.fecha_liquidacion}
                  </Text>
                )}

                <CustomTextInput
                  label="Buscar actividad"
                  value={values.actividad}
                  onChangeText={handleChange('actividad')}
                  onBlur={handleBlur('actividad')}
                  editable={false}
                  right={
                    <TextInput.Icon
                      icon={
                        values.actividad && values.actividad.length > 0
                          ? 'close'
                          : 'magnify'
                      }
                      onPress={() => {
                        handleSelectActividad(values.actividad, setFieldValue);
                      }}
                    />
                  }
                  style={{marginTop: 8}}
                  error={
                    touched.actividad &&
                    !!errors.actividad &&
                    values.cod_actividad === ''
                  }
                />
                {touched.actividad &&
                  errors.actividad &&
                  values.cod_actividad === '' && (
                    <Text style={{color: 'red', marginBottom: 4}}>
                      {errors.actividad}
                    </Text>
                  )}

                <CustomTextInput
                  label="Cantidad"
                  value={mostrarSiNoCero(values.cantidad?.toString())}
                  style={{marginTop: 8}}
                  onChangeText={val => handleChangeCantidad(val, setFieldValue)}
                  error={touched.cantidad && !!errors.cantidad}
                  keyboardType="decimal-pad"
                />
                {touched.cantidad && errors.cantidad && (
                  <Text style={{color: 'red', marginBottom: 4}}>
                    {errors.cantidad}
                  </Text>
                )}

                {txt_tipo === 'ENERGIA' && (
                  <CustomTextInput
                    label="Dificultad"
                    value={
                      mapUnidadesMedida[
                        values.dificultad as keyof typeof mapUnidadesMedida
                      ]
                    }
                    style={{marginTop: 8}}
                    editable={false}
                    onChangeText={val => setFieldValue('dificultad', val)}
                    error={touched.dificultad && !!errors.dificultad}
                  />
                )}

                <CustomTextInput
                  placeholder="Observación"
                  value={values.observacion}
                  style={{marginTop: 12}}
                  textAlignVertical="top"
                  onChangeText={handleChange('observacion')}
                  error={touched.observacion && !!errors.observacion}
                  autoCapitalize="characters"
                  multiline
                  height={150}
                  numberOfLines={5}
                />
                {touched.observacion && errors.observacion && (
                  <Text style={{color: 'red', marginBottom: 4}}>
                    {errors.observacion}
                  </Text>
                )}

                <PrimaryButton
                  label="Grabar"
                  icon="content-save"
                  loading={mutation.isPending}
                  onPress={handleSubmit}
                  style={{marginTop: 16, width: '100%'}}
                />
              </CustomScrollView>
            );
          }}
        </Formik>
      </CustomKeyboardAvoidingView>
    </DrawerLayout>
  );
};
