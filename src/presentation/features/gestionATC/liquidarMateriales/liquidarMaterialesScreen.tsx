import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-gesture-handler';
import { Badge, Button, Card } from 'react-native-paper';

export const LiquidarMaterialesScreen = () => {
  //  const [project, setProject] = React.useState('');
  // const [date, setDate] = React.useState('12/05/2025');
  // const [petition, setPetition] = React.useState('');
  return (
     <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Proyecto</Text>
          <TextInput
            // mode="outlined"
            placeholder="Seleccione un proyecto"
            // value={project}
            // onChangeText={setProject}
            // right={<TextInput.Icon icon="chevron-down" />}
            style={styles.input}
          />


          <Text style={styles.label}>Fecha de Liquidación</Text>
          <TextInput
            // mode="outlined"
            // value={date}
            // onChangeText={setDate}
            style={styles.input}
          />
          <Text style={styles.label}>Tipo de requerimiento</Text>
          <TextInput
            // mode="outlined"
            placeholder="Seleccione el tipo de requerimiento"
            // value={project}
            // onChangeText={setProject}
            // right={<TextInput.Icon icon="chevron-down" />}
            style={styles.input}
          />

          <Text style={styles.label}>Nro de Petición</Text>
          <TextInput
            // mode="outlined"
            placeholder="Buscar..."
            // value={petition}
            // onChangeText={setPetition}
            style={styles.input}
          />

          <Button
            mode="contained"
            icon="magnify"
            onPress={() => {}}
            style={styles.button}
          >
            Buscar
          </Button>
        </Card.Content>
      </Card>

      <View style={styles.badgeContainer}>
        <Badge size={28} style={styles.badge}>
          Pendientes: 1116
        </Badge>
      </View>
    </View>
  );
};
export default LiquidarMaterialesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
  },
  card: {
    borderRadius: 16,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
  },
  button: {
    marginTop: 24,
    borderRadius: 8,
    paddingVertical: 6,
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 24,
    right: 16,
  },
  badge: {
    backgroundColor: '#ffc107',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 12,
  },
});
