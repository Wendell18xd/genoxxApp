import {FlatList, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {ItemObra} from './components/ItemObra';
import {useObrasMaterialesCampo} from './hooks/useObrasMaterialesCampo';
import SinResultados from '../../../../components/ui/SinResultados';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import CustomBottomSheet from '../../../../components/ui/bottomSheetModal/CustomBottomSheet';
import {SearchObrasMaterialesCampo} from './components/SearchObrasMaterialesCampo';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import Toast from 'react-native-toast-message';
import {useQueryClient} from '@tanstack/react-query';

const ListarObrasMaterialesCampoScreen = () => {
  const {
    ref,
    obras,
    isFetchObras,
    errorObras,
    initialValues,
    close,
    handleSelectObra,
    handleOpenSearch,
    handleSearch,
    getValidationSchema,
    refetchObras,
  } = useObrasMaterialesCampo();
  const [searchQuery, setSearchQuery] = useState('');
  const [obrasFilter, setObrasFilter] = useState(obras);
  const queryClient = useQueryClient();

  useEffect(() => {
    setObrasFilter(obras);
  }, [obras]);

  useEffect(() => {
    if (errorObras) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener las obras',
      });
    }
  }, [errorObras]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['obrasAsignadasMateCampo'],
      });
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      {isFetchObras && <FullScreenLoader transparent />}

      {obras && obras.length > 0 ? (
        <>
          <Searchbar
            placeholder="Filtrar por nro de orden"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{marginHorizontal: 16, marginTop: 16}}
          />

          <FlatList
            data={obrasFilter?.filter(obra =>
              obra.nro_orden?.toLowerCase().includes(searchQuery.toLowerCase()),
            )}
            keyExtractor={item => item.regi_codigo}
            contentContainerStyle={{gap: 16, padding: 16}}
            refreshing={isFetchObras}
            onRefresh={refetchObras}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <ItemObra
                obra={item}
                onPress={() => {
                  handleSelectObra(item);
                }}
              />
            )}
          />
        </>
      ) : (
        <SinResultados message="No se encontraron obras, use la lupa para buscar" />
      )}

      <CustomFAB
        icon="magnify"
        onPress={handleOpenSearch}
        style={{bottom: 16, right: 16}}
      />

      <CustomBottomSheet ref={ref}>
        <SearchObrasMaterialesCampo
          onClose={close}
          initialValues={initialValues}
          handleSearch={handleSearch}
          getValidationSchema={getValidationSchema}
        />
      </CustomBottomSheet>
    </View>
  );
};

export default ListarObrasMaterialesCampoScreen;
