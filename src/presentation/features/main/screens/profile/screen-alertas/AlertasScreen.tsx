import {Text, TextInput} from 'react-native-paper';
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
import {useEffect, useRef, useState} from 'react';
import Icon from '@react-native-vector-icons/material-design-icons';
import FullScreenLoader from '../../../../../components/ui/loaders/FullScreenLoader';
import {useNavigation} from '@react-navigation/native';
import CustomIconBottom from '../../../../../components/ui/CustomIconBottom';
import { useCamaraAlertas } from './hooks/useCamaraAlertas';

export const AlertasScreen = () => {
  const {
    formValues,
    tipos,
    startAlertaSubmit,
    isFetching,
    getAlertValidationSchema,
    mutation,
  } = useAlertas();

  const [showLoader, setShowLoader] = useState(false);
  const {ref, open: openModal, close: closeModal} = useBottomSheetModal();
  const isSheetOpenRef = useRef(false);
  const navigation = useNavigation();
  const {handleCamera} = useCamaraAlertas();
  // const [isStopping, setIsStopping] = useState(false);

  const open = () => {
    isSheetOpenRef.current = true;
    openModal();
  };

  const close = () => {
    isSheetOpenRef.current = false;
    if (isRecording) {
      onStopRecord();
    }
    closeModal();
  };

  const {
    onStartRecord,
    onStopRecord,
    togglePlayPause,
    isRecording,
    isPlaying,
    audioPath,
    audioBase64,
    resetRecorder,
    recordTime,
    playTime,
  } = useAudioRecorder();

  useEffect(() => {
    return () => {
      resetRecorder();
    };
  }, []);

  const handleCancel = () => {
    resetRecorder();
  };

  if (isFetching) {
    return null;
  }
  if (showLoader) {
    return <FullScreenLoader />;
  }

  return (
    <SafeAreaLayout title="Alertas" isHeader primary>
      <View
        style={{flex: 1, padding: 16, paddingBottom: 80, position: 'relative'}}>
        <Formik
          initialValues={formValues}
          validationSchema={getAlertValidationSchema}
          onSubmit={async (values, {resetForm}) => {
            setShowLoader(true);
            await startAlertaSubmit(values, resetForm, audioBase64);
            setTimeout(() => {
              setShowLoader(false);
              navigation.goBack();
            }, 1500);
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
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.tipo}
                  </Text>
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
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.telefono}
                  </Text>
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
                    touched.comentario && !!errors.comentario
                      ? '#A72626'
                      : '#5A5261'
                  }
                />
                {touched.comentario && errors.comentario && (
                  <Text style={{color: 'red', marginTop: 4}}>
                    {errors.comentario}
                  </Text>
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

        <View style={{position: 'absolute', bottom: 80, right: 72}}>
          <CustomFAB icon="microphone" onPress={open} />

          {audioPath && (
            <View
              style={{
                position: 'relative',
                bottom: 40,
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="play" size={15} color="white" />
            </View>
          )}

          <CustomFAB icon="camera" onPress={handleCamera} style={{bottom:12}}/>
        </View>
        <CustomBottomSheet ref={ref}>
          <View style={{padding: 24, alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 24}}>
              Grabar Audio
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: isRecording ? 'red' : isPlaying ? 'green' : 'black',
                marginBottom: 12,
              }}>
              {isRecording
                ? `Grabando: ${recordTime}`
                : isPlaying
                ? `Reproduciendo: ${playTime}`
                : audioPath
                ? `Duración: ${recordTime}`
                : 'Listo para grabar'}
            </Text>
            <View style={{flexDirection: 'row', gap: 20, marginBottom: 24}}>
              <CustomIconBottom
                icon="microphone"
                containerColor={
                  isRecording || isPlaying ? '#9E9E9E' : '#4CAF50'
                }
                onPress={onStartRecord}
                disabled={isRecording || isPlaying}
                loading={mutation.isPending}
              />
              <CustomIconBottom
                icon="stop-circle"
                containerColor={isRecording ? '#F44336' : '#9E9E9E'}
                onPress={onStopRecord}
                debounce
                disabled={!isRecording}
                loading={mutation.isPending}
              />
              <CustomIconBottom
                icon={isPlaying ? 'pause-circle' : 'play-circle'}
                containerColor={
                  isRecording || !audioPath ? '#9E9E9E' : '#2196F3'
                }
                onPress={togglePlayPause}
                disabled={isRecording || !audioPath}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
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
