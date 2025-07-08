import {useNavigationState} from '@react-navigation/native';

export const useCanGoBackSafely = () => {
  const index = useNavigationState(state => state.index);
  const routes = useNavigationState(state => state.routes);
  return index > 0 && routes.length > 1;
};
