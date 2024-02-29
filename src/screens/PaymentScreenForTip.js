import { Alert, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Text } from 'react-native-paper'
import WebView from 'react-native-webview'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { secondsToTime } from '../helper/Utils'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'
import Loader from '../components/Loader'

const PaymentScreenForTip = ({ navigation, route }) => {

  const [isTimerActive, setIsTimerActive] = useState(true)
  const [isLoadComplete, setIsLoadComplete] = useState(false)

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width

  const handleStateChange = (state) => {
    if (state?.url == 'https://thebabysitterclubs.com/babysitter/payment-redirect') {
      navigation.navigate('Bookings')
    }
  }

  const onCompleteTimer = () => {
    setIsTimerActive(false)
    Alert.alert('Time Out', 'Your slot has been freed now, please go back and book your slot again to avoid any conflicts.')
  }

  const handleLoadEnd = () => {
    setIsLoadComplete(true)
  }
  console.log("URL FOR PAYMENT", `https://thebabysitterclubs.com/babysitter/payment/${route?.params?.bookingId}`)
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      {
        !isLoadComplete
        &&
        <Loader />
      }
      <WebView source={{ uri: `https://thebabysitterclubs.com/babysitter/payment/${route?.params?.bookingId}` }}
        style={{}}
        onLoadEnd={handleLoadEnd}
        onNavigationStateChange={(state) => { handleStateChange(state) }}
      />
    </View>
  )
}

export default PaymentScreenForTip

const styles = StyleSheet.create({})