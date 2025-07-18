import DrawerLayout from '../../../main/layout/DrawerLayout';
import {useEffect, useState} from 'react';
import {SectionList, View} from 'react-native';
import {useBottomSheetModal} from '../../../../hooks/useBottomSheet';
import {useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {Searchbar, Text} from 'react-native-paper';
import SinResultados from '../../../../components/ui/SinResultados';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import {ItemDocumento} from './components/ItemDocumento';
import CustomBottomSheet from '../../../../components/ui/bottomSheetModal/CustomBottomSheet';
import {useSearchDocumentos} from './hooks/useSearchDocumentos';
import {SearchDocumentos} from './components/SearchDocumentos';
import {Dato} from '../../../../../domain/entities/VerDocumentos';

export const VerDocumentosScreen = () => {
  const {
    consulta,
    errorConsulta,
    isFetchConsulta,
    refetchConsulta,
  } = useSearchDocumentos();

  const {ref, open, close} = useBottomSheetModal();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (errorConsulta) {
      Toast.show({
        type: 'error',
        text1: 'Error al obtener la consulta',
      });
    }
  }, [errorConsulta]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['verDocumentos'],
      });
    };
  }, []);

  const renderSecciones = (datos: Dato[], filtro: string) => {
    return datos
      .filter(grupo =>
        grupo.nom_grupo.toLowerCase().includes(filtro.toLowerCase()),
      )
      .map(grupo => ({
        title: grupo.nom_grupo,
        data: grupo.arrHijos,
      }));
  };

  return (
    <DrawerLayout title="Ver Documentos">
      <View style={{flex: 1}}>
        {consulta && consulta.length > 0 ? (
          <>
            <Searchbar
              placeholder="Filtrar por grupo de documentos"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={{marginHorizontal: 16, marginTop: 16}}
            />

            <SectionList
              sections={renderSecciones(consulta ?? [], searchQuery)}
              keyExtractor={(item, index) => item.cod_documento + index}
              contentContainerStyle={{padding: 16, gap: 16}}
              refreshing={isFetchConsulta}
              onRefresh={refetchConsulta}
              showsVerticalScrollIndicator={false}
              renderSectionHeader={({section}) => (
                <Text
                  variant="titleMedium"
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginTop: 4,
                    marginBottom: 4,
                  }}>
                  {section.title}
                </Text>
              )}
              renderItem={({item}) => (
                <ItemDocumento
                  consulta={item}
                />
              )}
            />
          </>
        ) : (
          <SinResultados message="No se encontraron resultados, use la lupa para buscar" />
        )}

        <CustomFAB
          icon="magnify"
          onPress={open}
          style={{bottom: 16, right: 16}}
        />

        <CustomBottomSheet ref={ref}>
          <SearchDocumentos onClose={close} />
        </CustomBottomSheet>
      </View>
    </DrawerLayout>
  );
};
