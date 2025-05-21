import {FadeInImage} from '../ui/FadeInImage';
import {API_URL} from '../../../config/api/genoxxApi';
import {useAuthStore} from '../../store/auth/useAuthStore';
import {ImageStyle} from 'react-native';

const fallbackImage = require('../../../assets/images/avatar3.jpg');

interface Props {
  style?: ImageStyle;
}

export const UserImage = ({style}: Props) => {
  const {user} = useAuthStore();
  const timestamp = user?.time_login;

  return (
    <FadeInImage
      uri={`${API_URL}/public/dist/PERSONAL/${user?.trab_documento}.jpg?${timestamp}`}
      style={[{height: 70, width: 70, borderRadius: 100}, style]}
      defaultImage={fallbackImage}
    />
  );
};
