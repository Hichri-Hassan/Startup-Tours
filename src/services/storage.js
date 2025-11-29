import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for storage
const STORAGE_KEYS = {
  USER_TOKEN: '@user_token',
  USER_DATA: '@user_data',
  SETTINGS: '@settings',
};

// Store data
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

// Get data
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

// Remove data
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
  }
};

// Clear all data
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

// User specific functions
export const storeUserToken = (token) => storeData(STORAGE_KEYS.USER_TOKEN, token);
export const getUserToken = () => getData(STORAGE_KEYS.USER_TOKEN);
export const removeUserToken = () => removeData(STORAGE_KEYS.USER_TOKEN);

export const storeUserData = (userData) => storeData(STORAGE_KEYS.USER_DATA, userData);
export const getUserData = () => getData(STORAGE_KEYS.USER_DATA);
export const removeUserData = () => removeData(STORAGE_KEYS.USER_DATA);

export default {
  storeData,
  getData,
  removeData,
  clearAll,
  storeUserToken,
  getUserToken,
  removeUserToken,
  storeUserData,
  getUserData,
  removeUserData,
};
