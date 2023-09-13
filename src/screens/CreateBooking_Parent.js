import { Alert, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { Text, ActivityIndicator } from 'react-native-paper'
import Colors from '../helper/Colors'
import { handlePostRequest } from '../helper/Utils'

const CreateBooking_Parent = ({ navigation, route }) => {

    const { createBooking } = route.params

    const bookingParams = JSON.parse(createBooking)

    useEffect(() => {
        createBookingNow()
    }, [])

    const createBookingNow = async () => {
        var formdata = new FormData()
        formdata.append('user_id', bookingParams.user_id)
        formdata.append('slot_id', bookingParams.slot_id)
        formdata.append('amount', bookingParams.amount)
        const result = await handlePostRequest('booking', formdata)
        if (result.status == '200') {
            navigation.navigate('PaymentWebview_Parent')
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