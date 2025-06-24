import { ConsultaHistoricaPatenteStackNavigation } from '../presentation/features/flota/consultaHistoricaPatente/navigations/ConsultaHistoricaPatenteStackNavigation';
import { ConsultaInspeccionesStackNavigation } from '../presentation/features/flota/consultaInspecciones/navigations/ConsultaInspeccionesStackNavigation';
import {ConsultaUnidadesStackNavigation} from '../presentation/features/flota/consultaUnidades/navigations/ConsultaUnidadesStackNavigation';
import {LiquiMatATCStackNavigation} from '../presentation/features/gestionAtc/liquidarMateriales/navigations/LiquiMatATCStackNavigation';
import {LiquidacionObrasStackNavigation} from '../presentation/features/gestionObras/navigations/LiquidacionObrasStackNavigation';
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
  // [Menu.LIQUIDACION_PARTIDAS_OBRAS]: LiquiPartObrasStackNavigation, //NORMAL
  // [Menu.LIQUIDACION_PARTIDAS_OBRAS_ENERGIA]: LiquiPartObrasStackNavigation, //ENERGIA
  //Flota
  [Menu.CONSULTA_UNIDADES_FLOTA]: ConsultaUnidadesStackNavigation,
  [Menu.CONSULTA_HISTORICA_PATENTE_FLOTA]: ConsultaHistoricaPatenteStackNavigation,
  [Menu.CONSULTA_INSPECCIONES_FLOTA]: ConsultaInspeccionesStackNavigation,
};
