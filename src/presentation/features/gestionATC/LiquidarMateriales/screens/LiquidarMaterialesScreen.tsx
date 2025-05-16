

import React, {useState} from 'react';
import {Banner, Button, Text, TextInput, useTheme} from 'react-native-paper';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import { StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-paper-dropdown';
import {ScrollView} from 'react-native-gesture-handler';
import CustomDatePicker from '../../../../components/ui/CustomDatePicker';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParam} from '../../../../navigations/AuthStackNavigation';
import {Formik} from 'formik';
import PrimaryButton from '../../../../components/ui/PrimaryButton';
import { useAuthStore } from '../../../../store/auth/useAuthStore';

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

interface Props
  extends StackScreenProps<AuthStackParam, 'LiquidarMaterialesScreen'> {}

const LiquidarMaterialesScreen = ({navigation}: Props) => {
  const {colors} = useTheme();
  const [formValues, setFormValues] = useState<LiquidarMatFormValues>(initialValues);
  const [disabled, setDisabled] = useState(false);
  const [visible, setVisible] = React.useState(true);
  const {liquidar} = useAuthStore();

  const startLiqMatSubmit = (values: LiquidarMatFormValues) => {
    const LiqMatData = {
      proyecto: values.proyecto,
      fechaLiquidacion: values.fechaLiquidacion,
      tipoLiquidacion: values.tipoLiquidacion,
      nroSolicitud: values.nroSolicitud,
      nroPeticion: values.nroPeticion,
    };

    LiqMatMutation.mutate(LiqMatData);
  };

  return (
    <DrawerLayout primary curvaHeight={80}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      {!visible && (
        <View style={{alignItems: 'center', marginVertical: 12}}>
          <Button
            mode="elevated"
            icon="chevron-down"
            onPress={() => setVisible(true)}
            style={{
              width: '92%', // Ajusta este valor para que coincida con el ancho del Banner
              justifyContent: 'flex-start', // Alinea el contenido a la izquierda
              alignSelf: 'center', // Centra el botón en el contenedor
              paddingLeft: 8, // Espacio a la izquierda para el icono y texto
            }}
            contentStyle={{
              flexDirection: 'row-reverse', // Para que el icono quede a la izquierda del texto
              justifyContent: 'flex-start',
            }}
            labelStyle={{
              textAlign: 'left',
              flex: 1,
            }}>
            Mostrar Filtros
          </Button>
        </View>
      )}
      <>
        <Banner
          visible={visible}
          actions={[]}
          style={{borderRadius: 32, margin: 16, paddingBottom: 0}}>
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
              <View style={{padding: 8, width: '100%'}}>
                <Text variant="titleLarge">Filtros</Text>
                <View style={{marginBottom: 12}}>
                  <Dropdown
                    label="Proyecto"
                    placeholder="Seleccione un proyecto"
                    mode="outlined"
                    options={[]}
                    value={values.proyecto}
                    onSelect={val => setFieldValue('proyecto', val)}
                  />
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
                <View style={{marginBottom: 12}}>
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
                  <View style={{marginBottom: 12}}>
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
                  <View style={{marginBottom: 12}}>
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
        </Banner>
      </>
      {/* </ScrollView> */}
    </DrawerLayout>
  );
};

export default LiquidarMaterialesScreen;


const styles = StyleSheet.create({
card: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 20,
  },
});
// export const LiquidarMaterialesScreen = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false); // Estado para controlar si el formulario está colapsado
//   const [tipoRequerimiento, setTipoRequerimiento] = useState(''); // Estado para el tipo de requerimiento

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed); // Alternar entre expandido y colapsado
//   };

//   return (
//     <View style={styles.container}>
//       {!isCollapsed && ( // Mostrar el formulario solo si no está colapsado
//         <Card style={styles.card}>
//           <Card.Content>
//             <Text style={styles.label}>Proyecto</Text>
//             <TextInput
//               placeholder="Seleccione un proyecto"
//               style={styles.input}
//             />

//             <Text style={styles.label}>Fecha de Liquidación</Text>
//             <CustomDatePicker
//               label="Fecha de Liquidación"
//               placeholder="Seleccione una fecha"
//               value={''} // Reemplaza con el valor correspondiente
//               style={{marginBottom: 8}}
//               onChange={() => {}} // Reemplaza con la función correspondiente
//             />

//             <Text style={styles.label}>Tipo de requerimiento</Text>
//             <TextInput
//               placeholder="Seleccione el tipo de requerimiento"
//               style={styles.input}
//               value={tipoRequerimiento}
//               onChangeText={setTipoRequerimiento} // Actualizar el estado al cambiar el texto
//             />

//             {/* Mostrar el campo solo si se seleccionó un tipo de requerimiento */}
//             {tipoRequerimiento !== '' && (
//               <>
//                 <Text style={styles.label}>
//                   {tipoRequerimiento === 'Solicitud'
//                     ? 'Nro de Solicitud'
//                     : 'Nro de Petición'}
//                 </Text>
//                 <TextInput
//                   placeholder={
//                     tipoRequerimiento === 'Solicitud'
//                       ? 'Ingrese el número de solicitud'
//                       : 'Ingrese el número de petición'
//                   }
//                   style={styles.input}
//                 />
//               </>
//             )}

//             <Button
//               mode="contained"
//               icon="magnify"
//               onPress={toggleCollapse} // Colapsar el formulario al presionar "Buscar"
//               style={styles.button}
//               buttonColor="#007bff">
//               Buscar
//             </Button>
//           </Card.Content>
//         </Card>
//       )}

//       {isCollapsed && ( // Mostrar el botón para expandir si el formulario está colapsado
//         <Button
//           mode="outlined"
//           icon="chevron-down"
//           onPress={toggleCollapse}
//           style={styles.expandButton}>
//           Mostrar Filtros
//         </Button>
//       )}

//       <View style={styles.badgeContainer}>
//         <Badge size={28} style={styles.badge}>
//           Pendientes: 1116
//         </Badge>
//       </View>
//     </View>
//   );
// };

// export default LiquidarMaterialesScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 40,
//     paddingHorizontal: 16,
//     backgroundColor: '#f8f9fa',
//   },
//   card: {
//     borderRadius: 16,
//     elevation: 3,
//   },
//   label: {
//     fontSize: 16,
//     marginTop: 12,
//     marginBottom: 4,
//     fontWeight: '600',
//   },
//   input: {
//     backgroundColor: 'white',
//   },
//   button: {
//     marginTop: 24,
//     borderRadius: 8,
//     paddingVertical: 6,
//   },
//   expandButton: {
//     marginTop: 16,
//     alignSelf: 'center',
//   },
//   badgeContainer: {
//     position: 'absolute',
//     bottom: 24,
//     right: 16,
//   },
//   badge: {
//     backgroundColor: '#ffc107',
//     color: '#000',
//     fontWeight: 'bold',
//     fontSize: 14,
//     paddingHorizontal: 12,
//   },
// });
