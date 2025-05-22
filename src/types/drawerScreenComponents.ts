import {LiquiMatATCStackNavigation} from '../presentation/features/gestionATC/liquidarMateriales/navigations/LiquiMatATCStackNavigation';
import {LiquiMatObrasStackNavigation} from '../presentation/features/gestionObras/liquidarMateriales/navigation/LiquiMatObrasStackNavigation';

export const drawerScreenComponents: Record<
  string,
  React.ComponentType<any>
> = {
  //ATC
  ListMaterialesATCFragment: LiquiMatATCStackNavigation,
  //Obras
  LiquidacionMaterialesFragment: LiquiMatObrasStackNavigation,
  ListObrasFragment1: LiquiMatObrasStackNavigation,
  // PedidoMaterialFragment: LiquidarPartidasObras,
  // AprobacionPedidosFragment: LiquidarPartidasObras,
  // ReporteStockFragment: LiquidarPartidasObras,
};
