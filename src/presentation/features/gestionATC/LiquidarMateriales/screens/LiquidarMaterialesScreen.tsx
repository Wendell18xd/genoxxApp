import React, {useEffect, useState} from 'react';
import {Card, Text, TextInput, useTheme} from 'react-native-paper';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-paper-dropdown';
import {FlatList} from 'react-native-gesture-handler';
import CustomDatePicker from '../../../../components/ui/CustomDatePicker';
import MaterialIcons from '../../../../components/ui/icons/MaterialIcons';
import {Formik} from 'formik';
import PrimaryButton from '../../../../components/ui/PrimaryButton';
import {useMutation, useQuery} from '@tanstack/react-query';
import {mapToDropdown} from '../../../../../infrastructure/mappers/mapToDropdown';
import {LiquiMatATCStackParam} from '../navigations/LiquiMatATCStackNavigation';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getProyecto} from '../../../../../actions/gestionATC/proyectosATC';
import {useAuthStore} from '../../../../store/auth/useAuthStore';
import FullScreenLoader from '../../../../components/ui/loaders/FullScreenLoader';

interface LiquidarMatFormValues {
  proyecto: string;
  fechaLiquidacion: string;
  tipoLiquidacion: string;
  nroSolicitud: string;
  nroPeticion: string;
}

const initialValues: LiquidarMatFormValues = {
  proyecto: '',
  fechaLiquidacion: '',
  tipoLiquidacion: '',
  nroSolicitud: '',
  nroPeticion: '',
};

