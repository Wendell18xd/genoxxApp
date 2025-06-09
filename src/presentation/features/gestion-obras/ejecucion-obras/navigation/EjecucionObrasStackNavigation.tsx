import {ActividaSinObra} from '../ejecucion-sin-obra/screen-actividad/ActividaSinObra';
import {ListaObrasScreen} from '../../screen-lista-obras/ListaObrasScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

export type EjecucionObrasTopTabParam = {
  ListaObrasScreen: undefined;
  ActividaSinObra: undefined;
};

const Tab = createMaterialTopTabNavigator<EjecucionObrasTopTabParam>();

export const EjecucionObrasStackNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ListaObrasScreen" component={ListaObrasScreen} />
      <Tab.Screen name="ActividaSinObra" component={ActividaSinObra} />
    </Tab.Navigator>
  );
};
