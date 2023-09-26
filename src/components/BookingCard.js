import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import { Shadows, convertTimeRangeTo12HourFormat, formatDate, formatDateWithTime, formatDate_mmddyyyy } from '../helper/Utils';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Fonts from '../helper/Fonts';
import SmallButtonSecondary from './SmallButtonSecondary';

const BookingCard = ({ booking, profileURL }) => {

    const W = useWindowDimensions().width

    const styles = makeStyles(W)
    return (
        <View style={[styles.cardContainer, { backgroundColor: Colors.white }]}>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: `${profileURL}${booking?.picture}` }} // Replace with your actual image path
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.bookingLabel}>Booking ID:  </Text>
                    <Text style={styles.bookingValue}>#{booking?.b_id}</Text>
                </View>
                <View>
                    <Text style={styles.bookingLabel}>Transaction ID:  </Text>
                    <Text style={styles.bookingValue}>{booking?.transaction_id}</Text>
                </View>
                <Text style={styles.bookingValue}>{formatDateWithTime(booking?.created_at)}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.detailsContainer}>
                <View style={styles.detail}>
                    <Text style={styles.label}>Name:  </Text>
                    <Text style={styles.value}>{booking?.first_name} {booking?.last_name}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Rating:  </Text>
                    <Text style={styles.value}>4/5 <AntDesign name='star' color={Colors.golden} size={Spaces.lar} /></Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Slot Date:  </Text>
                    <Text style={styles.value}>{formatDate_mmddyyyy(booking?.slot_date)}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Slot Time:  </Text>
                    <Text style={styles.value}>{convertTimeRangeTo12HourFormat(booking?.slot_id)}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Service:  </Text>
                    <Text style={styles.value}>{booking?.booked_service_name}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Duration:  </Text>
                    <Text style={styles.value}>{booking?.time_difference}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Price:  </Text>
                    <Text style={styles.value}>${booking?.amount}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Payment:  </Text>
                    {
                        (booking?.status == 1)
                            ?
                            <Text style={[styles.value, styles.paymentDone]}>
                                Paid
                            </Text>
                            :
                            <Text style={[styles.value, styles.paymentPending]}>
                                Pending
                            </Text>
                    }
                </View>
                <SmallButtonSecondary title={'Add Rating'}
                    style={styles.ratingButton} />
            </View>
        </View>
    );
};

const makeStyles = (W) => StyleSheet.create({
    cardContainer: {
        borderColor: Colors.PRIMARY,
        borderWidth: 2,
        flexDirection: 'row',
        width: W * 0.96,
        marginVertical: Spaces.med,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        padding: Spaces.sm,
        ...Shadows
    },
    profileContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        //margin: Spaces.sm,
        marginRight: 0
    },
    profileImage: {
        width: 80, // Adjust the width and height as needed
        height: 80,
        borderRadius: 40, // To make it circular
        borderWidth: 0.2
    },
    detailsContainer: {

    },
    detail: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        //justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        ...Fonts.sm,
        width: W * 0.16,
    },
    value: {
        ...Fonts.smBold,
        width: W * 0.37,
        //backgroundColor:'purple'
    },
    paymentDone: {
        color: 'green'
    },
    paymentPending:
    {
        color: 'red'
    },
    ratingButton:
    {
        backgroundColor: Colors.PRIMARY,
        alignSelf: 'flex-start'
    },
    divider: {
        height: '100%',
        width: 1,
        backgroundColor: Colors.golden,
        marginHorizontal: Spaces.med
    },
    bookingLabel:
    {
        alignSelf: 'flex-start',
        ...Fonts.sm,
    },
    bookingValue:
    {
        ...Fonts.smBold,
        width: W * 0.33
    }
});

export default BookingCard;
