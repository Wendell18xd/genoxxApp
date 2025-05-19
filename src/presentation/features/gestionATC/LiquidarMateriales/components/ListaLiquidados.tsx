import React, {FC} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';

interface FieldConfig<T> {
  key: keyof T;
  label: string;
  icon?: string;
}

interface Props<T extends { id: string }> {
  data: T[];
  fields: FieldConfig<T>[];
  scrollY?: Animated.Value;
  hideTitle?: boolean;
  title?: string;
}

function ListaLiquidados<T extends { id: string }>({
  data,
  fields,
  scrollY,
  hideTitle,
  title = 'Materiales Liquidados',
}: Props<T>) {
  return (
    <View>
      {!hideTitle && (
        <Text style={styles.externalTitle}>{title}</Text>
      )}
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={
          scrollY
            ? Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )
            : undefined
        }
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.listContainer}>
                {fields.map(field => (
                  <View style={styles.row} key={String(field.key)}>
                    {field.icon && (
                      <MaterialIcons
                        name={field.icon}
                        style={{ marginRight: 6 }}
                      />
                    )}
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>{field.label}:</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.description}>
                        {String(item[field.key] ?? '')}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
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
