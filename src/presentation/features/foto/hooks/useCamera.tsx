import {useState} from 'react';
import {useFotosStore} from '../store/useFotosStore';
import {useNavigation} from '@react-navigation/native';
import {ToastNativo} from '../../../helper/utils';
import {CameraAdapter} from '../../../adapter/camera-adapter';

export const useCamera = () => {
  const {
    fotos,
    initialParams: {minFotos, maxFotos, isSave, onSave},
    setFotos,
    onReset,
  } = useFotosStore();
  const [countFotos, setCountFotos] = useState(fotos.length);
  const [isLoading, setIsLoading] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const navigation = useNavigation();

  const handleCamera = async () => {
    const count = maxFotos - countFotos;

    if (count === 0) {
      ToastNativo({
        titulo: 'Limite de fotos',
        mensaje: `Limite de fotos alcanzado solo se puede seleccionar ${maxFotos} fotos`,
        isAlert: true,
      });
      return;
    }

    setIsRendering(true);
    const photos = await CameraAdapter.takePicture();
    setFotos([
      ...fotos,
      ...photos.map(photo => ({foto: photo, comentario: ''})),
    ]);
    if (photos.length > 0) {
      setCountFotos(countFotos + 1);
    }
    setIsRendering(false);
  };

  const handleGallery = async () => {
    const count = maxFotos - countFotos;

    if (count === 0) {
      ToastNativo({
        titulo: 'Limite de fotos',
        mensaje: `Limite de fotos alcanzado solo se puede seleccionar ${maxFotos} fotos`,
        isAlert: true,
      });
      return;
    }

    setIsRendering(true);
    const photos = await CameraAdapter.getPictureFromLibrary(count);
    setFotos([
      ...fotos,
      ...photos.map(photo => ({foto: photo, comentario: ''})),
    ]);
    setCountFotos(countFotos + photos.length);
    setIsRendering(false);
  };

  const handleDelete = (index: number) => {
    setFotos(fotos.filter((_, i) => i !== index));
    setCountFotos(countFotos - 1);
  };

  const handleCancel = (isBack = false) => {
    if (isSave) {
      onReset();
      setCountFotos(0);
    }
    if (isBack) {
      navigation.goBack();
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (onSave) {
      if (fotos.length < minFotos) {
        ToastNativo({
          titulo: 'Faltan fotos',
          mensaje: `Se requiere minimo ${minFotos} fotos`,
        });
        return;
      }

      await onSave(fotos);
    }
    setIsLoading(false);
  };

  return {
    //* Propiedades
    fotos,
    countFotos,
    maxFotos,
    isSave,
    isLoading,
    isRendering,

    //* Metodos
    handleCamera,
    handleGallery,
    handleDelete,
    handleCancel,
    handleSave,
  };
};
