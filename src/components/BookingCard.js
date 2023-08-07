import React from 'react';
import { View, Image, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';

const BookingCard = ({ booking, onPressBookingCard }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    return (
        <TouchableOpacity
            onPress={onPressBookingCard}
            style={styles.cardContainer}>
            <View style={styles.leftContent}>
                <Image
                    defaultSource={require('../assets/images/mother.png')}
                    source={{ uri: booking.profileImage }} style={styles.profileImage} />
            </View>
            <View style={styles.middleContent}>
                <Text style={[styles.bookingName, Fonts.larMedium]}>{booking.name}</Text>
                <Text style={[styles.bookingStatus, Fonts.sm]}>{booking.type}</Text>
                <Text style={[styles.bookingStatus, Fonts.sm]}>{booking.status}</Text>
            </View>
            <View style={styles.rightContent}>
                <Text style={[styles.viewBookingText, Fonts.smMedium]}>View Booking</Text>
            </View>
        </TouchableOpacity>
    );
};

const makeStyles = (H, W) => StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spaces.lar,
        backgroundColor: Colors.white,
        margin: Spaces.sm,
        borderColor: Colors.blue,
        borderWidth: 0.6,
        borderRadius: 10
    },
    leftContent: {
        flex: 1,
        alignItems: 'center',
    },
    middleContent: {
        flex: 3,
        paddingHorizontal: Spaces.med,
    },
    rightContent: {
        flex: 1,
        alignItems: 'flex-end',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: Spaces.med,
        borderWidth: 0.6,
    },
    bookingName: {
        color: "black"
    },
    bookingStatus: {
        color: Colors.buttoncolor,
    },
    viewBookingText: {
        textDecorationLine: 'underline',
        color: Colors.buttoncolor
    },
});

export default BookingCard;
