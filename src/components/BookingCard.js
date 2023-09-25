import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import { Shadows, convertTimeRangeTo12HourFormat, formatDate, formatDateWithTime, formatDate_mmddyyyy } from '../helper/Utils';

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
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.detail}>
                    <Text style={styles.label}>Name:  </Text>
                    <Text style={styles.value}>{booking?.first_name} {booking?.last_name}</Text>
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
                    <Text style={styles.label}>Payment Status:  </Text>
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
                <View style={styles.detail}>
                    <Text style={styles.label}>Created At:  </Text>
                    <Text style={styles.value}>{formatDateWithTime(booking?.created_at)}</Text>
                </View>
            </View>
        </View>
    );
};

const makeStyles = (W) => StyleSheet.create({
    cardContainer: {
        borderColor:Colors.PRIMARY,
        borderWidth:2,
        flexDirection: 'row',
        width: W * 0.96,
        marginVertical: Spaces.med,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        padding: Spaces.med,
        ...Shadows
    },
    profileContainer: {
        //justifyContent: 'center',
        alignItems: 'center',
        margin: Spaces.sm,
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
        flexWrap:'wrap',
        //justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
    },
    value: {},
    paymentDone: {
        color: 'green'
    },
    paymentPending:
    {
        color:'red'
    }
});

export default BookingCard;
