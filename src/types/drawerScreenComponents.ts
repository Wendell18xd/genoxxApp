import { ConsultaUnidadesStackNavigation } from '../presentation/features/flota/consultaUnidades/navigations/ConsultaUnidadesStackNavigation';
import { LiquiMatATCStackNavigation } from '../presentation/features/gestionATC/liquidarMateriales/navigations/LiquiMatATCStackNavigation';
import LiquidarMaterialesObras from '../presentation/features/gestionObras/liquidarMateriales/screen/LiquidarMaterialesObras';
import LiquidarPartidasObras from '../presentation/features/gestionObras/liquidarPartidas/screen/LiquidarPartidasObras';

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

  ListaUnidadesFragment: ConsultaUnidadesStackNavigation,
};
