import AsyncStorage from '@react-native-async-storage/async-storage';


export const getStoredUser = async () => {
  try {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (err) {
    return null;
  }
};
