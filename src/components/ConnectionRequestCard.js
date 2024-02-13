import { Image, StyleSheet, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Divider, Text } from 'react-native-paper'
import { Shadows } from '../helper/Utils'
import Colors from '../helper/Colors'
import DisplayRating from './DisplayRating'
import Fonts from '../helper/Fonts'

const ConnectionRequestCard = ({ name, location, image, distance, rating, reviews, bookings, connections, mutual_connections, isVerified, price, requestDuration }) => {
    return (
        <View style={styles.container}>
            <View style={styles.horizontalView}>
                <View>
                    <Image source={{ uri: image }}
                        style={styles.profilePic}
                    />
                </View>
                <View style={styles.secondContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.requestSentText}>Sent you a connection request {requestDuration} ago</Text>
                    <View style={[styles.horizontalView, { justifyContent: 'space-between', marginVertical: 5 }]}>
                        <TouchableOpacity style={styles.acceptButton}>
                            <Text style={styles.acceptText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.acceptButton, { backgroundColor: Colors.rejectedRed }]}>
                            <Text style={styles.acceptText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                    <Divider style={styles.divider} />
                    <Text>
                        <Text style={{...Fonts.sm}}>{bookings} Bookings</Text>
                        <Text> | </Text>
                        <Text style={{...Fonts.sm}}>{connections} Connections</Text>
                    </Text>
                    <Text style={{...Fonts.sm}}>{mutual_connections} Mutual Connections</Text>
                </View>
            </View>
        </View>
    )
}

export default ConnectionRequestCard

const styles = StyleSheet.create({
    container:
    {
        width: '90%',
        ...Shadows,
        borderWidth: 0.2,
        backgroundColor: '#fff',
        alignSelf: 'center',
        padding: 8,
        margin: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilePic:
    {
        height: 100,
        aspectRatio: 1,
        borderRadius: 55,
        alignSelf: 'center'
    },
    horizontalView:
    {
        flexDirection: 'row'
    },
    verificationFlag: {
        backgroundColor: Colors.verificationBlue,
        height: 18,
        position: 'absolute',
        width: 70,
        alignSelf: 'center',
        top: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    verifiedText:
    {
        color: 'white',
        fontSize: 12
    },
    price:
    {
        color: 'red',
        alignSelf: 'center',
        marginTop: 10,
    },
    secondContainer:
    {
        marginLeft: 8,
        flex: 1,
    },
    locationImage:
    {
        height: 20,
        width: 20,
        marginHorizontal: 5
    },
    divider:
    {
        marginVertical: 2
    },
    name: {
        ...Fonts.larSemiBold
    },
    addUserIcon:
    {
        height: 25,
        width: 25,
        opacity: 0.4
    },
    acceptButton:
    {
        width: 100,
        height: 30,
        backgroundColor: Colors.acceptedGreen,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    acceptText: {
        color: '#fff'
    },
    requestSentText:
    {
        opacity: 0.4,
        ...Fonts.smBold
    }
})