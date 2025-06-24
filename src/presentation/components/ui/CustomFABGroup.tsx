import React, {useState} from 'react';
import {
  Animated,
  ColorValue,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {FAB, Portal} from 'react-native-paper';
import {globalColors} from '../../styles/globalStyle';
import {useIsFocused} from '@react-navigation/native';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

interface Action {
  icon: IconSource;
  label?: string;
  color?: string;
  labelTextColor?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  containerStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  wrapperStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  labelMaxFontSizeMultiplier?: number;
  onPress: (e: GestureResponderEvent) => void;
  size?: 'small' | 'medium';
  testID?: string;
  rippleColor?: ColorValue;
}

interface CustomFABGroupProps {
  actions: Action[];
  mainIcon?: string;
  openIcon?: string;
  fabColor?: string;
}

export const CustomFABGroup = ({
  actions,
  mainIcon = 'plus',
  openIcon = 'close',
  fabColor = globalColors.secondary,
}: CustomFABGroupProps) => {
  const [open, setOpen] = useState(false);
  const isFocused = useIsFocused();

  const onStateChange = ({open: vlOpen}: {open: boolean}) => setOpen(vlOpen);

  return (
    isFocused && (
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? openIcon : mainIcon}
          actions={actions}
          onStateChange={onStateChange}
          color="white"
          visible
          fabStyle={[styles.fab, {backgroundColor: fabColor}]}
          backdropColor="transparent" // Fondo transparente
        />
      </Portal>
    )
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: globalColors.secondary, // Color del FAB
  },
});
