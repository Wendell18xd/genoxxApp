import {useFotosStore} from '../store/useFotosStore';

export const useItemCamera = () => {
  const {fotos, setFotos} = useFotosStore();

  const handleChangeComentario = (text: string, index: number) => {
    const newFotos = [...fotos];
    newFotos[index].comentario = text;
    setFotos(newFotos);
  };

  return {
    //* Propiedades
    //* Metodos
    handleChangeComentario,
  };
};
