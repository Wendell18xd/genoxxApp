import React, { FC } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';

interface Props {
  extraFieldsOpacity: Animated.AnimatedInterpolation<string | number>;
  extraFieldsHeight: Animated.AnimatedInterpolation<string | number>;
  getTextColor: (backgroundColor: string) => string;
}

const HeaderDetalle: FC<Props> = ({
  extraFieldsOpacity,
  extraFieldsHeight,
  getTextColor,
}) => (
  <Card style={[styles.card, styles.cardMain]}>
    <Card.Content>
      <View style={styles.listContainer}>
        {/* Campos siempre visibles */}
        <View style={styles.row}>
          <MaterialIcons name="folder-text-outline" style={{ marginRight: 6 }} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Proyecto:</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>IVTRC</Text>
          </View>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="file-document-outline" style={{ marginRight: 6 }} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Unidad de Negocio:</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>UN09</Text>
          </View>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="format-list-numbered" style={{ marginRight: 6 }} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Nro Petición:</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>1-32EAAZJ4</Text>
          </View>
        </View>
        {/* Campos que se ocultan al hacer scroll */}
        <Animated.View
          style={{
            opacity: extraFieldsOpacity,
            height: extraFieldsHeight,
            overflow: 'hidden',
          }}>
          <View style={styles.row}>
            <MaterialIcons name="calendar-month" style={{ marginRight: 6 }} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Fecha Liquidación:</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>22/07/2024</Text>
            </View>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="clock-time-four-outline" style={{ marginRight: 6 }} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Hora Liquidación:</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>00:00</Text>
            </View>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="calendar-check" style={{ marginRight: 6 }} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Fecha Emisión:</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>01/01/1900</Text>
            </View>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="clipboard-text" style={{ marginRight: 6 }} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Tipo de Orden:</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>1 PLAY SIN SERVICIO</Text>
            </View>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="account" style={{ marginRight: 6 }} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Nombre del Cliente:</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>ALEJANDRA VENEGAS DONAIRE</Text>
            </View>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="phone" style={{ marginRight: 6 }} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Teléfono:</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>123456789</Text>
            </View>
          </View>
        </Animated.View>
      </View>
      <Divider style={{ marginVertical: 8 }} />
      <Text style={styles.titleMedium}>Estados</Text>
      <View style={styles.statusContainer}>
        <View style={[styles.statusBox, { backgroundColor: '#E8F5E9' }]}>
          <Text style={styles.statusTitle}>Acta:</Text>
          <Text style={[styles.statusValue, { color: getTextColor('#E8F5E9') }]}>ABIERTA</Text>
        </View>
        <View style={[styles.statusBox, { backgroundColor: '#E8F5E9' }]}>
          <Text style={styles.statusTitle}>Orden:</Text>
          <Text style={[styles.statusValue, { color: getTextColor('#E8F5E9') }]}>ABIERTA</Text>
        </View>
        <View style={[styles.statusBox, { backgroundColor: '#F5F5F5' }]}>
          <Text style={styles.statusTitle}>Materiales:</Text>
          <Text style={[styles.statusValue, { color: getTextColor('#F5F5F5') }]}>PENDIENTE</Text>
        </View>
      </View>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 20,
  },
  cardMain: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  listContainer: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    flexWrap: 'wrap',
    gap: 4,
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
    width: 170,
  },
  descriptionContainer: {
    flex: 2,
  },
});

export default HeaderDetalle;
