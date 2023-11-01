/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging, { firebase } from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, { Importance } from "react-native-push-notification";

let config = {
  apiKey: "AIzaSyDVldg1C46WvH3l-wgdQK_wzYFNo9zNYZI",
  appId: "1:697634391096:ios:d62dd6ad039156a24452cd"
};

messaging().requestPermission()

PushNotification.createChannel(
  {
      channelId: "notifications", // (required)
      channelName: "Notifications", // (required)
      channelDescription: "A channel to display your notifications", // (optional) default: undefined.
      playSound: true, // (optional) default: true
      // soundName: "samsung.mp3", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
