import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import BookingCard from '../components/BookingCard'
import { convertTimeRangeTo12HourFormat, formatDateWithTime, formatDate_mmddyyyy, handleGetRequest } from '../helper/Utils'
import BookingCardForSitter from '../components/BookingCardForSitter'
import Loader from '../components/Loader'

const CancelledBookingDisplay_Sitter = () => {
    const [bookingData, setBookingData] = useState()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        getBookings()
    }, [])

    const onClickHandle = () => {
        navigation.navigate('BookingDetailsPage')
    }

    const getBookings = async () => {
        const result = await handleGetRequest('get_booking')
        setBookingData(result)
        console.log(result)
        // if (result?.status == '200') {
        // } else if (result?.status == '201') {
        //   Alert.alert("Alert", result?.message)
        // }
        setLoader(false)
    }

    const renderBookings = ({ item }) => {
        if (item?.booking_status == '2') {
            return (
                <>
                    <BookingCardForSitter
                        status={item?.booking_status}
                        url={bookingData?.url}
                        name={`${item?.first_name} ${item?.last_name}`}
                        profilePic={item?.picture}
                        date={formatDate_mmddyyyy(item?.slot_date)}
                        service={item?.booked_service_name}
                        slot={convertTimeRangeTo12HourFormat(item?.slot_id)}
                        duration={item?.time_difference}
                        address={item?.address}
                        createdAt={formatDateWithTime(item?.created_at)}
                        bookingId={item?.id}
                    />
                </>
            );
        }
    }

    return (
        loader
            ?
            <Loader />
            :
            <View style={{ flex: 1 }}>
                <FlatList
                    data={bookingData?.data}
                    renderItem={renderBookings}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
    )
}

export default CancelledBookingDisplay_Sitter

const styles = StyleSheet.create({})