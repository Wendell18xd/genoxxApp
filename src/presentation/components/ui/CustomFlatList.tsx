import {KeyboardAwareFlatList, KeyboardAwareFlatListProps} from 'react-native-keyboard-aware-scroll-view';

export interface CustomFlatListProps<ItemT> extends KeyboardAwareFlatListProps<ItemT> {
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  extraScrollHeight?: number;
  enableOnAndroid?: boolean;
  ref?: React.Ref<KeyboardAwareFlatList>;
}

const CustomFlatList = <ItemT,>({
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  enableOnAndroid = true,
  extraScrollHeight = 16,
  ref,
  ...props
}: CustomFlatListProps<ItemT>) => {
  return (
    <KeyboardAwareFlatList
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      enableOnAndroid={enableOnAndroid}
      extraScrollHeight={extraScrollHeight}
      enableResetScrollToCoords={true}
      keyboardShouldPersistTaps="handled"
      ref= {ref}
      {...props}
    />
  );
};

export default CustomFlatList;
