/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging, { firebase } from '@react-native-firebase/messaging';

//firebase.initializeApp()

{
  Platform.OS == 'android'
    &&
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
}

AppRegistry.registerComponent(appName, () => App);
