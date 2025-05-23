import {useRef} from 'react';
import {CustomBottomSheetRef} from '../components/ui/bottomSheetModal/CustomBottomSheet';

export const useBottomSheetModal = () => {
  const ref = useRef<CustomBottomSheetRef>(null);

  const open = () => {
    ref.current?.open();
  };

  const close = () => {
    ref.current?.close();
  };

  return {
    ref,
    open,
    close,
  };
};
