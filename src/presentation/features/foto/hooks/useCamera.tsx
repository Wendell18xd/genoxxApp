import {useState} from 'react';
import {useFotosStore} from '../store/useFotosStore';
import {useNavigation} from '@react-navigation/native';
import {ToastNativo} from '../../../helper/utils';
import {CameraAdapter} from '../../../adapter/camera-adapter';

export const useCamera = () => {
  const {
    fotos,
    initialParams: {maxFotos, onSave},
    setFotos,
    onReset,
  } = useFotosStore();
  const [countFotos, setCountFotos] = useState(0);
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

    const photos = await CameraAdapter.takePicture();
    setFotos([
      ...fotos,
      ...photos.map(photo => ({foto: photo, comentario: ''})),
    ]);
    if (photos.length > 0) {
      setCountFotos(countFotos + 1);
    }
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

    const photos = await CameraAdapter.getPictureFromLibrary(count);
    setFotos([
      ...fotos,
      ...photos.map(photo => ({foto: photo, comentario: ''})),
    ]);
    setCountFotos(countFotos + photos.length);
  };

  const handleDelete = (index: number) => {
    setFotos(fotos.filter((_, i) => i !== index));
    setCountFotos(countFotos - 1);
  };

  const handleCancel = (isBack = false) => {
    onReset();
    setCountFotos(0);
    if (isBack) {
      navigation.goBack();
    }
  };

  const handleSave = () => {
    onSave(fotos);
  };

  return {
    //* Propiedades
    fotos,
    countFotos,
    maxFotos,

    //* Metodos
    handleCamera,
    handleGallery,
    handleDelete,
    handleCancel,
    handleSave,
  };
};
