import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useRoute, useNavigation} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';

const MapsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {latitude, longitude, label, description} = route.params as {
    latitude: number;
    longitude: number;
    label: string;
    description: string;
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        <Marker
          coordinate={{latitude, longitude}}
          title={label}
          description={description}
        />
      </MapView>

      {/* Botón flotante */}
      <IconButton
        icon="arrow-left"
        size={28}
        mode="contained"
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'white',
    elevation: 5,
    zIndex: 999,
  },
});

export default MapsScreen;
