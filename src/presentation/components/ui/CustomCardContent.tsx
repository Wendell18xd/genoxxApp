import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Card, TouchableRipple} from 'react-native-paper';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  styleContent?: StyleProp<ViewStyle>;
  onPress?: () => void;
  mode?: 'outlined' | 'elevated' | 'contained';
}

export const CustomCardContent = ({
  children,
  style,
  onPress,
  mode = 'elevated',
  styleContent,
}: Props) => {
  const rippleRadius = 12;

  const content = (
    <Card.Content style={[styles.pressableContent, styleContent]}>
      {children}
    </Card.Content>
  );

  return (
  <Card style={[styles.card, style]} mode={mode}>
      <TouchableRipple
        onPress={onPress}
        disabled={!onPress}
        borderless={false}
        rippleColor="rgba(0, 0, 0, 0.1)"
        style={{borderRadius: rippleRadius}}>
        {content}
      </TouchableRipple>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#fff',
  },
  rippleWrapper: {
    overflow: 'hidden',
  },
  pressableContent: {
    padding: 12,
  },
});
