import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, Divider, Text} from 'react-native-paper';
import DrawerLayout from '../../../main/layout/DrawerLayout';

const DetalleLiquidarMatScreen = () => {
  const getTextColor = (backgroundColor: string) => {
    return backgroundColor === '#E8F5E9' ? '#388E3C' : '#000';
  };

  return (
    <DrawerLayout primary curvaHeight={80}>
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.listContainer}>
                <View style={styles.row}>
                  <Text style={styles.title}>Proyecto:</Text>
                  <Text style={styles.description}>IVTRC</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title}>Unidad de Negocio:</Text>
                  <Text style={styles.description}>UN09</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title}>Nro Petición:</Text>
                  <Text style={styles.description}>1-32EAAZJ4</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title}>Fecha Liquidación:</Text>
                  <Text style={styles.description}>22/07/2024</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title}>Hora Liquidación:</Text>
                  <Text style={styles.description}>00:00</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title}>Fecha Emisión:</Text>
                  <Text style={styles.description}>01/01/1900</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title}>Tipo de Orden:</Text>
                  <Text style={styles.description}>1 PLAY SIN SERVICIO</Text>
                </View>
                <View style={[styles.row, styles.nameRow]}>
                  <Text style={styles.title}>Nombre del Cliente:</Text>
                  <Text style={styles.description}>
                    ALEJANDRA VENEGAS DONAIRE
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title}>Teléfono:</Text>
                  <Text style={styles.description}>-</Text>
                </View>
              </View>

              <Divider style={{marginVertical: 8}} />

              <Text style={styles.titleMedium}>Estados</Text>
              <View style={styles.statusContainer}>
                <View style={[styles.statusBox, {backgroundColor: '#E8F5E9'}]}>
                  <Text style={styles.statusTitle}>Acta:</Text>
                  <Text
                    style={[
                      styles.statusValue,
                      {color: getTextColor('#E8F5E9')},
                    ]}>
                    ABIERTA
                  </Text>
                </View>
                <View style={[styles.statusBox, {backgroundColor: '#E8F5E9'}]}>
                  <Text style={styles.statusTitle}>Orden:</Text>
                  <Text
                    style={[
                      styles.statusValue,
                      {color: getTextColor('#E8F5E9')},
                    ]}>
                    ABIERTA
                  </Text>
                </View>
                <View style={[styles.statusBox, {backgroundColor: '#F5F5F5'}]}>
                  <Text style={styles.statusTitle}>Materiales:</Text>
                  <Text
                    style={[
                      styles.statusValue,
                      {color: getTextColor('#F5F5F5')},
                    ]}>
                    PENDIENTE
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
          <Text style={styles.titleMedium}>Materiales Liquidados</Text>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.listContainer}>
                <View style={styles.row}>
                  <Text style={styles.title}>Cod Material:</Text>
                  <Text style={styles.description}>CABLE 1X4</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title}>Nombre del material:</Text>
                  <Text style={styles.description}>100</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title}>Sku Cliente:</Text>
                  <Text style={styles.description}>MTR</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title}>Cantidad:</Text>
                  <Text style={styles.description}>MTR</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title}>Motivo:</Text>
                  <Text style={styles.description}>MTR</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.listContainer}>
                <View style={styles.row}>
                  <Text style={styles.title}>Cod Material:</Text>
                  <Text style={styles.description}>CABLE 1X4</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title}>Nombre del material:</Text>
                  <Text style={styles.description}>100</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title}>Sku Cliente:</Text>
                  <Text style={styles.description}>MTR</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title}>Cantidad:</Text>
                  <Text style={styles.description}>MTR</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.title}>Motivo:</Text>
                  <Text style={styles.description}>MTR</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
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
    paddingBottom: 100, // para que puedas llegar hasta el final sin bloquear el scroll
  },
  hiddenScroll: {
    flex: 1,
  },
  container: {
    marginBottom: 20,
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
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  nameRow: {
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  description: {
    fontSize: 16,
    textAlign: 'right',
    flex: 1,
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
});

export default DetalleLiquidarMatScreen;
