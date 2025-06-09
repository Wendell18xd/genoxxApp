import {useEffect, useState} from 'react';

interface Props {
  defaultValue: string;
  initialParams: {[key: string]: boolean};
}

export const useMounted = ({initialParams, defaultValue}: Props) => {
  const [value, setValue] = useState(defaultValue);
  const [mounted, setMounted] = useState<{[key: string]: boolean}>(
    initialParams,
  );

  useEffect(() => {
    // Marcar como montado el valor actual si no lo está
    if (!mounted[value]) {
      setMounted(prev => ({...prev, [value]: true}));
    }
  }, [value]);

  return {
    //* Propiedades
    mounted,
    value,

    //* Metodos
    setValue,
  };
};
