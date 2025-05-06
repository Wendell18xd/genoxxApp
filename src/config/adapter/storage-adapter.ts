import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageAdapter {
  static async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
      throw new Error(
        `Error setting item ${key} - ${value} in storage: ${error}`,
      );
    }
  }

  static async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
      throw new Error(`Error removing item ${key} in storage: ${error}`);
    }
  }
}
