import React, { useEffect, useState } from 'react'
import Router from './src/helper/Router'
import { configureFonts, PaperProvider, MD2LightTheme, Text } from 'react-native-paper';
import Fonts from './src/helper/Fonts';
import { Provider } from 'react-redux';
import Store from './src/redux/Store';
import { LOCAL_STORE } from './src/helper/Utils';
import { getLocalValue } from './src/helper/LocalStore';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import Colors from './src/helper/Colors';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';

const App = () => {

  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('BottomTabsSitter');

  useEffect(() => {
    getToken()
  }, [])

  useEffect(() => {
    if (Platform.OS == "android") {
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          console.log("remoteMessage", remoteMessage);
          if (remoteMessage?.data?.onClick !== 'default') {
            setInitialRoute(remoteMessage?._data?.onClick);
          }
          setLoading(false);
        });
    } else {
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage
        );
        navigation.navigate(remoteMessage?.data?.onClick);
      });

      PushNotificationIOS.getInitialNotification().then(remoteMessage => {
        //console.log("remoteMessage at PushNotificationIOS get initial", remoteMessage)

        //setInitialRoute("CallingScreen"); // e.g. "Settings"
        console.log("remoteMessage", remoteMessage);
        if (remoteMessage?._data?.onClick !== 'default') {
          setInitialRoute(remoteMessage?._data?.onClick);
        }
        setLoading(false);
      });
    }
  }, []);
  // useEffect(() => {
  //   messaging()
  //     .onNotificationOpenedApp()
  //     .then(remoteMessage => {
  //       console.log("remoteMessage", remoteMessage);
  //       if (remoteMessage?.data?.onClick !== 'default') {
  //         if (Platform.OS == "android") {
  //           setInitialRoute(remoteMessage?.data?.onClick);
  //         }
  //         else {
  //           setInitialRoute(remoteMessage?._data?.onClick);
  //         }
  //       }
  //       setLoading(false);
  //     });
  // }, []);


  const fontConfig = {
    ios: {
      regular: Fonts.med
    },
    android: {
      regular: Fonts.med
    }
  };
  const theme = {
    ...MD2LightTheme,
    fonts: configureFonts({ config: fontConfig, isV3: false }),
    colors: { ...MD2LightTheme.colors, primary: Colors.Secondary }
  };

  const getToken = async () => {
    const token = await getLocalValue(LOCAL_STORE.TOKEN)
    console.log("TOKEN======>", token)
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.PRIMARY }}>
      <Provider store={Store}>
        <PaperProvider theme={theme}>
          <Router initialRouteName={initialRoute} />
        </PaperProvider>
      </Provider>
    </SafeAreaView>
  )
}

export default App