import {useRef, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';

export const useAudioRecorder = () => {
  const recorderPlayer = useRef(new AudioRecorderPlayer());
  const [audioPath, setAudioPath] = useState('');
  const [base64Audio, setBase64Audio] = useState('');

  const requestPermitions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      return granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
    }
    return true;
  };

  const onStartRecord = async () => {
    const hasPermission = await requestPermitions();
    if (!hasPermission) {
      console.warn('Permisos denegados');
      return;
    }

    try {
      const fileName = Platform.select({
        ios: 'recording.m4a',
        android: 'recording.3gp',
      });
      const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      setAudioPath(path);

      await recorderPlayer.current.startRecorder(path);
    } catch (error) {
      console.error(error);
    }
  };

  const onStopRecord = async () => {
    const result = await recorderPlayer.current.stopRecorder();
    recorderPlayer.current.removeRecordBackListener();
    const base64 = await RNFS.readFile(result, 'base64');
    setBase64Audio(base64);
    console.log(base64);
    console.log('Grabación detenida:', result);
    return result;
  };

  const onStartPlay = async () => {
    console.log('Iniciando reproducción de:', audioPath);
    if (!audioPath) {
      return;
    }
    await recorderPlayer.current.startPlayer(audioPath);
  };

  return {
    onStartRecord,
    onStopRecord,
    onStartPlay,
    audioPath,
    base64Audio,
  };
};
