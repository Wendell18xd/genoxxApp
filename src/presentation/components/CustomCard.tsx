import React from 'react';
import { Card, Text } from 'react-native-paper';

interface CustomCardProps {
  title: string;
  content: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, content }) => {
  return (
    <Card>
      <Card.Content>
        <Text variant="titleLarge">{title}</Text>
        <Text variant="bodyMedium">{content}</Text>
      </Card.Content>
    </Card>
  );
};

export default CustomCard;
