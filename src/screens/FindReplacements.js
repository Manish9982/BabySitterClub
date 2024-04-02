import { Alert, FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import { convertTimeRangeTo12HourFormat, formatDateWithTime, formatDate_mmddyyyy, handlePostRequest } from '../helper/Utils'
import NewBookingsForReplacing from '../components/NewBookingsForReplacing'

const FindReplacements = ({ navigation, route }) => {

    const [replacementData, setReplacementData] = useState(null)

    useEffect(() => {
        findReplacementBooking()
    }, [])

    const findReplacementBooking = async () => {
        var formdata = new FormData()
        formdata.append('booking_id', route?.params?.bookingId)
        const result = await handlePostRequest('replace_booking', formdata)
        console.log('replace_booking ===>', result)
        if (result?.status == '200') {
            setReplacementData(result)
        }
        else {
            // Alert.alert(result?.message)
            Alert.alert(
                "Alert",
                result?.message,
                [
                  {
                    text: 'Okay',
                    onPress: () => navigation.goBack(),
                    style: 'cancel',
                  },
                ],
                {
                  cancelable: true,
                  onDismiss: () =>
                    Alert.alert(
                      'This alert was dismissed by tapping outside of the alert dialog.',
                    ),
                },
              );
        }
    }
    const renderReplacementBookings = ({ item, index }) => {
        return (
            <NewBookingsForReplacing
                userId={item?.Id}
                status={item?.booking_status}
                commentNeeded={true}
                comment={"Refund Generated"}
                commentColor={"green"}
                url={replacementData?.url}
                name={`${item?.name}`}
                profilePic={item?.picture}
                date={formatDate_mmddyyyy(item?.slot_date)}
                service={item?.book_service}
                slot={convertTimeRangeTo12HourFormat(item?.slot_id)}
                duration={item?.time_difference}
                address={item?.book_address}
                createdAt={formatDateWithTime(item?.created_at)}
                bookingId={item?.booking_id}
            />
        )
    }


    return (
        <View>
            <FlatList
                data={replacementData?.users}
                renderItem={renderReplacementBookings}
                keyExtractor={(item, index) => `${index}`}
            />
        </View>
    )
}

export default FindReplacements

const styles = StyleSheet.create({})