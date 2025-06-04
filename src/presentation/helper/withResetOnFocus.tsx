import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

export function withResetOnFocus<P>(WrappedComponent: React.ComponentType<P>) {
  return (props: P) => {
    const [key, setKey] = useState(Date.now());

    const resetKey = useCallback(() => {
      setKey(Date.now());
    }, []);

    useFocusEffect(resetKey); // Solo se ejecuta al enfocar

    return <WrappedComponent key={key} {...props} />;
  };
}
