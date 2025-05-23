import {
  useImperativeHandle,
  useRef,
  forwardRef,
  ReactNode,
  useMemo,
  useState,
} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';
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
  ({children, snapPoints = ['50%', '85%'], onChange}, ref) => {
    const sheetRef = useRef<BottomSheet>(null);

    // Estado para controlar el índice (abierto o cerrado)
    const [index, setIndex] = useState(-1);

    // Para memoizar snapPoints
    const memoSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    useImperativeHandle(ref, () => ({
      open: () => {
        setIndex(0); // abrir primer snap point
      },
      close: () => {
        sheetRef.current?.close();
      },
    }));

    // Manejar cambios de índice
    const handleChange = (newIndex: number) => {
      setIndex(newIndex);
      if (onChange) {
        onChange(newIndex);
      }
    };

    return (
      <BottomSheet
        ref={sheetRef}
        index={index}
        snapPoints={memoSnapPoints}
        enablePanDownToClose
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
