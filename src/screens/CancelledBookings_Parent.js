import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import Spaces from '../helper/Spaces'
import Fonts from '../helper/Fonts'
import ReplacementBookings from '../components/ReplacementBookings'
import { convertTimeRangeTo12HourFormat, formatDateWithTime, formatDate_mmddyyyy } from '../helper/Utils'

const CancelledBookings_Parent = ({ navigation, route }) => {

    const { cancelled_bookings } = route?.params
    const details = JSON.parse(cancelled_bookings)

    const renderCancelledBookings = ({ item, index }) => {
        return (
            <ReplacementBookings
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
            />
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.warnText}>
                <Text style={{ ...Fonts.larSemiBold }}>Note: </Text>
                <Text style={styles.warnText}>Your following bookings were </Text>
                <Text style={{ ...Fonts.larSemiBold }}>cancelled</Text>
                <Text style={styles.warnText}>. We regret the inconvenience caused. You can </Text>
                <Text style={{ ...Fonts.larSemiBold }}>replace </Text>
                <Text style={styles.warnText}>the cancelled booking or get </Text>
                <Text style={{ ...Fonts.larSemiBold }}>refund: </Text>
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