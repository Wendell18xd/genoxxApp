import { ConsultaHistoricaPatenteStackNavigation } from '../presentation/features/flota/consultaHistoricaPatente/navigations/ConsultaHistoricaPatenteStackNavigation';
import { ConsultaUnidadesStackNavigation } from '../presentation/features/flota/consultaUnidades/navigations/ConsultaUnidadesStackNavigation';
import {LiquiMatATCStackNavigation} from '../presentation/features/gestionATC/liquidarMateriales/navigations/LiquiMatATCStackNavigation';
import {LiquiMatObrasStackNavigation} from '../presentation/features/gestionObras/liquidarMateriales/navigation/LiquiMatObrasStackNavigation';
import {Menu} from './menus';

export const drawerScreenComponents: Record<
  string,
  React.ComponentType<any>
> = {
  //ATC
  [Menu.LIQUIDACION_MATERIALES_ATC]: LiquiMatATCStackNavigation,
  //Obras
  [Menu.LIQUIDACION_MATERIALES_OBRAS]: LiquiMatObrasStackNavigation, //NORMAL
  [Menu.LIQUIDACION_MATERIALES_OBRAS_ENERGIA]: LiquiMatObrasStackNavigation, //ENERGIA
  //Flota
  [Menu.CONSULTA_UNIDADES_FLOTA]: ConsultaUnidadesStackNavigation,
  [Menu.CONSULTA_HISTORICA_PATENTE_FLOTA]: ConsultaHistoricaPatenteStackNavigation,
};
