import {
  useImperativeHandle,
  useRef,
  forwardRef,
  ReactNode,
  useState,
  // useEffect,
} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Keyboard, StyleSheet} from 'react-native';
import {CustomBackdrop} from './CustomBackdrop';

export interface CustomBottomSheetRef {
  open: () => void;
  close: () => void;
}

interface Props {
  children: ReactNode;
  snapPoints?: (string | number)[];
  onChange?: (index: number) => void;
}

const CustomBottomSheet = forwardRef<CustomBottomSheetRef, Props>(
  ({children, snapPoints = ['60%', '95%'], onChange}, ref) => {
    const sheetRef = useRef<BottomSheet>(null);
    const [index, setIndex] = useState(-1);

    // Flag para evitar reabrir si está cerrado
    const isSheetOpen = useRef(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        setIndex(0);
      },
      close: () => {
        sheetRef.current?.close();
      },
    }));

    const handleChange = (newIndex: number) => {
      setIndex(newIndex);
      isSheetOpen.current = newIndex >= 0;

      if (newIndex === -1) {
        Keyboard.dismiss();
      }

      onChange?.(newIndex);
    };

    // useEffect(() => {
    //   const showSub = Keyboard.addListener('keyboardDidShow', () => {
    //     if (isSheetOpen.current) {
    //       sheetRef.current?.expand();
    //     }
    //   });

    //   const hideSub = Keyboard.addListener('keyboardDidHide', () => {
    //     if (isSheetOpen.current) {
    //       sheetRef.current?.snapToIndex(0);
    //     }
    //   });

    //   return () => {
    //     showSub.remove();
    //     hideSub.remove();
    //   };
    // }, []);

    return (
      <BottomSheet
        ref={sheetRef}
        index={index}
        snapPoints={snapPoints}
        enablePanDownToClose
        keyboardBehavior="extend"
        onChange={handleChange}
        backdropComponent={CustomBackdrop}>
        <BottomSheetView style={styles.sheetContent}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  sheetContent: {
    padding: 16,
  },
});

export default CustomBottomSheet;
