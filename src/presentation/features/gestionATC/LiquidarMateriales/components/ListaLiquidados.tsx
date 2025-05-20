import React, {FC} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';

interface Material {
  id: string;
  codMaterial: string;
  nombre: string;
  sku: string;
  cantidad: string;
  motivo: string;
}

interface Props {
  data: Material[];
  scrollY?: Animated.Value;
  hideTitle?: boolean;
}

const ListaLiquidados: FC<Props> = ({data, scrollY, hideTitle}) => (
  <View>
    {!hideTitle && (
      <Text style={styles.externalTitle}>Materiales Liquidados</Text>
    )}
    <Animated.FlatList
      data={data}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={
        scrollY
          ? Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
              useNativeDriver: false,
            })
          : undefined
      }
      renderItem={({item}) => (
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
                  <Text style={styles.description}>{item.codMaterial}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <MaterialIcons name="cube" style={{marginRight: 6}} />
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Nombre del material:</Text>
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>{item.nombre}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <MaterialIcons name="tag" style={{marginRight: 6}} />
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Sku Cliente:</Text>
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>{item.sku}</Text>
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
                  <Text style={styles.description}>{item.cantidad}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <MaterialIcons name="comment-text" style={{marginRight: 6}} />
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Motivo:</Text>
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>{item.motivo}</Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
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
  titleContainer: {
    width: 170,
  },
  descriptionContainer: {
    flex: 2,
  },
  externalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginHorizontal: 16,
  },
});

export default ListaLiquidados;
