import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { storeLocalValue } from './LocalStore';
import { LOCAL_STORE } from './Utils';

export async function requestUserPermission() {
    if (Platform.OS == 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }
    else {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        console.log('Notfication requested')
    }
}

export function onNotificationReceiver() {

    const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
}

export function getTokenForApp() {
    messaging()
        .getToken()
        .then(token => {
            console.log('FCM Token =========>', token)
            storeLocalValue(LOCAL_STORE.FCM_TOKEN, JSON.stringify(token))
            //return saveTokenToDatabase(token);

            return messaging().onTokenRefresh(token => {
                storeLocalValue(LOCAL_STORE.FCM_TOKEN, JSON.stringify(token))
            });
        });
} 