const LiquidarMaterialesScreen = () => {
  const navigation = useNavigation<NavigationProp<LiquiMatATCStackParam>>();
  const [formValues, setFormValues] =
    useState<LiquidarMatFormValues>(initialValues);
  const {user} = useAuthStore();
  const [disabled, setDisabled] = useState(false);
  const [visible, setVisible] = React.useState(true);

  // const getLiquidarShema = (arrProyectos: Option[] | undefined) =>
  //   Yup.object().shape({
  //     proyecto: Yup.string().when([], {
  //       is: () => arrProyectos && arrProyectos.length > 0,
  //       then: schema => schema.required('Seleccione un proyecto'),
  //       otherwise: schema => schema.notRequired(),
  //     }),
  //   });

  const {
    data: proyectos,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['proyectosATC'],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const resp = await getProyecto({
        vl_empr_codigo: user?.empr_codigo || '',
      });
      return mapToDropdown(resp.datos, 'proy_alias', 'proy_codigo');
    },
  });

  /* const LiqMatMutation = useMutation({
    mutationFn: getProyecto,
    onSuccess: async data => {
      const {proy_tipo} = data.datos;
      if (proy_tipo === 'ATC') {
        const arrProyecto = Array.isArray(data.datos)
          ? data.datos
          : [data.datos];
        if (arrProyecto.length > 0) {
          const options = mapToDropdown(
            arrProyecto,
            'proy_codigo',
            'proy_alias',
          );
          setProyectos(options);
          setDisabled(true);
        }
      }
    },
  }); */

  /*   const fetchProyectos = async () => {
    setLoadingProyectos(true);
    try {
      const response = await getProyecto({
        datos: [
          {
            proy_codigo: '',
            proy_alias: '',
            proy_tipo: '',
          },
        ],
        mensaje: 'Consulta de Proyectos',
      });
      // Supón que response.datos es un array de proyectos
      const arrProyecto = Array.isArray(response.datos)
        ? response.datos
        : [response.datos];
      const options = mapToDropdown(arrProyecto, 'proy_codigo', 'proy_alias');
      setProyectos(options);
    } catch (error) {
      setProyectos([]);
    }
    setLoadingProyectos(false);
  }; */

  const [resultados, setResultados] = useState([
    {
      id: 1,
      nroPeticion: '00001',
      nroSolicitud: '00001',
      telefono: '999999999',
      tipoOrden: 'MTR',
      fechaLiq: 'Reposición',
    },
    {
      id: 2,
      nroPeticion: '00002',
      nroSolicitud: '00002',
      telefono: '999999999',
      tipoOrden: 'ABC',
      fechaLiq: '',
    },
  ]);

  const startLiqMatSubmit = (values: LiquidarMatFormValues) => {
    const LiqMatData = {
      proyecto: values.proyecto,
      fechaLiquidacion: values.fechaLiquidacion,
      tipoLiquidacion: values.tipoLiquidacion,
      nroSolicitud: values.nroSolicitud,
      nroPeticion: values.nroPeticion,
    };

    // LiqMatMutation.mutate(LiqMatData);
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isFetching) {
    return <FullScreenLoader />;
  }

  return (
    <DrawerLayout primary curvaHeight={80}>
      {/* {!visible && (
        <View style={{alignItems: 'center', marginVertical: 12}}>
          <Button
            mode="elevated"
            icon="chevron-down"
            onPress={() => setVisible(true)}
            style={{
              width: '92%',
              justifyContent: 'flex-start',
              alignSelf: 'center',
              paddingLeft: 8,
            }}
            contentStyle={{
              flexDirection: 'row-reverse',
              justifyContent: 'flex-start',
            }}
            labelStyle={{
              textAlign: 'left',
              flex: 1,
            }}>
            Mostrar Filtros
          </Button>
        </View>
      )} */}
      <>
        <Card style={styles.card}>
          <Formik
            initialValues={formValues}
            onSubmit={values => {
              startLiqMatSubmit(values);
              setVisible(false);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View style={{padding: 24}}>
                {/* <Text variant="titleLarge">Filtros</Text> */}
                <View style={{marginTop: 12, marginBottom: 12}}>
                  {proyectos && (
                    <Dropdown
                      label="Proyecto"
                      placeholder="Seleccione un proyecto"
                      mode="outlined"
                      options={proyectos}
                      value={values.proyecto}
                      onSelect={val => setFieldValue('proyecto', val)}
                    />
                  )}
                </View>
                <View style={{marginBottom: 12}}>
                  <CustomDatePicker
                    label="Fecha de Liquidación"
                    placeholder="Selecciona la fecha"
                    value={values.fechaLiquidacion}
                    onChange={val => setFieldValue('fechaLiquidacion', val)}
                    error={
                      touched.fechaLiquidacion && !!errors.fechaLiquidacion
                    }
                  />
                </View>
                {/* <View style={{marginBottom: 12}}>
                 */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 12,
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 1.2, marginRight: 8}}>
                    <Dropdown
                      label="Tipo de Liquidación"
                      placeholder="Seleccione un tipo de liquidación"
                      mode="outlined"
                      options={[
                        {label: 'Solicitud', value: 'Solicitud'},
                        {label: 'Petición', value: 'Petición'},
                      ]}
                      value={values.tipoLiquidacion}
                      onSelect={val => setFieldValue('tipoLiquidacion', val)}
                    />
                  </View>
                  {values.tipoLiquidacion === 'Solicitud' && (
                    <View style={{flex: 2}}>
                      <CustomTextInput
                        label="Número de Solicitud"
                        mode="outlined"
                        autoCapitalize="characters"
                        value={values.nroSolicitud}
                        onChangeText={handleChange('nroSolicitud')}
                        onBlur={handleBlur('nroSolicitud')}
                        error={touched.nroSolicitud && !!errors.nroSolicitud}
                        left={<TextInput.Icon icon="text-box-outline" />}
                        disabled={disabled}
                      />
                    </View>
                  )}
                  {values.tipoLiquidacion === 'Petición' && (
                    <View style={{flex: 2}}>
                      <CustomTextInput
                        label="Número de Petición"
                        mode="outlined"
                        value={values.nroPeticion}
                        onChangeText={handleChange('nroPeticion')}
                        onBlur={handleBlur('nroPeticion')}
                        error={touched.nroPeticion && !!errors.nroPeticion}
                        left={<TextInput.Icon icon="text-box-outline" />}
                        disabled={disabled}
                      />
                    </View>
                  )}
                </View>
                <PrimaryButton
                  onPress={() => {
                    handleSubmit();
                    setVisible(false);
                  }}
                  // loading={loginMutation.isPending}
                  // disabled={loginMutation.isPending}
                  style={{marginTop: 8}}>
                  Buscar
                </PrimaryButton>
              </View>
            )}
          </Formik>
        </Card>
      </>
      <>
        {!visible && (
          <FlatList
            data={resultados}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{paddingBottom: 16}}
            renderItem={({item}) => (
              <Card style={styles.card}>
                <Card.Content>
                  <View style={styles.listContainer}>
                    <View style={styles.row}>
                      <MaterialIcons
                        name="package-variant-closed"
                        style={{marginRight: 6}}
                      />
                      <View style={styles.titleContainer}>
                        <Text style={styles.title}>Número de Petición:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>
                          {item.nroPeticion}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <MaterialIcons name="cube" style={{marginRight: 6}} />
                      <View style={styles.titleContainer}>
                        <Text style={styles.title}>Número de Solicitud:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>
                          {item.nroSolicitud}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <MaterialIcons name="tag" style={{marginRight: 6}} />
                      <View style={styles.titleContainer}>
                        <Text style={styles.title}>Teléfono:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{item.telefono}</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <MaterialIcons
                        name="package-variant"
                        style={{marginRight: 6}}
                      />
                      <View style={styles.titleContainer}>
                        <Text style={styles.title}>Tipo de Orden:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{item.tipoOrden}</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <MaterialIcons
                        name="comment-text"
                        style={{marginRight: 6}}
                      />
                      <View style={styles.titleContainer}>
                        <Text style={styles.title}>Fecha de Liquidación:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{item.fechaLiq}</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <MaterialIcons
                        name="comment-text"
                        style={{marginRight: 6}}
                      />
                      <View style={styles.titleContainer}>
                        <Text style={styles.title}>Estado de Material:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{item.finalizaMaterial}</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <MaterialIcons
                        name="comment-text"
                        style={{marginRight: 6}}
                      />
                      <View style={styles.titleContainer}>
                        <Text style={styles.title}>Estado de Orden:</Text>
                      </View>
                      <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{item.estCierre}</Text>
                      </View>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            )}
          />
        )}
      </>
    </DrawerLayout>
  );
};

export default LiquidarMaterialesScreen;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    elevation: 2,
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: '#fff',
  },
  listContainer: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    flexWrap: 'wrap',
    gap: 4, // puedes ajustar esto según lo necesites
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
  },
  titleContainer: {
    width: 170, // o el valor que mejor se ajuste al texto más largo
  },
  descriptionContainer: {
    flex: 2,
  },
});
