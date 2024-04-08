import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { storeLocalValue } from './LocalStore';
import { LOCAL_STORE } from './Utils';
import notifee, { AndroidImportance } from '@notifee/react-native';

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

export async function onDisplayNotification(title, body, onClick) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'importantMsgs',
        name: 'High Priority',
        sound: 'default',
        vibration: true,
        importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
        id: onClick,
        data: {
            'onClick': onClick
        },
        title: title,
        body: body,
        pressAction: {
            id: 'biscuit',
        },
        ios: {
            channelId,
            pressAction: {
                id: 'biscuit',
            },
        },
        android: {
            channelId,
            // optional, defaults to 'ic_launcher'.
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
                id: 'biscuit',
            },
        },
    });
}

export function onNotificationReceiver() {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        onDisplayNotification(remoteMessage?.notification?.title,
            remoteMessage?.notification?.body, remoteMessage?.data?.onClick)
    });
    return unsubscribe;
}
