import {FlatList, StyleSheet, View} from 'react-native';
import {globalStyle} from '../../../../styles/globalStyle';
import CustomSwitch from '../../../../components/ui/CustomSwitch';
import {useEffect} from 'react';
import {useMateObras} from './hooks/useMateObras';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import Toast from 'react-native-toast-message';
import SinResultados from '../../../../components/ui/SinResultados';
import {ItemMateLiqui} from './components/ItemMateLiqui';
import {CustomFAB} from '../../../../components/ui/CustomFAB';

export const MaterialesObraScreen = () => {
  const {
    dataMateriales,
    isFetchMateriales,
    errorMateriales,
    isRegulariza,
    refetchMateriales,
    handleRegularizarMateriales,
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
    <View style={globalStyle.container}>
      {isFetchMateriales && <FullScreenLoader transparent />}

      <View style={[globalStyle.padding, {flex: 1}]}>
        {/* <Text variant="titleLarge" style={styles.title}>
          Materiales Liquidados
        </Text> */}
        {/* <Divider style={styles.divider} /> */}
        <CustomSwitch
          isOn={isRegulariza}
          onChange={value => handleRegularizarMateriales(value)}
          text="Regularizar materiales"
        />
        <View style={{marginVertical: 8}} />
        {/* <Divider style={styles.divider} /> */}

        {dataMateriales?.materiales && dataMateriales.materiales.length > 0 ? (
          <FlatList
            data={dataMateriales?.materiales}
            keyExtractor={item => item.cont_correlativo}
            refreshing={isFetchMateriales}
            onRefresh={refetchMateriales}
            renderItem={({item}) => <ItemMateLiqui mate={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{gap: 16}}
          />
        ) : (
          <SinResultados message="No hay materiales liquidados" />
        )}
      </View>

      <CustomFAB icon="plus" onPress={() => {}} style={styles.fab} />
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
  fab: {
    bottom: 16,
    right: 16,
  },
});
