import {View} from 'react-native';
import {useObrasNavigationStore} from '../../store/useObrasNavigationStore';
import {Text} from 'react-native-paper';
import {Menu} from '../../../../../domain/entities/User';
import MenuItem from '../../../main/screens/home/components/MenuItem';

interface Props {
  onClose?: () => void;
}

const menuConsulta: Menu = {
  menu_nombre: 'Consulta de obras',
  menu_codigo: 'Consulta',
  menu_padre: '',
  menu_icoweb: '',
  menu_icoapp: 'magnify',
  menu_descripcion: '',
  menu_color_icoweb: '',
  menu_fileapp: '',
  menu_fileweb: '',
  menu_hijo: [],
};

export const SeleccionarOpcionConsulta = ({onClose}: Props) => {
  const {opcionSeleccionada, seleccionarOpcion} = useObrasNavigationStore();

  const handleConsulta = () => {
    seleccionarOpcion('consulta');
    onClose?.();
  };

  return (
    <>
      {(opcionSeleccionada === 'menu' || opcionSeleccionada === 'consulta') && (
        <View style={{paddingHorizontal: 16, paddingBottom: 16}}>
          <Text
            variant="titleLarge"
            style={{textAlign: 'center', marginBottom: 16, fontWeight: 'bold'}}>
            Seleccionar opción
          </Text>
          <View
            style={{flexDirection: 'row', justifyContent: 'center', gap: 32}}>
            <MenuItem menu={menuConsulta} onPress={handleConsulta} />
          </View>
        </View>
      )}
    </>
  );
};
