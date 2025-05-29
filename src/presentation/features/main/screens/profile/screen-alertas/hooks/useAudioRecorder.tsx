import {useEffect, useState} from 'react';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import {PermissionsAndroid, Platform} from 'react-native';

const audioRecorderPlayer = new AudioRecorderPlayer();

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const [recordVolume, setRecordVolume] = useState(-160);
  const [playbackPosition, setPlaybackPosition] = useState(0);

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
        android: 'sdcard/alerta.mp4',
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
        if (Platform.OS === 'android' && typeof e.currentMetering === 'number') {
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
    } catch (error) {
      console.error('Error al detener grabación', error);
    }
  };

  const onStartPlay = async () => {
    try {
      if (!audioPath) {return;}

      await audioRecorderPlayer.startPlayer(audioPath);
      await audioRecorderPlayer.seekToPlayer(playbackPosition);
      setIsPlaying(true);

      audioRecorderPlayer.addPlayBackListener(e => {
        setPlaybackPosition(e.currentPosition);
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
    recordVolume,
    resetRecorder,
  };
};
