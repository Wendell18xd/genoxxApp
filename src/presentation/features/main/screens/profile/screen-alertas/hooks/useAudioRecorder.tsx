import {useEffect, useState} from 'react';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import {PermissionsAndroid, Platform} from 'react-native';
import RNFS from 'react-native-fs';

const audioRecorderPlayer = new AudioRecorderPlayer();

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const [audioBase64, setAudioBase64] = useState('');
  const [recordVolume, setRecordVolume] = useState(-160);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00');
  const [playTime, setPlayTime] = useState('00:00');
  const [audioDuration, setAudioDuration] = useState(0);

  const onStartRecord = async () => {
    try {
      if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
    console.warn('Permiso de micrófono denegado');
    return;
        }
      }

    const path = Platform.select({
      ios: 'alerta.m4a',
      android: `${RNFS.ExternalDirectoryPath}/alerta.mp4`,
    });


      const audioSet: AudioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };

      await audioRecorderPlayer.startRecorder(path, audioSet);
      setIsRecording(true);

      audioRecorderPlayer.addRecordBackListener(e => {
        const minutes = Math.floor(e.currentPosition / 60000);
        const seconds = Math.floor((e.currentPosition % 60000) / 1000);
        const formatted = `${String(minutes).padStart(2, '0')}:${String(
          seconds,
        ).padStart(2, '0')}`;
        setRecordTime(formatted);
        if (
          Platform.OS === 'android' &&
          typeof e.currentMetering === 'number'
        ) {
          setRecordVolume(e.currentMetering);
        } else {
          setRecordVolume(-100);
        }
        return;
      });

      setAudioPath(path ?? '');
    } catch (error) {
      console.error('Error al iniciar grabación', error);
    }
  };

  const onStopRecord = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      setAudioPath(result);
      setPlaybackPosition(0);

      // Leer archivo grabado y convertirlo a base64
      const base64Audio = await RNFS.readFile(result, 'base64');
      setAudioBase64(base64Audio);
    } catch (error) {
      console.error('Error al detener grabación', error);
    }
  };

  const onStartPlay = async () => {
    try {
      if (!audioPath) {
        return;
      }

      await audioRecorderPlayer.startPlayer(audioPath);
      await audioRecorderPlayer.seekToPlayer(playbackPosition);
      setIsPlaying(true);

      audioRecorderPlayer.addPlayBackListener(e => {
        setPlaybackPosition(e.currentPosition);
        setAudioDuration(e.duration);

        const remaining = e.duration - e.currentPosition;
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        const formatted = `${String(minutes).padStart(2, '0')}:${String(
          seconds,
        ).padStart(2, '0')}`;
        setPlayTime(formatted);

        if (e.currentPosition >= e.duration) {
          setIsPlaying(false);
          setPlaybackPosition(0);
          audioRecorderPlayer.stopPlayer();
        }
        return;
      });
    } catch (error) {
      console.error('Error al reproducir audio', error);
    }
  };

  const onPausePlay = async () => {
    try {
      await audioRecorderPlayer.pausePlayer();
      setIsPlaying(false);
    } catch (error) {
      console.error('Error al pausar reproducción', error);
    }
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      await onPausePlay();
    } else {
      await onStartPlay();
    }
  };

  const deleteAudio = async () => {
    await audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setAudioPath('');
    setPlaybackPosition(0);
    setIsPlaying(false);
    setAudioBase64(''); // Limpiar base64 cuando se elimina audio
  };

  const resetRecorder = async () => {
    if (isRecording) {
      await onStopRecord();
    }
    await deleteAudio();
  };

  useEffect(() => {
    return () => {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      audioRecorderPlayer.removeRecordBackListener();
    };
  }, []);

  return {
    onStartRecord,
    onStopRecord,
    onStartPlay,
    onPausePlay,
    togglePlayPause,
    isRecording,
    isPlaying,
    audioPath,
    audioBase64,
    recordVolume,
    resetRecorder,
    recordTime,
    playTime,
    audioDuration,
  };
};
