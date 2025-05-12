import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, List, Divider, FAB } from 'react-native-paper';


const DetalleLiquidarMatScreen = () => {

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Liquidación de Materiales" />
        <Card.Content>
          <List.Section>
            <List.Item title="Proyecto" description="IVTRC" />
            <List.Item title="Unidad de Negocio" description="UN09" />
            <List.Item title="Nro Petición" description="1-32EAAZJ4" />
            <List.Item title="Fecha Liquidación" description="22/07/2024" />
            <List.Item title="Hora Liquidación" description="00:00" />
            <List.Item title="Fecha Emisión" description="01/01/1900" />
            <List.Item title="Tipo de Orden" description="1 PLAY SIN SERVICIO" />
            <List.Item title="Nombre del Cliente" description="ALEJANDRA VENEGAS DONAIRE" />
            <List.Item title="Teléfono" description="-" />
          </List.Section>

          <Divider style={{ marginVertical: 8 }} />

          <Text style={styles.titleMedium}>Estados</Text>
          <View style={styles.statusContainer}>
            <Text style={[styles.status, { backgroundColor: '#4CAF50' }]}>Acta: ABIERTA</Text>
            <Text style={[styles.status, { backgroundColor: '#4CAF50' }]}>Orden: ABIERTA</Text>
            <Text style={[styles.status, { backgroundColor: '#BDBDBD' }]}>Materiales: PENDIENTE</Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.section}>
        <Text style={[styles.titleMedium, { marginVertical: 10 }]}>
          Materiales Liquidados
        </Text>
      </View>

      <FAB
        icon="plus"
        label="Agregar"
        style={styles.fab}
        onPress={() => console.log('Agregar material')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  card: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 20,
  },
  statusContainer: {
    marginTop: 10,
  },
  status: {
    padding: 6,
    borderRadius: 6,
    marginVertical: 4,
    color: 'white',
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  titleMedium: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DetalleLiquidarMatScreen;
