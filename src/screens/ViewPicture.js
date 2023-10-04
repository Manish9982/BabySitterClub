import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import WebView from 'react-native-webview'

const ViewPicture = ({ navigation, route }) => {
  return (
    <WebView source={{ uri: `${route?.params?.imageUrl}` }} style={{ flex: 1 }} />
  )
}

export default ViewPicture

const styles = StyleSheet.create({})