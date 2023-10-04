import { Alert, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { Text, ActivityIndicator } from 'react-native-paper'
import Colors from '../helper/Colors'
import { handlePostRequest } from '../helper/Utils'

const CreateReplacementBooking_Parent = ({ navigation, route }) => {

    useEffect(() => {
        createBookingNow()
    }, [])

    const createBookingNow = async () => {
        var formdata = new FormData()
        formdata.append('user_id', route?.params?.userId)
        formdata.append('booking_id', route?.params?.bookingId)
        const result = await handlePostRequest('new_booking', formdata)
        if (result?.status == '200') {
            console.log(result)
            navigation.navigate('Bookings')
            //navigation.navigate('PaymentWebview_Parent')
        }
        else {
            Alert.alert('Error', result?.message)
            navigation.goBack()
        }
    }


    return (
        <View style={styles.container}>
            <Text>Creating your new booking...</Text>
            <Text></Text>
            <ActivityIndicator color={Colors.selectedcolor} />
            <Text></Text>
            <Text>DO NOT PRESS BACK BUTTON</Text>
        </View>
    )
}

export default CreateReplacementBooking_Parent

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})