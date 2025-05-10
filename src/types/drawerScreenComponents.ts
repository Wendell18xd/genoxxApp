import LiquidarMaterialesObras from '../presentation/features/gestionObras/liquidarMateriales/screen/LiquidarMaterialesObras';
import LiquidarPartidasObras from '../presentation/features/gestionObras/liquidarPartidas/screen/LiquidarPartidasObras';

export const drawerScreenComponents: Record<
  string,
  React.ComponentType<any>
> = {
  LiquidacionMaterialesFragment: LiquidarMaterialesObras,
  ListObrasFragment1: LiquidarPartidasObras,
};
