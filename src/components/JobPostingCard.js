import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import { Shadows, handlePostRequest } from '../helper/Utils';

const JobPostingCard = ({ id, profilePicture, name, time, location, priceOffered, comments, baseUrl, distance, lat1, long1, lat2, long2, callbackMain }) => {
    const [loader, setLoader] = useState(false)

    const onPressViewOnMap = () => {
        const start = `${lat1},${long1}`;
        const end = `${lat2},${long2}`;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${start}&destination=${end}`;
        Linking.openURL(url);
    }

    const onAccept = async () => {
        setLoader(true)
        var formdata = new FormData()
        formdata.append("id", id);
        const result = await handlePostRequest('approve_rapid_request', formdata)
        if (result?.status == "200") {
            callbackMain()
        } else {
            Alert.alert("Error", result?.message)
        }
        setLoader(false)
    }

    const onReject = async () => {
        setLoader(true)
        var formdata = new FormData()
        formdata.append("id", id);
        const result = await handlePostRequest('reject_rapid_request', formdata)
        if (result?.status == "200") {
            callbackMain()
        } else {
            Alert.alert("Error", result?.message)
        }
        setLoader(false)
    }

    return (
        loader
            ?
            <View style={styles.cardLoader}>
                <ActivityIndicator size={"small"}
                    color={Colors.Secondary}
                />
            </View>
            :
            <View style={styles.card}>
                <View style={styles.header}>
                    <Image source={{ uri: `${baseUrl}${profilePicture}` }} style={styles.profilePicture} />
                    <View style={styles.headerText}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.details}>Time: {time}</Text>
                        <Text style={styles.details}>Address: {location}</Text>
                    </View>
                </View>
                <View style={styles.viewOnMapTextContainer}>
                    <Text style={styles.price}>{`Distance: ${distance} mi`}</Text>
                    <TouchableOpacity
                        onPress={onPressViewOnMap}
                        style={styles.viewOnMapButton}>
                        <Text style={styles.viewOnMapText}>View</Text>
                        <Text style={[styles.viewOnMapText, { textDecorationLine: 'none' }]}> <AntDesign name="enviromento" size={Spaces.xl} /></Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.price}>{`Offered: $${priceOffered}`}</Text>
                <Text style={styles.comments}>Comments: "{comments}"</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={onAccept}>
                        <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={onReject}>
                        <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: Colors.Secondary,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: Spaces.med,
        margin: Spaces.med,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spaces.med,
    },
    profilePicture: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: Spaces.med,
    },
    headerText: {
        flex: 1,
    },
    name: {
        ...Fonts.larBold,
    },
    details: {
        // fontSize: 14,
        color: 'grey',
    },
    price: {
        // fontSize: 16,
        //marginBottom: Spaces.med,
    },
    comments: {
        marginBottom: Spaces.med,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        padding: Spaces.med,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    acceptButton: {
        backgroundColor: 'green',
    },
    rejectButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    viewOnMapTextContainer:
    {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        //marginVertical: Spaces.med
    },
    viewOnMapText:
    {
        //alignSelf: 'center',
        //textDecorationLine: 'underline',
        color: Colors.white
    },
    viewOnMapButton:
    {
        flexDirection: 'row',
        backgroundColor: Colors.Secondary,
        borderRadius: 8,
        ...Shadows,
        padding: Spaces.sm
    }
});

export default JobPostingCard;
