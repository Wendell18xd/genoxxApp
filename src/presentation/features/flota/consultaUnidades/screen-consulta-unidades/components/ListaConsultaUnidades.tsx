import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ConsultaUnidades} from '../../../../../../domain/entities/ConsultaUnidades';
import {FlatList} from 'react-native-gesture-handler';
import {Card} from 'react-native-paper';
import MaterialIcons from '../../../../../components/ui/icons/MaterialIcons';

interface Props {
  consulta: ConsultaUnidades[];
  onPressItem: (item: ConsultaUnidades) => void;
}

export const ListaConsultaUnidades = ({consulta, onPressItem}: Props) => {
  return (
    <View>
      <FlatList
        data={consulta}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => onPressItem(item)}>
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.listContainer}>
                  <View style={styles.row}>
                    <MaterialIcons name="car-side" style={{marginRight: 6}} />
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>Número de Placa:</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.description}>{item.nro_placa}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.listContainer}>
                  <View style={styles.row}>
                    <MaterialIcons name="account" style={{marginRight: 6}} />
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>Conductor:</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.description}>
                        {item.nom_conductor}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.listContainer}>
                  <View style={styles.row}>
                    <MaterialIcons
                      name="view-headline"
                      style={{marginRight: 6}}
                    />
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>Situación:</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.description}>
                        {item.nom_situacion}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
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
