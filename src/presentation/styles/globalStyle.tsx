import {StyleSheet} from 'react-native';

export const globalColors = {
  success: '#4CAF50',
  warning: '#FF9800',
  danger: '#F44336',
  primary: '#043767',
  secondary: '#0090D7',
  gray: '#cdcecf',
  textPrimary: '#000',
  textSecondary: '#666',
  white: '#fff',
  yellow: '#FFE599',
  lightYellow: '#FFFBEA',
  lightSuccess: '#E8F5E9',
};

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultContainer: {
    flex: 1,
    padding: 16,
    position: 'relative',
  },
  padding: {
    padding: 16,
  },
  margin: {
    margin: 16,
  },
  bgSuccess: {
    backgroundColor: '#4CAF50',
    color: '#FFFFFF',
  },
  bgWarning: {
    backgroundColor: '#FF9800',
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    elevation: 4, // Android
    shadowColor: '#000', // iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
