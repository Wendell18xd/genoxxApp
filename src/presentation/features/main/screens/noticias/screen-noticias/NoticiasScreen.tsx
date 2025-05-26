import {CarruselNoticias} from './components/CarruselNoticias';
import SafeAreaLayout from '../../../layout/SafeAreaLayout';

export const NoticiasScreen = () => {
  return (
    <SafeAreaLayout title="Noticias" isHeader primary isBack={false}>
      <CarruselNoticias />
    </SafeAreaLayout>
  );
};
