import {ConsultaUnidadesStackNavigation} from '../presentation/features/flota/consultaUnidades/navigations/ConsultaUnidadesStackNavigation';
import {LiquiMatATCStackNavigation} from '../presentation/features/gestion-atc/liquidarMateriales/navigations/LiquiMatATCStackNavigation';
import {LiquiMatObrasStackNavigation} from '../presentation/features/gestion-obras/liquidar-materiales/navigations/LiquiMatObrasStackNavigation';
import {LiquiPartObrasStackNavigation} from '../presentation/features/gestion-obras/liquidar-partidas/navigations/LiquiPartObrasStackNavigation';
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
  [Menu.LIQUIDACION_PARTIDAS_OBRAS]: LiquiPartObrasStackNavigation, //NORMAL
  [Menu.LIQUIDACION_PARTIDAS_OBRAS_ENERGIA]: LiquiPartObrasStackNavigation, //ENERGIA
  //Flota
  [Menu.CONSULTA_UNIDADES_FLOTA]: ConsultaUnidadesStackNavigation,
};
