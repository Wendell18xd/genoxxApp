import {FlatList, View} from 'react-native';
import {globalStyle} from '../../../../styles/globalStyle';
import {Formik} from 'formik';
import {useDetalleMaterialesCampoScreen} from './hooks/useDetalleMaterialesCampoScreen';
import DatosInicialesForm from './components/DatosInicialesForm';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import CustomKeyboardAvoidingView from '../../../../components/ui/CustomKeyboardAvoidingView';
import {useEffect} from 'react';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import ItemFotoRecepcion from './components/ItemFotoRecepcion';
import ImageViewing from 'react-native-image-viewing';

const DetalleMaterialesCampoScreen = () => {
  const {
    initialValues,
    fotos,
    isRendering,
    indexSeleccionado,
    visible,
    abrirVisor,
    setVisible,
    handleCamera,
    onResetFotos,
  } = useDetalleMaterialesCampoScreen();

  useEffect(() => {
    return () => {
      onResetFotos();
    };
  }, []);

  return (
    <View style={globalStyle.defaultContainer}>
      {isRendering && <FullScreenLoader message="Cargando fotos" transparent />}

      <CustomKeyboardAvoidingView>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={() => {}}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setFieldValue,
          }) => (
            <>
              <FlatList
                keyboardShouldPersistTaps="handled"
                data={fotos}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <ItemFotoRecepcion
                    item={item}
                    index={index}
                    onPress={() => abrirVisor(index)}
                  />
                )}
                keyExtractor={item => item.foto}
                contentContainerStyle={{gap: 16}}
                ListHeaderComponent={
                  <DatosInicialesForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                }
              />
            </>
          )}
        </Formik>
      </CustomKeyboardAvoidingView>

      <ImageViewing
        images={fotos.map(foto => ({
          uri: foto.foto,
        }))}
        imageIndex={indexSeleccionado}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        backgroundColor="black"
      />

      <CustomFAB
        icon="camera"
        onPress={handleCamera}
        style={{bottom: 16, right: 16}}
      />
    </View>
  );
};

export default DetalleMaterialesCampoScreen;
