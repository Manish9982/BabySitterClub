import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const storeLocalValue = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        Alert.alert(e)
    }
};

export const getLocalValue = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value
        }
    } catch (e) {
        Alert.alert(e)
    }
};

export const getAllLocalKeys = async () => {
    let keys = []
    try {
        keys = await AsyncStorage.getAllKeys()
    } catch (e) {
        Alert.alert(e)
    }
    console.log('Local Keys ==>', keys)
}

export const clearStorage = async () => {
    try {
        AsyncStorage.clear()
    } catch (e) {
        Alert.alert(e)
    }
}