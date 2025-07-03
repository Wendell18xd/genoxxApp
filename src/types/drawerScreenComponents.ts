import { ConsultaHistoricaPatenteStackNavigation } from '../presentation/features/flota/consultaHistoricaPatente/navigations/ConsultaHistoricaPatenteStackNavigation';
import { ConsultaInspeccionesStackNavigation } from '../presentation/features/flota/consultaInspecciones/navigations/ConsultaInspeccionesStackNavigation';
import {ConsultaUnidadesStackNavigation} from '../presentation/features/flota/consultaUnidades/navigations/ConsultaUnidadesStackNavigation';
import { ControlOdometroStackNavigation } from '../presentation/features/flota/controlOdometro/navigations/ControlOdometroStackNavigation';
import {LiquiMatATCStackNavigation} from '../presentation/features/gestionAtc/liquidarMateriales/navigations/LiquiMatATCStackNavigation';
import {LiquidacionObrasStackNavigation} from '../presentation/features/gestionObras/navigations/LiquidacionObrasStackNavigation';
import RecepcionMateCampoStackNavigation from '../presentation/features/gestionObras/recepcionMaterialesCampo/navigations/RecepcionMateCampoStackNavigation';
import {ReporteStockStackNavigation} from '../presentation/features/logistica/reporteStock/navigations/ReporteStockStackNavigation';
import {Menu} from './menus';

export const drawerScreenComponents: Record<
  string,
  React.ComponentType<any>
> = {
  //ATC
  [Menu.LIQUIDACION_MATERIALES_ATC]: LiquiMatATCStackNavigation,
  //Obras
  [Menu.LIQUIDACION_MATERIALES_OBRAS]: LiquidacionObrasStackNavigation, //NORMAL
  [Menu.LIQUIDACION_MATERIALES_OBRAS_ENERGIA]: LiquidacionObrasStackNavigation, //ENERGIA
  [Menu.RECEPCION_MATERIALES_CAMPO]: RecepcionMateCampoStackNavigation, //NORMAL
  //Flota
  [Menu.CONSULTA_UNIDADES_FLOTA]: ConsultaUnidadesStackNavigation,
  [Menu.CONSULTA_HISTORICA_PATENTE_FLOTA]: ConsultaHistoricaPatenteStackNavigation,
  //Logistica
  [Menu.REPORTE_STOCK]: ReporteStockStackNavigation,
  [Menu.CONSULTA_INSPECCIONES_FLOTA]: ConsultaInspeccionesStackNavigation,
  [Menu.CONTROL_ODOMETRO_FLOTA]: ControlOdometroStackNavigation,
};
