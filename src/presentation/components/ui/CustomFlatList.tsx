import {StyleSheet, ViewStyle} from 'react-native';
import {
  KeyboardAwareFlatList,
  KeyboardAwareFlatListProps,
} from 'react-native-keyboard-aware-scroll-view';

export interface CustomFlatListProps<ItemT>
  extends KeyboardAwareFlatListProps<ItemT> {
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  extraScrollHeight?: number;
  enableOnAndroid?: boolean;
  ref?: React.Ref<KeyboardAwareFlatList>;
  contentContainerStyle?: ViewStyle;
}

const CustomFlatList = <ItemT,>({
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  enableOnAndroid = true,
  extraScrollHeight = 0,
  ref,
  contentContainerStyle,
  ...props
}: CustomFlatListProps<ItemT>) => {
  return (
    <KeyboardAwareFlatList
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      enableOnAndroid={enableOnAndroid}
      extraScrollHeight={extraScrollHeight}
      enableResetScrollToCoords={false}
      keyboardShouldPersistTaps="handled"
      enableAutomaticScroll
      keyboardOpeningTime={0}
      ref={ref}
      contentContainerStyle={[styles.flexGrow, contentContainerStyle]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  flexGrow: {
    flexGrow: 1,
  },
});

export default CustomFlatList;
