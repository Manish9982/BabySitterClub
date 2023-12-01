import { Alert, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { Text, ActivityIndicator } from 'react-native-paper'
import Colors from '../helper/Colors'
import { convertTo24HourFormat, handlePostRequest } from '../helper/Utils'

const CreateBooking_Parent = ({ navigation, route }) => {

    const { createBooking } = route.params

    const bookingParams = JSON.parse(createBooking)

    useEffect(() => {
        createBookingNow()
    }, [])

    const createBookingNow = async () => {
        console.log('bookingParams', bookingParams)
        var formdata = new FormData()
        formdata.append('user_id', bookingParams?.user_id)
        formdata.append('start_time', convertTo24HourFormat(JSON.parse(bookingParams?.start_time)))
        formdata.append('end_time', convertTo24HourFormat(JSON.parse(bookingParams?.end_time)))
        formdata.append('date', bookingParams?.date?.join(','))
        formdata.append('service_id', bookingParams?.service?.id)
        formdata.append('address', bookingParams?.booking_address)
        formdata.append('price', bookingParams?.price)
        const result = await handlePostRequest('booking', formdata)
        if (result?.status == '200') {
            console.log(result)
            navigation.navigate('PaymentWebview_Parent', { bookingId: result?.booking_id })
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

export default CreateBooking_Parent

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})