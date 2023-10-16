import { StyleSheet } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const FAQs_Parent = () => {
  return (
     <WebView source={{ uri: 'https://google.com' }} style={{ flex: 1 }} />
    // <WebView source={{ uri: 'https://thebabysitterclubs.com/babysitter/faq' }} style={{ flex: 1 }} />
  )
}

export default FAQs_Parent

const styles = StyleSheet.create({})