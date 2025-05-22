import React, { FC } from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Card, TouchableRipple } from 'react-native-paper';
import MaterialIcons from '../../../../../../components/ui/icons/MaterialIcons';
import Icon from '@react-native-vector-icons/material-design-icons';
import { MaterialLiquidado } from '../SeriadosScreen';



interface Props {
  data: MaterialLiquidado[];
  selectedIds: string[];
  onSelect: (id: string) => void;
}

const ListaSeriados: FC<Props> = ({ data, selectedIds, onSelect }) => {
  const renderItem: ListRenderItem<MaterialLiquidado> = ({ item }) => {
    const isSelected = selectedIds.includes(item.id);

    return (
      <Card style={[styles.card, isSelected && styles.selectedCard]}>
        <View style={styles.innerContainer}>
          <TouchableRipple
            onPress={() => onSelect(item.id)}
            rippleColor="rgba(0, 0, 0, .1)"
            borderless={true}
            style={styles.touchable}
          >
            <View>
              {isSelected && (
                <Icon
                  name="check-circle"
                  size={24}
                  color="#2196f3"
                  style={styles.checkIcon}
                />
              )}
              <Card.Content>
                <View style={styles.listContainer}>
                  <View style={styles.row}>
                    <MaterialIcons
                      name="package-variant-closed"
                      style={{ marginRight: 6 }}
                    />
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>Cod Material:</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                      <Text style={[styles.description, { flex: 1 }]}>
                        {item.codMaterial}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <MaterialIcons name="cube" style={{ marginRight: 6 }} />
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>Descripción:</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.description}>{item.descripcion}</Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <MaterialIcons name="tag" style={{ marginRight: 6 }} />
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>Sku Cliente:</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.description}>{item.skuCliente}</Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <MaterialIcons
                      name="package-variant"
                      style={{ marginRight: 6 }}
                    />
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>Nro Serie:</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.description}>{item.nroSerie}</Text>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </View>
          </TouchableRipple>
        </View>
      </Card>

    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.scrollContent}
    />
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  selectedCard: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
    borderWidth: 2,
    elevation: 4,
  },
  innerContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  touchable: {
    borderRadius: 12,
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
  },
  listContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    flexWrap: 'wrap',
    padding: 1,
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

export default ListaSeriados;
