import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Cargando...',
}) => {
  const {colors} = useTheme(); // Usamos los colores del tema actual

  return (
    <View
      style={[styles.container]}>
      {/* Fondo con opacidad */}
      <ActivityIndicator size="large" color={colors.primary} />
      <Text variant="bodyMedium" style={[styles.text]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Para asegurarnos de que ocupe toda la pantalla
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semitransparente
    zIndex: 9999, // Asegura que esté por encima de otros componentes
  },
  text: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default LoadingScreen;
