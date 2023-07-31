import { View, Text } from 'react-native'
import React from 'react'
import Router from './src/helper/Router'
import { configureFonts, PaperProvider, MD2LightTheme } from 'react-native-paper';
import Fonts from './src/helper/Fonts';

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
    <PaperProvider theme={theme}>
      <Router />
    </PaperProvider>
  )
}

export default App