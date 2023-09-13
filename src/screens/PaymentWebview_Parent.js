import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import WebView from 'react-native-webview'

const PaymentWebview_Parent = () => {
  return (
    <WebView source={{ uri: '2' }} style={{ flex: 1 }} />
  )
}

export default PaymentWebview_Parent

const styles = StyleSheet.create({})