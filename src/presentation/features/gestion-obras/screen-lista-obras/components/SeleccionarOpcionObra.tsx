import {View} from 'react-native';
import {Text} from 'react-native-paper';
import MenuItem from '../../../main/screens/home/components/MenuItem';
import {Menu} from '../../../../../domain/entities/User';
import {SearchObras} from './SearchObras';
import {useObrasNavigationStore} from '../../store/useObrasNavigationStore';

interface Props {
  onClose?: () => void;
}

const menuLiquida: Menu = {
  menu_nombre: 'Liquidar',
  menu_codigo: 'Liquidar',
  menu_padre: '',
  menu_icoweb: '',
  menu_icoapp: 'file-arrow-left-right-outline',
  menu_descripcion: '',
  menu_color_icoweb: '',
  menu_fileapp: '',
  menu_fileweb: '',
  menu_hijo: [],
};

const menuEjecuta: Menu = {
  menu_nombre: 'Ejecución',
  menu_codigo: 'Ejecución',
  menu_padre: '',
  menu_icoweb: '',
  menu_icoapp: 'account-hard-hat',
  menu_descripcion: '',
  menu_color_icoweb: '',
  menu_fileapp: '',
  menu_fileweb: '',
  menu_hijo: [],
};

export const SeleccionarOpcionObra = ({onClose}: Props) => {
  const {opcionSeleccionada, seleccionarOpcion} = useObrasNavigationStore();

  const handleLiquidar = () => {
    seleccionarOpcion('liquidar');
  };

  const handleEjecutar = () => {
    onClose?.();
  };

  return (
    <>
      {opcionSeleccionada === 'menu' && (
        <View style={[{paddingHorizontal: 16, paddingBottom: 16}]}>
          <Text
            variant="titleLarge"
            style={{textAlign: 'center', marginBottom: 16, fontWeight: 'bold'}}>
            Seleccionar opción
          </Text>

          <View
            style={{flexDirection: 'row', justifyContent: 'center', gap: 32}}>
            <MenuItem menu={menuLiquida} onPress={handleLiquidar} />
            <MenuItem menu={menuEjecuta} onPress={handleEjecutar} />
          </View>
        </View>
      )}

      {opcionSeleccionada === 'liquidar' && (
        <View>
          <SearchObras onClose={onClose} />
        </View>
      )}
    </>
  );
};
