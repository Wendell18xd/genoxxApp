import {FlatList, View, ViewToken} from 'react-native';
import {globalStyle} from '../../../../styles/globalStyle';
import {Formik, FormikProps} from 'formik';
import {
  initialValuesProps,
  useDetalleMaterialesCampoScreen,
} from './hooks/useDetalleMaterialesCampoScreen';
import DatosInicialesForm from './components/DatosInicialesForm';
import {CustomFAB} from '../../../../components/ui/CustomFAB';
import CustomKeyboardAvoidingView from '../../../../components/ui/CustomKeyboardAvoidingView';
import {useEffect, useRef} from 'react';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';
import ItemFotoRecepcion from './components/ItemFotoRecepcion';
import ImageViewing from 'react-native-image-viewing';
import PrimaryButton from '../../../../components/ui/PrimaryButton';
import {useSharedValue} from 'react-native-reanimated';
import {Foto} from '../../../../../domain/entities/Foto';

const DetalleMaterialesCampoScreen = () => {
  const formikRef = useRef<FormikProps<initialValuesProps>>(null);
  const flatListRef = useRef<FlatList<any>>(null);
  const {
    isSaving,
    initialValues,
    isRendering,
    indexSeleccionado,
    visible,
    getValidationSchema,
    abrirVisor,
    setVisible,
    handleCamera,
    onResetFotos,
    handleDeleteFoto,
    handleChangeDescriptionFoto,
    handleSaveMaterialesCampo,
  } = useDetalleMaterialesCampoScreen(formikRef);

  const viewableItems = useSharedValue<ViewToken<Foto>[]>([]);

  useEffect(() => {
    return () => {
      onResetFotos();
    };
  }, []);

  return (
    <View style={globalStyle.defaultContainer}>
      {isRendering && <FullScreenLoader message="Cargando fotos" transparent />}
      {isSaving && (
        <FullScreenLoader message="Grabando" transparent />
      )}

      <CustomKeyboardAvoidingView keyboardVerticalOffset={150}>
        <Formik
          enableReinitialize
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={getValidationSchema}
          onSubmit={values => {
            handleSaveMaterialesCampo(values);
          }}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setFieldValue,
            handleSubmit,
          }) => (
            <>
              <FlatList
                ref={flatListRef}
                keyboardShouldPersistTaps="handled"
                data={values.fotos}
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={({viewableItems: vItems}) => {
                  viewableItems.value = vItems;
                }}
                onContentSizeChange={() => {
                  requestAnimationFrame(() => {
                    flatListRef.current?.scrollToEnd({animated: true});
                  });
                }}
                renderItem={({item, index}) => (
                  <ItemFotoRecepcion
                    item={item}
                    viewableItems={viewableItems}
                    onPress={() => abrirVisor(index)}
                    onRemove={() => {
                      handleDeleteFoto(index, values, setFieldValue);
                    }}
                    onChangeDescripcion={text => {
                      handleChangeDescriptionFoto(
                        index,
                        values,
                        text,
                        setFieldValue,
                      );
                    }}
                  />
                )}
                keyExtractor={item => item.foto}
                contentContainerStyle={{gap: 20}}
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
                ListFooterComponent={
                  values.fotos.length > 0 ? (
                    <>
                      <PrimaryButton
                        label="Enviar"
                        icon="content-save"
                        onPress={handleSubmit}
                        debounce
                        style={{width: '100%'}}
                      />
                      <View style={{marginBottom: 65}} />
                    </>
                  ) : (
                    <View style={{marginBottom: 65}} />
                  )
                }
              />

              <ImageViewing
                images={values.fotos.map(foto => ({
                  uri: foto.foto,
                }))}
                imageIndex={indexSeleccionado}
                visible={visible}
                onRequestClose={() => setVisible(false)}
                backgroundColor="black"
              />
            </>
          )}
        </Formik>
      </CustomKeyboardAvoidingView>

      <CustomFAB
        icon="camera"
        onPress={handleCamera}
        style={{bottom: 16, right: 16}}
      />
    </View>
  );
};

export default DetalleMaterialesCampoScreen;
