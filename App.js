import React, { useEffect } from 'react'
import Router from './src/helper/Router'
import { configureFonts, PaperProvider, MD2LightTheme } from 'react-native-paper';
import Fonts from './src/helper/Fonts';
import { Provider } from 'react-redux';
import Store from './src/redux/Store';
import { handlePostRequest } from './src/helper/Utils';

const App = () => {

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

  return (
    <Provider store={Store}>
      <PaperProvider theme={theme}>
        <Router />
      </PaperProvider>
    </Provider>
  )
}

export default App