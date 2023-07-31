import { View, Text } from 'react-native'
import React from 'react'
import Router from './src/helper/Router'
import {configureFonts, PaperProvider } from 'react-native-paper';


const App = () => {
  const theme = {
    fonts: configureFonts({config: fontConfig, isV3: false}),
  };


  const fontConfig = {  
        fontFamily: 'Poppins-Regular',
        //fontWeight: 'normal',
      }

  return (

    <PaperProvider theme={theme}>
      <Router />
    </PaperProvider>
  )
}

export default App