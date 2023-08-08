import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import HeaderToolbar from '../helper/HeaderToolbar';
import { StyleSheet } from 'react-native';

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

        <View
            style={{
                flex: 1
            }}>
            <HeaderToolbar
                Title="Booking Details" />

            <View style={styles.container}>


                {/* <Text style={[styles.statusText1, Fonts.larMedium]}>Booking with James Anderson</Text> */}

                <View style={styles.statusContainer}>
                    <Text style={[styles.aboutText, Fonts.larMedium]}>Booking Status:</Text>


                    <View style={styles.messageContainer}>

                        <Text style={[styles.messageText, Fonts.medMedium]}>{bookingStatus}</Text>
                    </View>


                    <Text style={[styles.aboutText, Fonts.larMedium]}>About:</Text>
                    <View style={styles.messageContainer}>
                        <Text style={[styles.messageText, Fonts.medMedium]}>{message}</Text>
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={[styles.bookingdetailsContainer, Fonts.larMedium]}>Booking Details:</Text>
                    <View style={styles.messageContainer}>

                        <Text style={[styles.messageText, Fonts.medMedium]}>{bookingStartDate} - {bookingEndDate}</Text>
                    </View>

                    <Text style={[styles.paymentdetailsContainer, Fonts.larMedium]}>Payment Details:</Text>
                    <View style={styles.messageContainer}>

                        <Text style={[styles.messageText, Fonts.medMedium]}>Amount: {paymentAmount}</Text>
                        <Text style={[styles.messageText, Fonts.medMedium]}>Payment Method: {paymentMethod}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleContactPress}>
                        <Text style={[styles.buttonText, Fonts.medMedium]}>Contact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancelPress}>
                        <Text style={[styles.buttonText, Fonts.medMedium]}>Cancel Booking</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
};

const makeStyles = (H, W) => StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Spaces.med,
        paddingTop: Spaces.xxl,
    },
    statusContainer: {
        marginBottom: Spaces.med,
    },
    statusText1: {
        color: Colors.black,
        marginTop: H * 0.02,
        alignSelf: 'center'
    },
    statusText: {
        color: Colors.buttoncolor,

    },
    aboutText: {
        color: Colors.black,
        marginTop: H * 0.02

    },
    messageContainer: {
        borderWidth: 0,
        borderColor: 'white',
        borderRadius: 5,
        padding: Spaces.med,
        marginTop: H * 0.01,
        elevation: 2
    },
    messageText: {

        color: 'gray',
    },
    bookingdetailsContainer: {
        color: Colors.black,
        marginTop: H * 0.015
    },

    dateText: {
        color: Colors.gray,
    },


    paymentdetailsContainer: {
        color: Colors.black,
        marginTop: H * 0.03
    },

    paymentText: {
        marginBottom: Spaces.sm,
        marginVertical: H * 0.02

    },

    paymentDetail: {
        marginBottom: Spaces.sm,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Spaces.xxl,
    },
    button: {
        backgroundColor: Colors.buttoncolor,
        paddingVertical: Spaces.sm,
        paddingHorizontal: Spaces.med,
        borderRadius: 5,
        flex: 1,
        marginRight: Spaces.sm,
    },
    cancelButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default BookingDetailsPage;
