import LiquidarMaterialesScreen from '../presentation/features/gestionATC/liquidarMateriales/screens/LiquidarMaterialesScreen';
import LiquidarMaterialesObras from '../presentation/features/gestionObras/liquidarMateriales/screen/LiquidarMaterialesObras';
import LiquidarPartidasObras from '../presentation/features/gestionObras/liquidarPartidas/screen/LiquidarPartidasObras';

export const drawerScreenComponents: Record<
  string,
  React.ComponentType<any>
> = {
  LiquidacionMaterialesFragment: LiquidarMaterialesObras,
  ListObrasFragment1: LiquidarPartidasObras,
  PedidoMaterialFragment: LiquidarPartidasObras,
  AprobacionPedidosFragment: LiquidarPartidasObras,
  ReporteStockFragment: LiquidarPartidasObras,
  ListMaterialesATCFragment: LiquidarMaterialesScreen,
};
