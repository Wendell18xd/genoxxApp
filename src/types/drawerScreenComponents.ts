import {LiquiMatATCStackNavigation} from '../presentation/features/gestionATC/liquidarMateriales/navigations/LiquiMatATCStackNavigation';
import { LiquiMatObrasStackNavigation } from '../presentation/features/gestionObras/liquidarMateriales/navigation/LiquiMatObrasStackNavigation';
import LiquidarPartidasObras from '../presentation/features/gestionObras/liquidarPartidas/screen/LiquidarPartidasObras';

export const drawerScreenComponents: Record<
  string,
  React.ComponentType<any>
> = {
  LiquidacionMaterialesFragment: LiquiMatObrasStackNavigation,
  ListMaterialesATCFragment: LiquiMatATCStackNavigation,
  ListObrasFragment1: LiquidarPartidasObras,
  // PedidoMaterialFragment: LiquidarPartidasObras,
  // AprobacionPedidosFragment: LiquidarPartidasObras,
  // ReporteStockFragment: LiquidarPartidasObras,
};
