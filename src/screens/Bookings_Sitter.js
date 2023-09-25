import { FlatList, ImageBackground, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text, SegmentedButtons } from 'react-native-paper'
import Colors from '../helper/Colors';
import BookingCardForSitter from '../components/BookingCardForSitter';
import { convertTimeRangeTo12HourFormat, formatDate, formatDateProfilePageDate, formatDateWithTime, formatDate_mmddyyyy, handleGetRequest } from '../helper/Utils';
import { useIsFocused } from '@react-navigation/native';

const Bookings_Sitter = () => {

    const [value, setValue] = useState('all');
    const [bookingData, setBookingData] = useState(null)
    const [loader, setLoader] = useState(true)

    const isFocused = useIsFocused()

    useEffect(() => {
        getBookings()
    }, [isFocused])

    const getBookings = async () => {
        const result = await handleGetRequest('get_booking')
        if (result?.status == '200') {
            setBookingData(result)
            console.log(result)
        }
        setLoader(false)
    }

    const renderBooking = ({ item, index }) => {
        if (((value == 'pending') && (item?.booking_status == 0)) || ((value == 'completed') && (item?.booking_status == 1)) || (value == 'all'))
            return (
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
            )
    }


    return (
        <ImageBackground
            source={require('../assets/images/background.png')}
            style={styles.background}>
            <SegmentedButtons
                theme={{ colors: { primary: Colors.selectedcolor } }}
                value={value}
                onValueChange={setValue}
                buttons={[
                    {
                        value: 'pending',
                        label: 'Pending',
                        labelStyle: {
                            color: Colors.gray
                        }
                    },
                    {
                        value: 'completed',
                        label: 'Completed',
                        labelStyle: {
                            color: Colors.gray
                        }
                    },
                    {
                        value: 'all',
                        label: 'All',
                        labelStyle: {
                            color: Colors.gray
                        }
                    },
                ]}
            />
            <FlatList
                data={bookingData?.data}
                renderItem={renderBooking}
                keyExtractor={(item, index) => `${index}`}
            />
        </ImageBackground>
    )
}

export default Bookings_Sitter

const styles = StyleSheet.create({
    background:
    {
        flex: 1
    }
})