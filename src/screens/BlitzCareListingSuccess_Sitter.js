import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, Image, StyleSheet, ImageBackground } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import Fonts from '../helper/Fonts';
import Spaces from '../helper/Spaces';
import CustomButton from '../components/Button';

const BlitzCareListingSuccess_Sitter = ({ navigation }) => {

    const onPressReturn = () => {
        navigation.navigate("BottomTabsSitter")
    }

    return (
        <ImageBackground
            style={styles.container}
            source={require('../assets/images/background.png')}>
            <Image
                style={styles.checkImage}
                source={require('../assets/images/checklist.png')} />
            <Text style={styles.greeting1}>Congratulations! You're now visible to those looking for bookings today.{"\n"}We'll inform you once you're booked.{"\n\n"}Just a reminder, if you receive a booking, it's crucial to complete it to maintain your rating.</Text>
            <CustomButton title={"Return to Dashboard"}
                style={styles.button}
                onPressButton={onPressReturn}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center"
    },
    greeting1:
    {
        //textAlign: 'center',
        ...Fonts.larSemiBold,
        alignSelf: 'center',
        width: "93%",
    },
    checkImage:
    {
        alignSelf: 'center',
        height: '40%',
        width: '40%',
        resizeMode: 'center'
    },
    button:
    {
        marginTop: '10%'
    }
});

export default BlitzCareListingSuccess_Sitter;
