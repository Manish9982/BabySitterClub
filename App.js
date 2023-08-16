import React, { useEffect } from 'react'
import Router from './src/helper/Router'
import { configureFonts, PaperProvider, MD2LightTheme } from 'react-native-paper';
import Fonts from './src/helper/Fonts';
import { Provider } from 'react-redux';
import Store from './src/redux/Store';
import { LOCAL_STORE } from './src/helper/Utils';
import { getLocalValue } from './src/helper/LocalStore';

const App = () => {

  useEffect(() => {
    getToken()
  }, [])


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
  };

  const getToken = async () => {
    const token = await getLocalValue(LOCAL_STORE.TOKEN)
    console.log("TOKEN======>", token)
  }

  return (
    <Provider store={Store}>
      <PaperProvider theme={theme}>
        <Router />
      </PaperProvider>
    </Provider>
  )
}

export default App