import AsyncStorage from "@react-native-async-storage/async-storage";
export const storeLocalData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};
export const getLocalData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key).then((data) => data);

    return value;
  } catch (e) {
    // error reading value
  }
};
