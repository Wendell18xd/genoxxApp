import {RouteProp, useRoute} from '@react-navigation/native';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {ConsultaUnidadesStackParam} from '../navigations/ConsultaUnidadesStackNavigation';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import {ScrollView} from 'react-native-gesture-handler';
import {format, parseISO} from 'date-fns';

export const DetalleConsultaScreen = () => {
  const {consulta} =
    useRoute<RouteProp<ConsultaUnidadesStackParam, 'DetalleConsultaScreen'>>()
      .params;

  const formatearFecha = (fechaString?: string | null): string => {
    if (!fechaString) {
      return '';
    }
    if (fechaString.includes('1900')) {
      return '';
    }

    try {
      const fecha = parseISO(fechaString);
      return format(fecha, 'dd/MM/yyyy');
    } catch (error) {
      return '';
    }
  };

  const camposConFormatoFecha = [
    'Fecha Situación',
    'Fecha de Odómetro',
    'Vencimiento de Revisión Técnica',
    'Vencimiento de Emisión de Gases',
    'Vencimiento de Licencia de Conducir',
    'Vencimiento de Nro. de Documento',
  ];

  const camposBooleanos = [
    'GPS Empresa',
    'Sello Alto',
    'Reg Saip',
    'Branding Movistar',
  ];

  const convertirABooleano = (valor: any) => {
    if (valor === '1') {
      return 'SÍ';
    }
    if (valor === '0') {
      return 'NO';
    }
    return '';
  };

  const campos = [
    {label: 'Número de Placa', value: consulta.nro_placa},
    {label: 'Año', value: consulta.anno_proceso?.toString() ?? ''},
    {label: 'Mes', value: consulta.mes_proceso?.toString() ?? ''},
    {label: 'Conductor', value: consulta.nom_conductor},
    {label: 'RUT', value: consulta.doc_conductor},
    {label: 'Cargo', value: consulta.nom_cargo},
    {label: 'Vencimiento de Nro. de Documento', value: consulta.trab_vencedocu},
    {label: 'Número de Licencia', value: consulta.licencia_conducir},
    {
      label: 'Vencimiento de Licencia de Conducir',
      value: consulta.licencia_conducir_vencimiento,
    },
    {label: 'Proyecto del trabajador', value: consulta.proy_trabajador},
    {label: 'Unidade de Negocio del trabajador', value: consulta.unidad_trab},
    {label: 'Contrata', value: consulta.nom_contrata},
    {label: 'Estado', value: consulta.unidad_trab},
    {label: 'Celular', value: consulta.trab_celularpersonal},
    {label: 'Proyecto', value: consulta.proy_alias},
    {label: 'Tipo de vehículo', value: consulta.nom_tipovehiculo},
    {label: 'Fecha Situación', value: consulta.situacion_fecha},
    {label: 'Situación Actual', value: consulta.nom_situacion},
    {label: 'Marca', value: consulta.nom_marca},
    {label: 'Modelo', value: consulta.nom_modelo},
    {label: 'Número de motor', value: consulta.nro_motor},
    {label: 'Número de serie', value: consulta.nro_serie},
    {label: 'Color', value: consulta.nom_color},
    {label: 'Estado de vehículo', value: consulta.nom_estadovehiculo},
    {label: 'Próximo Mantenimiento KM', value: consulta.prox_mant},
    {label: 'Odómetro', value: consulta.odometro},
    {label: 'Fecha de Odómetro', value: consulta.fecha_odometro},
    {
      label: 'Vencimiento de Revisión Técnica',
      value: consulta.fecha_venci_revicion_tec,
    },
    {
      label: 'Vencimiento de Emisión de Gases',
      value: consulta.fecha_venci_emi_gases,
    },
    {label: 'GPS Empresa', value: consulta.gps_empresa},
    {label: 'Sello Alto', value: consulta.sello_alto},
    {label: 'Reg Saip', value: consulta.reg_saip},
    {label: 'Branding Movistar', value: consulta.branding_movistar},
  ];

  return (
    <DrawerLayout>
      <ScrollView contentContainerStyle={{padding: 16}}>
        {campos.map((campo, index) => {
         const esFecha = camposConFormatoFecha.includes(campo.label);
          const esBooleano = camposBooleanos.includes(campo.label);
          const valor = esFecha
            ? formatearFecha(campo.value)
            : esBooleano
            ? convertirABooleano(campo.value)
            : campo.value ?? '';

          return (
            <CustomTextInput
              key={index}
              label={campo.label}
              value={valor}
              mode="outlined"
              disabled
              style={{marginBottom: 12}}
            />
          );
        })}
      </ScrollView>
    </DrawerLayout>
  );
};
