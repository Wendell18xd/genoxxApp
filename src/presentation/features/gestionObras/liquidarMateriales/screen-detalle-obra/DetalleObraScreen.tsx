import {View} from 'react-native';
import {ItemObra} from '../components/ItemObra';
import {useLiquiMateStore} from '../store/useLiquiMateStore';

export const DetalleObraScreen = () => {
  const {obra} = useLiquiMateStore();

  return (
    <View style={{padding: 16}}>
      {obra && <ItemObra obra={obra} />}
    </View>
  );
};
