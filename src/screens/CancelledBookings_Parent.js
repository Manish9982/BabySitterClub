import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'
import Spaces from '../helper/Spaces'
import Fonts from '../helper/Fonts'
import ReplacementBookings from '../components/ReplacementBookings'
import { convertTimeRangeTo12HourFormat, formatDateWithTime, formatDate_mmddyyyy, handleGetRequest } from '../helper/Utils'
import Loader from '../components/Loader'

const CancelledBookings_Parent = ({ navigation, route }) => {

    const [details, setDetails] = useState()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        checkCancelledBookings()
    }, [])

    const checkCancelledBookings = async () => {
        setLoader(true)
        const result = await handleGetRequest('get_cancel_booking')
        console.log("Cancelled Bookings.", result)
        if (result?.status == '200') {
            setDetails(result)
        }
        setLoader(false)
    }

    const renderCancelledBookings = ({ item, index }) => {
        return (
            <ReplacementBookings
                callBack={checkCancelledBookings}
                status={item?.booking_status}
                commentNeeded={true}
                comment={"Refund Generated"}
                commentColor={"green"}
                url={details?.url}
                name={`${item?.first_name} ${item?.last_name}`}
                profilePic={item?.picture}
                date={formatDate_mmddyyyy(item?.slot_date)}
                service={item?.book_service}
                slot={convertTimeRangeTo12HourFormat(item?.slot_id)}
                duration={item?.time_difference}
                address={item?.book_address}
                createdAt={formatDateWithTime(item?.created_at)}
                bookingId={item?.id}
                refundStatus={item?.refund_status}
                isRapid={item?.is_rapid}
            />
        )
    }

    return (
        loader
            ?
            <Loader />
            :
            <View style={styles.container}>
                <Text style={styles.warnText}>
                    <Text style={{ ...Fonts.larSemiBold }}>Note: </Text>
                    <Text style={styles.warnText}>Your following bookings were </Text>
                    <Text style={{ ...Fonts.larSemiBold }}>cancelled</Text>
                    <Text style={styles.warnText}>. We regret the inconvenience caused. You can </Text>
                    <Text style={{ ...Fonts.larSemiBold }}>Request </Text>
                    <Text style={styles.warnText}>a new booking or get </Text>
                    <Text style={{ ...Fonts.larSemiBold }}>Refund: </Text>
                    <Text style={styles.warnText}></Text>
                </Text>
                <FlatList
                    data={details?.data}
                    renderItem={renderCancelledBookings}
                    keyExtractor={(item, index) => `${item?.id}`}
                />
            </View>
    )
}

export default CancelledBookings_Parent

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    warnText: {
        ...Fonts.lar,
        alignSelf: 'center',
        padding: Spaces.sm
    }
})