import {RouteProp, useRoute} from '@react-navigation/native';
import DrawerLayout from '../../../main/layout/DrawerLayout';
import {ConsultaUnidadesStackParam} from '../navigations/ConsultaUnidadesStackNavigation';
import CustomTextInput from '../../../../components/ui/CustomTextInput';
import {ScrollView} from 'react-native-gesture-handler';
import {format, parseISO} from 'date-fns';
import {Alert} from 'react-native';
import {useEffect} from 'react';

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

  const obtenerMesFormateado = (mes?: number | string | null) => {
    if (!mes) {
      return '';
    }
    const meses = [
      '01 - ENE',
      '02 - FEB',
      '03 - MAR',
      '04 - ABR',
      '05 - MAY',
      '06 - JUN',
      '07 - JUL',
      '08 - AGO',
      '09 - SEP',
      '10 - OCT',
      '11 - NOV',
      '12 - DIC',
    ];
    const mesNum = typeof mes === 'string' ? parseInt(mes, 10) : mes;
    if (isNaN(mesNum) || mesNum < 1 || mesNum > 12) {
      return '';
    }
    return meses[mesNum - 1];
  };

  const campos = [
    {label: 'Número de Placa', value: consulta.nro_placa},
    {label: 'Año', value: consulta.anno_proceso?.toString() ?? ''},
    {label: 'Mes', value: obtenerMesFormateado(consulta.mes_proceso)},
    {label: 'Conductor', value: consulta.nom_conductor},
    {label: 'RUT', value: consulta.doc_conductor},
    {label: 'Cargo', value: consulta.nom_cargo},
    {
      label: 'Vencimiento de Nro. de Documento',
      value: formatearFecha(consulta.trab_vencedocu),
    },
    {label: 'Número de Licencia', value: consulta.licencia_conducir},
    {
      label: 'Vencimiento de Licencia de Conducir',
      value: formatearFecha(consulta.licencia_conducir_vencimiento),
    },
    {label: 'Proyecto del trabajador', value: consulta.proy_trabajador},
    {label: 'Unidade de Negocio del trabajador', value: consulta.unidad_trab},
    {label: 'Contrata', value: consulta.nom_contrata},
    {
      label: 'Estado',
      value: consulta.situacion === 'DEVP' ? 'DE BAJA' : 'ACTIVO',
    },
    {label: 'Celular', value: consulta.trab_celularpersonal},
    {label: 'Proyecto', value: consulta.proy_alias},
    {label: 'Tipo de vehículo', value: consulta.nom_tipovehiculo},
    {label: 'Fecha de Situación', value: consulta.situacion_fecha},
    {label: 'Situación Actual', value: consulta.nom_situacion},
    {label: 'Marca', value: consulta.nom_marca},
    {label: 'Modelo', value: consulta.nom_modelo},
    {label: 'Número de motor', value: consulta.nro_motor},
    {label: 'Número de serie', value: consulta.nro_serie},
    {label: 'Color', value: consulta.nom_color},
    {label: 'Estado de vehículo', value: consulta.nom_estadovehiculo},
    {label: 'Próximo Mantenimiento KM', value: consulta.prox_mant},
    {label: 'Odómetro', value: consulta.odometro},
    {
      label: 'Fecha de Odómetro',
      value: formatearFecha(consulta.fecha_odometro),
    },
    {label: 'Fecha de Entrega', value: formatearFecha(consulta.fecha_entrega)},
    {
      label: 'Fecha de Culminación',
      value: formatearFecha(consulta.fecha_culmi_contrato),
    },
    {
      label: 'Vencimiento de Revisión Técnica',
      value: formatearFecha(consulta.fecha_venci_revicion_tec),
    },
    {
      label: 'Vencimiento de Emisión de Gases',
      value: formatearFecha(consulta.fecha_venci_emi_gases),
    },
    {label: 'GPS Empresa', value: consulta.gps_empresa === '1' ? 'SÍ' : 'NO'},
    {label: 'Sello Alto', value: consulta.sello_alto === '1' ? 'SÍ' : 'NO'},
    {label: 'Reg Saip', value: consulta.reg_saip === '1' ? 'SÍ' : 'NO'},
    {
      label: 'Branding Movistar',
      value: consulta.branding_movistar === '1' ? 'SÍ' : 'NO',
    },
  ];

  // Cálculo de días hasta vencimiento
  const diasVencimiento = (fechaStr: string | null | undefined): number => {
    if (!fechaStr) {
      return Infinity;
    }
    const hoy = new Date();
    const fecha = new Date(fechaStr);
    const diff = fecha.getTime() - hoy.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  // Mostrar alerta al montar
  useEffect(() => {
    let cadenaPorVencer = '';
    let cadenaVencio = '';

    // Prox mantenimiento
    if (consulta.prox_mant && consulta.odometro) {
      const proxMant = parseInt(consulta.prox_mant, 10);
      const odometro = parseInt(consulta.odometro, 10);

      if (!isNaN(proxMant) && !isNaN(odometro)) {
        const resta = odometro - proxMant;
        if (resta > 0) {
          if (resta <= 1000) {
            cadenaPorVencer += `Próximo Mantenimiento: ${proxMant} km\n`;
          } else {
            cadenaVencio += `Próximo Mantenimiento: ${proxMant} km\n`;
          }
        }
      }
    }

    // Revisiones por fecha
    const revisarFecha = (label: string, fecha: string | null | undefined) => {
      const dias = diasVencimiento(fecha);
      if (dias <= 0) {
        cadenaVencio += `${label}: ${formatearFecha(fecha)}\n`;
      } else if (dias <= 30) {
        cadenaPorVencer += `${label}: ${formatearFecha(fecha)}\n`;
      }
    };

    revisarFecha('Revisión Técnica', consulta.fecha_venci_revicion_tec);
    revisarFecha('Emisión de Gases', consulta.fecha_venci_emi_gases);

    if (cadenaPorVencer || cadenaVencio) {
      const mensaje = `${
        cadenaPorVencer ? `Por vencer:\n${cadenaPorVencer}\n` : ''
      }${cadenaVencio ? `Vencido:\n${cadenaVencio}` : ''}`;

      Alert.alert('Alertas de Vencimiento', mensaje.trim(), [{text: 'OK'}]);
    }
  }, [consulta]);

  return (
    <DrawerLayout>
      <ScrollView contentContainerStyle={{padding: 16}}>
        {campos.map((campo, index) => {
          return (
            <CustomTextInput
              key={index}
              label={campo.label}
              value={campo.value ?? ''}
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
