import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import WebView from 'react-native-webview'

const PaymentWebview_Parent = ({ navigation, route }) => {
  console.log('paymentUrl======>', `https://thebabysitterclubs.com/babysitter/payment/${route?.params?.bookingId}`)
  return (
    <WebView source={{ uri: `https://thebabysitterclubs.com/babysitter/payment/${route?.params?.bookingId}` }} style={{ flex: 1 }} />
  )
}

export default PaymentWebview_Parent

const styles = StyleSheet.create({})