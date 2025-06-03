import {Text, ScrollView} from 'react-native';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {globalStyle} from '../../../../styles/globalStyle';
import {Formik} from 'formik';
import CustomDatePicker from '../../../../components/ui/CustomDatePicker';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import {TextInput} from 'react-native-paper';
import PrimaryButton from '../../../../components/ui/PrimaryButton';

const initialValues = {
  fecha_liquidacion: new Date().toISOString().slice(0, 10),
  actividad: '',
  cantidad: '',
  observacion: '',
};

export const LiquiPartObrasScreen = () => {
  return (
    <DrawerLayout>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, {resetForm}) => {}}
        /* validationSchema={getValidationSchema} */
      >
        {({
          handleSubmit,
          handleReset,
          handleChange,
          setFieldValue,
          values,
          errors,
          touched,
        }) => {
          return (
            <ScrollView
              contentContainerStyle={[
                globalStyle.container,
                globalStyle.padding,
                {position: 'relative'},
              ]}>
              <CustomDatePicker
                label="Fecha Producción"
                placeholder="Selecciona una fecha de producción"
                value={values.fecha_liquidacion}
                onChange={val => setFieldValue('fecha_liquidacion', val)}
                error={touched.fecha_liquidacion && !!errors.fecha_liquidacion}
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
                right={<TextInput.Icon icon="magnify" />}
                style={{marginTop: 8}}
                error={touched.actividad && !!errors.actividad}
              />
              {touched.actividad && errors.actividad && (
                <Text style={{color: 'red', marginBottom: 4}}>
                  {errors.actividad}
                </Text>
              )}

              <CustomTextInput
                label="Cantidad"
                value={values.cantidad}
                style={{marginTop: 8}}
                onChangeText={handleChange('cantidad')}
                error={touched.cantidad && !!errors.cantidad}
                keyboardType="decimal-pad"
              />
              {touched.cantidad && errors.cantidad && (
                <Text style={{color: 'red', marginBottom: 4}}>
                  {errors.cantidad}
                </Text>
              )}

              <CustomTextInput
                label="Observación"
                value={values.observacion}
                style={{marginTop: 8}}
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
                loading={false}
                onPress={handleSubmit}
                style={{marginTop: 16, width: '100%'}}
              />
            </ScrollView>
          );
        }}
      </Formik>
    </DrawerLayout>
  );
};
