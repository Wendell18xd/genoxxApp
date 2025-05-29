import {IconButton, Text, TextInput} from 'react-native-paper';
import SafeAreaLayout from '../../../layout/SafeAreaLayout';
import {View} from 'react-native';
import CustomTextInput from '../../../../../components/ui/CustomTextInput';
import {Formik} from 'formik';
import {useAlertas} from './hooks/useAlertas';
import PrimaryButton from '../../../../../components/ui/PrimaryButton';
import {CustomDropdownInput} from '../../../../../components/ui/CustomDropdownInput';
import {CustomFAB} from '../../../../../components/ui/CustomFAB';
import CustomBottomSheet from '../../../../../components/ui/bottomSheetModal/CustomBottomSheet';
import {useBottomSheetModal} from '../../../../../hooks/useBottomSheet';
import {useAudioRecorder} from './hooks/useAudioRecorder';
import {useEffect} from 'react';

export const AlertasScreen = () => {
  const {
    formValues,
    tipos,
    startAlertaSubmit,
    isFetching,
    getAlertValidationSchema,
    mutation,
  } = useAlertas();

  const {ref, open, close} = useBottomSheetModal();

  const {
    onStartRecord,
    onStopRecord,
    togglePlayPause,
    isRecording,
    isPlaying,
    audioPath,
    recordVolume,
    resetRecorder,
  } = useAudioRecorder();

  useEffect(() => {
    return () => {
      resetRecorder();
    };
  }, []);

  const handleCancel = () => {
    resetRecorder();
    close();
  };

  if (isFetching) {return null;}

  return (
    <SafeAreaLayout title="Alertas" isHeader primary>
      <View style={{flex: 1, padding: 16, position: 'relative'}}>
        <Formik
          initialValues={formValues}
          validationSchema={getAlertValidationSchema}
          onSubmit={(values, {resetForm}) => {
            startAlertaSubmit(values, resetForm);
          }}>
          {({values, setFieldValue, handleSubmit, touched, errors}) => (
            <View style={{flex: 1}}>
              <View>
                <CustomDropdownInput
                  icon="lightbulb-outline"
                  label="Tipo"
                  options={tipos || []}
                  value={values.tipo}
                  onSelect={val => setFieldValue('tipo', val)}
                  error={touched.tipo && !!errors.tipo}
                />
                {touched.tipo && errors.tipo && (
                  <Text style={{color: 'red', marginTop: 4}}>{errors.tipo}</Text>
                )}
              </View>

              <View style={{marginTop: 8}}>
                <CustomTextInput
                  label="Número de teléfono"
                  mode="outlined"
                  keyboardType="numeric"
                  value={values.telefono}
                  onChangeText={text => {
                    const onlyNumbers = text.replace(/[^0-9]/g, '').slice(0, 9);
                    setFieldValue('telefono', onlyNumbers);
                  }}
                  left={<TextInput.Icon icon="phone" />}
                  error={touched.telefono && !!errors.telefono}
                />
                {touched.telefono && errors.telefono && (
                  <Text style={{color: 'red', marginTop: 4}}>{errors.telefono}</Text>
                )}
              </View>

              <View style={{marginTop: 16}}>
                <CustomTextInput
                  placeholder="Comentario"
                  mode="outlined"
                  value={values.comentario}
                  onChangeText={text => setFieldValue('comentario', text)}
                  multiline={true}
                  numberOfLines={5}
                  style={{height: 150}}
                  error={touched.comentario && !!errors.comentario}
                  placeholderTextColor={
                    touched.comentario && !!errors.comentario ? '#A72626' : '#5A5261'
                  }
                />
                {touched.comentario && errors.comentario && (
                  <Text style={{color: 'red', marginTop: 4}}>{errors.comentario}</Text>
                )}
              </View>

              <PrimaryButton
                debounce
                label="Enviar"
                icon="content-save"
                style={{marginTop: 16, width: '100%'}}
                onPress={handleSubmit}
                disabled={mutation.isPending}
                loading={mutation.isPending}
              />
            </View>
          )}
        </Formik>

        <CustomFAB icon="plus" style={{bottom: 16, right: 16}} onPress={open} />

        <CustomBottomSheet ref={ref}>
          <View style={{padding: 24, alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 24}}>
              Grabar Audio
            </Text>

            {isRecording && (
              <View
                style={{
                  width: '100%',
                  height: 20,
                  backgroundColor: '#E0E0E0',
                  borderRadius: 10,
                  overflow: 'hidden',
                  marginBottom: 16,
                }}>
                <View
                  style={{
                    width: `${Math.min(
                      Math.max(((recordVolume + 160) / 160) * 100, 5),
                      100,
                    )}%`,
                    height: '100%',
                    backgroundColor: '#4CAF50',
                  }}
                />
              </View>
            )}

            <View style={{flexDirection: 'row', gap: 20, marginBottom: 24}}>
              <IconButton
                icon="microphone"
                size={40}
                containerColor="#4CAF50"
                iconColor="#fff"
                onPress={onStartRecord}
                disabled={isRecording || isPlaying}
              />

              <IconButton
                icon="stop-circle"
                size={40}
                containerColor="#F44336"
                iconColor="#fff"
                onPress={onStopRecord}
                disabled={!isRecording}
              />

              <IconButton
                icon={isPlaying ? 'pause-circle' : 'play-circle'}
                size={40}
                containerColor="#2196F3"
                iconColor="#fff"
                onPress={togglePlayPause}
                disabled={isRecording || !audioPath}
              />
            </View>

            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
              <PrimaryButton
                label="CANCELAR"
                onPress={handleCancel}
                style={{flex: 1, marginRight: 8}}
              />
              <PrimaryButton
                label="ACEPTAR"
                onPress={() => close()}
                style={{flex: 1, marginLeft: 8}}
              />
            </View>
          </View>
        </CustomBottomSheet>
      </View>
    </SafeAreaLayout>
  );
};
