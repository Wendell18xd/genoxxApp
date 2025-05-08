import React from 'react';
import {Card, Text} from 'react-native-paper';

interface CustomCardProps {
  content: string;
  backgroundColor?: string;
  textColor?: string;
  mode?: 'contained' | 'outlined' | 'elevated';
}

const CustomSimpleCard = ({
  content,
  backgroundColor,
  textColor,
  mode = 'contained',
}: CustomCardProps) => {
  return (
    <Card mode={mode} style={{backgroundColor: backgroundColor}}>
      <Card.Content>
        <Text
          variant="bodyMedium"
          style={{textAlign: 'justify', color: textColor}}>
          {content}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default CustomSimpleCard;
