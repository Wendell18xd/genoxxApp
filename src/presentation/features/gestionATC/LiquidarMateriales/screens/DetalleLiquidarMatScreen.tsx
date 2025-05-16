import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, Divider, Text} from 'react-native-paper';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';

const DetalleLiquidarMatScreen = () => {
  const getTextColor = (backgroundColor: string) => {
    return backgroundColor === '#E8F5E9' ? '#388E3C' : '#000';
  };

  return (
    <DrawerLayout primary curvaHeight={80}>
      <View style={styles.wrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.listContainer}>
                <View style={styles.row}>
                  <MaterialIcons
                    name="folder-text-outline"
                    style={{marginRight: 6}}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Proyecto:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>IVTRC</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons
                    name="file-document-outline"
                    style={{marginRight: 6}}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Unidad de Negocio:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>UN09</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons
                    name="format-list-numbered"
                    style={{marginRight: 6}}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Nro Petición:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>1-32EAAZJ4</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons
                    name="calendar-month"
                    style={{marginRight: 6}}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Fecha Liquidación:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>22/07/2024</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons
                    name="clock-time-four-outline"
                    style={{marginRight: 6}}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Hora Liquidación:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>00:00</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons
                    name="calendar-check"
                    style={{marginRight: 6}}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Fecha Emisión:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>01/01/1900</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons
                    name="clipboard-text"
                    style={{marginRight: 6}}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Tipo de Orden:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>1 PLAY SIN SERVICIO</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons name="account" style={{marginRight: 6}} />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Nombre del Cliente:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>
                      ALEJANDRA VENEGAS DONAIRE
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons name="phone" style={{marginRight: 6}} />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Teléfono:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>123456789</Text>
                  </View>
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
                  <MaterialIcons
                    name="package-variant-closed"
                    style={{marginRight: 6}}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Cod Material:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>CABLE 1X4</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons name="cube" style={{marginRight: 6}} />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Nombre del material:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>100</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons name="tag" style={{marginRight: 6}} />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Sku Cliente:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>MTR</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons
                    name="package-variant"
                    style={{marginRight: 6}}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Cantidad:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>MTR</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons name="comment-text" style={{marginRight: 6}} />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Motivo:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>MTR</Text>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
       <Card style={styles.card}>
            <Card.Content>
              <View style={styles.listContainer}>
                <View style={styles.row}>
                  <MaterialIcons
                    name="package-variant-closed"
                    style={{marginRight: 6}}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Cod Material:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>CABLE 1X4</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons name="cube" style={{marginRight: 6}} />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Nombre del material:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>100</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons name="tag" style={{marginRight: 6}} />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Sku Cliente:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>MTR</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons
                    name="package-variant"
                    style={{marginRight: 6}}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Cantidad:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>MTR</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <MaterialIcons name="comment-text" style={{marginRight: 6}} />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Motivo:</Text>
                  </View>
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>MTR</Text>
                  </View>
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
