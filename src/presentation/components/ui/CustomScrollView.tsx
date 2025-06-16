import {ScrollViewProps} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface CustomScrollViewProps extends ScrollViewProps {
  enableOnAndroid?: boolean;
  extraScrollHeight?: number;
  showsVerticalScrollIndicator?: boolean;
}

const CustomScrollView: React.FC<CustomScrollViewProps> = ({
  enableOnAndroid = true,
  extraScrollHeight = 16,
  showsVerticalScrollIndicator = false,
  ...props
}) => {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={enableOnAndroid}
      extraScrollHeight={extraScrollHeight}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      enableResetScrollToCoords={true}
      keyboardShouldPersistTaps="handled"
      {...props}
    />
  );
};

export default CustomScrollView;
