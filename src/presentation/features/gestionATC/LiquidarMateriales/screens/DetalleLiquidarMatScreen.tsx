import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import HeaderDetalle from '../components/HeaderDetalle';
import ListaLiquidados from '../components/ListaLiquidados';

const materialesMock = [
  {
    id: '1',
    codMaterial: 'CABLE 1X4',
    nombre: 'Cable de cobre',
    sku: 'MTR',
    cantidad: '100',
    motivo: 'Instalación',
  },
  {
    id: '2',
    codMaterial: 'CONECTOR F',
    nombre: 'Conector rápido',
    sku: 'PZA',
    cantidad: '10',
    motivo: 'Reemplazo',
  },
  {
    id: '3',
    codMaterial: 'CAJA NAP',
    nombre: 'Caja de distribución',
    sku: 'UND',
    cantidad: '1',
    motivo: 'Nueva instalación',
  },
];

const DetalleLiquidarMatScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;


  const extraFieldsOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [220, 0],
    extrapolate: 'clamp',
  });
  const extraFieldsHeight = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [180, 0],
    extrapolate: 'clamp',
  });

  const getTextColor = (backgroundColor: string) => {
    return backgroundColor === '#E8F5E9' ? '#388E3C' : '#000';
  };

  return (
    <DrawerLayout primary curvaHeight={80}>
      <View style={styles.wrapper}>
        <HeaderDetalle
          extraFieldsOpacity={extraFieldsOpacity}
          extraFieldsHeight={extraFieldsHeight}
          getTextColor={getTextColor}
        />
        <ListaLiquidados
          data={materialesMock}
          scrollY={scrollY}
        />
      </View>
    </DrawerLayout>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default DetalleLiquidarMatScreen;
