import React from 'react';
import {StyleProp, StyleSheet, ViewStyle, View} from 'react-native';
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
      <View style={[styles.rippleWrapper]}>{children}</View>
    </Card.Content>
  );

  return (
    <Card style={[styles.card, style]} mode={mode}>
      {onPress ? (
        <TouchableRipple
          onPress={onPress}
          borderless={false}
          rippleColor="rgba(0, 0, 0, 0.1)"
          style={{borderRadius: rippleRadius}}>
          {content}
        </TouchableRipple>
      ) : (
        content
      )}
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
