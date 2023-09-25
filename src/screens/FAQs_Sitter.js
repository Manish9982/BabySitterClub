import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import WebView from 'react-native-webview'

const FAQs_Sitter = () => {
  return (
    <WebView source={{ uri: 'https://thebabysitterclubs.com/babysitter/faq' }} style={{ flex: 1 }} />
  )
}

export default FAQs_Sitter

const styles = StyleSheet.create({})