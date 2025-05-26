import {StyleSheet} from 'react-native';

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
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
