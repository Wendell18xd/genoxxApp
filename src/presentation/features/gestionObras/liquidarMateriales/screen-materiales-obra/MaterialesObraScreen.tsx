import {StyleSheet, View} from 'react-native';
import {globalStyle} from '../../../../styles/globalStyle';
import {Divider, Text} from 'react-native-paper';
import CustomSwitch from '../../../../components/ui/CustomSwitch';
import {useEffect, useState} from 'react';
import {useMateObras} from './hooks/useMateObras';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import Toast from 'react-native-toast-message';

export const MaterialesObraScreen = () => {
  const [isRegulariza, setIsRegulariza] = useState(false);
  const {
    dataMateriales,
    isFetchMateriales,
    errorMateriales,
    refetchMateriales,
  } = useMateObras();

  useEffect(() => {
    refetchMateriales();
  }, []);

  useEffect(() => {
    if (errorMateriales) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener materiales liquidados',
      });
    }
  }, [errorMateriales]);

  return (
    <View style={(globalStyle.container, globalStyle.padding)}>
      {isFetchMateriales && <FullScreenLoader transparent />}

      <Text variant="titleLarge" style={styles.title}>
        Materiales Liquidados
      </Text>
      <Divider style={styles.divider} />
      <CustomSwitch
        isOn={isRegulariza}
        onChange={value => setIsRegulariza(value)}
        text="Regularizar materiales"
      />
      <Divider style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  divider: {
    marginVertical: 16,
  },
});
