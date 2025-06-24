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
import CustomIconBottom from '../../../../../components/ui/CustomIconBottom';
import {useCamaraAlertas} from './hooks/useCamaraAlertas';
import CustomScrollView from '../../../../../components/ui/CustomScrollView';

export const AlertasScreen = () => {
  const {
    formValues,
    tipos,
    startAlertaSubmit,
    isFetching,
    getAlertValidationSchema,
    mutation,
    loadingGPS,
  } = useAlertas();

  const {ref, open: openModal, close: closeModal} = useBottomSheetModal();
  const isSheetOpenRef = useRef(false);
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const {handleCamera, fotos} = useCamaraAlertas();

  const open = () => {
    isSheetOpenRef.current = true;
    setIsSheetVisible(true);
    openModal();
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

  const close = () => {
    isSheetOpenRef.current = false;
    if (isRecording) {
      onStopRecord();
    }
    closeModal();
    setIsSheetVisible(false);
  };

  const handleCancel = () => {
    resetRecorder();
  };

  if (!tipos && isFetching) {
    return <FullScreenLoader />;
  }

  return (
    <View style={{flex: 1}}>
      <SafeAreaLayout title="Alertas" isHeader primary>
        <CustomScrollView>
          {(mutation.isPending || loadingGPS) && (
            <FullScreenLoader transparent />
          )}
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
          <View style={{flex: 1, padding: 16, paddingBottom: 80}}>
            <Formik
              initialValues={formValues}
              validationSchema={getAlertValidationSchema}
              onSubmit={(values, {resetForm}) => {
                startAlertaSubmit(values, resetForm, audioBase64);
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
                        const onlyNumbers = text
                          .replace(/[^0-9]/g, '')
                          .slice(0, 9);
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
                    disabled={mutation.isPending || loadingGPS}
                    loading={mutation.isPending || loadingGPS}
                  />
                </View>
              )}
            </Formik>
          </View>
          {/* </TouchableWithoutFeedback> */}
        </CustomScrollView>
      </SafeAreaLayout>
      <View
        pointerEvents="box-none"
        style={{
          position: 'absolute',
          bottom: 150,
          right: 40,
          alignItems: 'center',
          zIndex: isSheetVisible ? 0 : 10,
          elevation: isSheetVisible ? 0 : 10,
        }}>
        <CustomFAB icon="microphone" onPress={open} />

        {(isRecording || audioPath) && (
          <View
            style={{
              position: 'absolute',
              top: -5,
              left: 10,
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: isRecording
                ? 'red'
                : isPlaying
                ? 'red'
                : 'green',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={isRecording ? 'stop' : isPlaying ? 'play' : 'play-circle'}
              size={16}
              color="white"
            />
          </View>
        )}

        <CustomFAB
          icon="camera"
          onPress={handleCamera}
          style={{marginTop: 70}}
        />
        {fotos.length > 0 && (
          <View
            style={{
              position: 'absolute',
              top: 65,
              left: 10,
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>
              {fotos.length}
            </Text>
          </View>
        )}
      </View>
      <CustomBottomSheet
        ref={ref}
        onChange={index => {
          setIsSheetVisible(index !== -1);
        }}>
        <View style={{padding: 24, alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 24,
            }}>
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
              containerColor={isRecording || isPlaying ? '#9E9E9E' : '#4CAF50'}
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
              containerColor={isRecording || !audioPath ? '#9E9E9E' : '#2196F3'}
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
              onPress={close}
              style={{flex: 1, marginLeft: 8}}
            />
          </View>
        </View>
      </CustomBottomSheet>
    </View>
  );
};
