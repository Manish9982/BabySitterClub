import React from 'react';
import { View, Image, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';

const BookingCard = ({ profileURL,booking, onItemPress }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    return (

        <TouchableOpacity
            onPress={onItemPress}
            style={styles.cardContainer}>
            <View style={styles.leftContent}>
                <Image
                    defaultSource={require('../assets/images/mother.png')}
                    source={{ uri: `${profileURL}${booking.picture}` }} style={styles.profileImage} />
            </View>
            <View style={styles.middleContent}>
                <Text style={[styles.bookingName, Fonts.xlSemiBold]}>{`${booking?.first_name} ${booking?.last_name}`}</Text>
                <Text style={[styles.bookingStatus, Fonts.medMedium]}>{booking?.service}</Text>
                <Text style={[styles.bookingStatus, Fonts.medMedium]}>$ {booking.hour_price}</Text>
            </View>
            <View
                style={styles.rightContent}>
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
