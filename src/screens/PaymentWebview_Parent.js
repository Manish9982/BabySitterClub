import { Alert, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Text } from 'react-native-paper'
import WebView from 'react-native-webview'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { secondsToTime } from '../helper/Utils'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'
import Loader from '../components/Loader'

const PaymentWebview_Parent = ({ navigation, route }) => {

  const [isTimerActive, setIsTimerActive] = useState(true)
  const [isLoadComplete, setIsLoadComplete] = useState(false)

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width

  const handleStateChange = (state) => {
    if (state?.url == 'https://thebabysitterclubs.com/babysitter/payment-redirect') {
      navigation.navigate('BottomTabsParent')
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
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: Spaces.sm, flexWrap: 'wrap' }}>
        <CountdownCircleTimer
          onComplete={onCompleteTimer}
          size={W * 0.2}
          isPlaying
          duration={300}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[150, 100, 50, 0]}
        >
          {({ remainingTime }) => <Text>{secondsToTime(remainingTime)}</Text>}
        </CountdownCircleTimer>
        {isTimerActive
          ?
          <Text style={{
            alignSelf: 'center',
            textAlign: 'center',
            width: W * 0.7
          }}>Your slot has been blocked for 5 minutes. Please complete this payment before the timer.</Text>
          :
          <Text>
            Your slot has been freed now, please go back and book your slot again to avoid any conflicts. Incase you already made the payment and don't see your booking
          </Text>}
      </View>
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

export default PaymentWebview_Parent

const styles = StyleSheet.create({})