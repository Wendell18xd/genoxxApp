import {Formik} from 'formik';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';

interface Props {
  initialValues: {nro_orden: string};
  getValidationSchema: () => void;
  handleSearch: (values: {nro_orden: string}, onClose?: () => void) => void;
  onClose?: () => void;
}

export const SearchObrasMaterialesCampo = ({
  initialValues,
  getValidationSchema,
  handleSearch,
  onClose,
}: Props) => {
  return (
    <View>
      <View
        style={{
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
        }}>
        {/* Texto centrado */}
        <Text
          variant="titleLarge"
          style={{
            position: 'absolute',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Buscar obra
        </Text>
      </View>

      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSearch(values, onClose)}
        validationSchema={getValidationSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => {
          return (
            <View style={{padding: 8}}>
              <View>
                <CustomTextInput
                  label="Nro de orden"
                  mode="outlined"
                  value={values.nro_orden}
                  autoCapitalize="characters"
                  onChangeText={handleChange('nro_orden')}
                  onBlur={handleBlur('nro_orden')}
                  error={touched.nro_orden && !!errors.nro_orden}
                />
                {touched.nro_orden && errors.nro_orden && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.nro_orden}
                  </Text>
                )}
              </View>

              <PrimaryButton
                label="Buscar"
                onPress={() => handleSubmit()}
                debounce
                icon="magnify"
                disabled={false}
                loading={false}
                style={{marginTop: 16, width: '100%'}}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
