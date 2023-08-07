import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';

const BookingDetailsPage = () => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)


    const bookingStatus = 'Confirmed';
    const message = 'Your booking is confirmed. We look forward to seeing you!';
    const bookingStartDate = 'August 15, 2023';
    const bookingEndDate = 'August 20, 2023';
    const paymentAmount = '$100';
    const paymentMethod = 'Credit Card';

    const handleContactPress = () => {
        // Implement your contact logic here
        console.log('Contact button pressed');
    };

    const handleCancelPress = () => {
        // Implement your cancel booking logic here
        console.log('Cancel booking button pressed');
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.statusText1, Fonts.larMedium]}>Booking with James Anderson</Text>

            <View style={styles.statusContainer}>
                <Text style={[styles.statusText, Fonts.medMedium]}>{bookingStatus}</Text>
                <View style={styles.messageContainer}>
                    <Text style={[styles.messageText, Fonts.medMedium]}>{message}</Text>
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={[styles.dateText, Fonts.medMedium]}>Booking Date: {bookingStartDate} - {bookingEndDate}</Text>
                <Text style={[styles.dateText, Fonts.medMedium]}>Payment Details:</Text>
                <Text style={[styles.paymentDetail, Fonts.smMedium]}>Amount: {paymentAmount}</Text>
                <Text style={styles.paymentDetail}>Payment Method: {paymentMethod}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleContactPress}>
                    <Text style={styles.buttonText}>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancelPress}>
                    <Text style={styles.buttonText}>Cancel Booking</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const makeStyles = (H, W) => StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    statusContainer: {
        marginBottom: 20,
    },
    statusText1: {
        color:Colors.black,
        marginTop: H * 0.02,
        alignSelf:'center'
    },
    statusText: {
       color:Colors.buttoncolor,
        marginTop: H * 0.02

    },
    messageContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginTop: H*0.02,
    },
    messageText: {
        fontSize: 16,
        color: 'gray',
    },
    detailsContainer: {},
    dateText: {
        color:Colors.black,
        marginBottom: 10,
    },
    paymentText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    paymentDetail: {
        marginBottom: 3,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default BookingDetailsPage;
