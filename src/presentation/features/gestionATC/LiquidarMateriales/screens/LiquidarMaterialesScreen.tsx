import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, TextInput} from 'react-native-gesture-handler';
import {Badge, Button, Card} from 'react-native-paper';
import CustomDatePicker from '../../../../components/ui/CustomDatePicker';

export const LiquidarMaterialesScreen = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Estado para controlar si el formulario está colapsado
  const [tipoRequerimiento, setTipoRequerimiento] = useState(''); // Estado para el tipo de requerimiento

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed); // Alternar entre expandido y colapsado
  };

  return (
    <View style={styles.container}>
      {!isCollapsed && ( // Mostrar el formulario solo si no está colapsado
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.label}>Proyecto</Text>
            <TextInput
              placeholder="Seleccione un proyecto"
              style={styles.input}
            />

            <Text style={styles.label}>Fecha de Liquidación</Text>
            <CustomDatePicker
              label="Fecha de Liquidación"
              placeholder="Seleccione una fecha"
              value={''} // Reemplaza con el valor correspondiente
              style={{marginBottom: 8}}
              onChange={() => {}} // Reemplaza con la función correspondiente
            />

            <Text style={styles.label}>Tipo de requerimiento</Text>
            <TextInput
              placeholder="Seleccione el tipo de requerimiento"
              style={styles.input}
              value={tipoRequerimiento}
              onChangeText={setTipoRequerimiento} // Actualizar el estado al cambiar el texto
            />

            {/* Mostrar el campo solo si se seleccionó un tipo de requerimiento */}
            {tipoRequerimiento !== '' && (
              <>
                <Text style={styles.label}>
                  {tipoRequerimiento === 'Solicitud'
                    ? 'Nro de Solicitud'
                    : 'Nro de Petición'}
                </Text>
                <TextInput
                  placeholder={
                    tipoRequerimiento === 'Solicitud'
                      ? 'Ingrese el número de solicitud'
                      : 'Ingrese el número de petición'
                  }
                  style={styles.input}
                />
              </>
            )}

            <Button
              mode="contained"
              icon="magnify"
              onPress={toggleCollapse} // Colapsar el formulario al presionar "Buscar"
              style={styles.button}
              buttonColor="#007bff">
              Buscar
            </Button>
          </Card.Content>
        </Card>
      )}

      {isCollapsed && ( // Mostrar el botón para expandir si el formulario está colapsado
        <Button
          mode="outlined"
          icon="chevron-down"
          onPress={toggleCollapse}
          style={styles.expandButton}>
          Mostrar Filtros
        </Button>
      )}

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
  expandButton: {
    marginTop: 16,
    alignSelf: 'center',
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
