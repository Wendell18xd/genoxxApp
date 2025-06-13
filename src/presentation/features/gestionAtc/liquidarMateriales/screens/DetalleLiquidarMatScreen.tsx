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
  scrollContent: {
    padding: 16,
  },
  hiddenScroll: {
    flex: 1,
  },
  card: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 20,
  },
  listContainer: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    flexWrap: 'wrap',
    gap: 4, // puedes ajustar esto según lo necesites
  },
  nameRow: {
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
  },
  titleMedium: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statusBox: {
    width: 100,
    height: 50,
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleContainer: {
    width: 170, // o el valor que mejor se ajuste al texto más largo
  },
  descriptionContainer: {
    flex: 2,
  },
});

export default DetalleLiquidarMatScreen;
