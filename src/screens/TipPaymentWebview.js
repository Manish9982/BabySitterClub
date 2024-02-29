import { Alert, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Text } from 'react-native-paper'
import WebView from 'react-native-webview'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { secondsToTime } from '../helper/Utils'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'
import Loader from '../components/Loader'


const TipPaymentWebview = ({ navigation, route }) => {


const [isLoadComplete, setIsLoadComplete] = useState(false)


const H = useWindowDimensions().height
const W = useWindowDimensions().width


const handleStateChange = (state) => {
if (state?.url == 'https://thebabysitterclubs.com/babysitter/payment-redirect') {
navigation.navigate('BottomTabsParent')
}
}






const handleLoadEnd = () => {
setIsLoadComplete(true)
}
console.log("URL FOR PAYMENT", `https://thebabysitterclubs.com/babysitter/payment-for-tip/${route?.params?.BookinID}/${route?.params?.Amount}`);
console.log("Amount", route?.params?.Amount)
return (
<View style={{ flex: 1, backgroundColor: Colors.white }}>


{
!isLoadComplete
&&
<Loader />
}
<WebView source={{ uri: `https://thebabysitterclubs.com/babysitter/payment-for-tip/${route?.params?.BookinID}/${route?.params?.Amount}` }}
style={{}}
onLoadEnd={handleLoadEnd}
/>
</View>
)
}


export default TipPaymentWebview


const styles = StyleSheet.create({})
