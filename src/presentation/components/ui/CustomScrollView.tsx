import React from 'react';
import {ScrollView, StyleProp, ViewStyle} from 'react-native';

interface Props extends React.ComponentProps<typeof ScrollView> {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const CustomScrollView = ({
  children,
  contentContainerStyle,
  ...props
}: Props) => {
  return (
    <ScrollView
      contentContainerStyle={[{flexGrow: 1}, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      {...props}>
      {children}
    </ScrollView>
  );
};

export default CustomScrollView;
