import {useEffect, useState} from 'react';
import {Foto} from '../../../../../../domain/entities/Foto';
import {useCamera} from '../../../../foto/hooks/useCamera';
import {useFotosStore} from '../../../../foto/store/useFotosStore';

export interface initialValuesProps {
  nro_guia: string;
  fecha_ejecucion: string;
  hora_ejecucion: string;
  fotos: Foto[];
}

const initialValues: initialValuesProps = {
  nro_guia: '',
  fecha_ejecucion: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
  hora_ejecucion: new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }),
  fotos: [],
};

export const useDetalleMaterialesCampoScreen = () => {
  const {fotos, isRendering, handleCamera} = useCamera();
  const {onReset: onResetFotos, setInitialParams} = useFotosStore();
  const [visible, setVisible] = useState(false);
  const [indexSeleccionado, setIndexSeleccionado] = useState(0);

  const abrirVisor = (index: number) => {
    setIndexSeleccionado(index);
    setVisible(true);
  };

  useEffect(() => {
    setInitialParams({
      minFotos: 1,
      maxFotos: 10,
    });
  }, []);

  return {
    //* Propiedades
    initialValues,
    fotos,
    isRendering,
    visible,
    indexSeleccionado,

    //* Metodos
    handleCamera,
    onResetFotos,
    abrirVisor,
    setVisible,
  };
};
