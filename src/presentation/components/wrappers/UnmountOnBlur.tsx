import {useIsFocused} from '@react-navigation/native';

interface Props {
  children: React.ReactNode;
}

export function UnmountOnBlur({children}: Props) {
  const isFocused = useIsFocused();
  return isFocused ? children : null;
}
