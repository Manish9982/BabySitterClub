import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { Divider, Text } from 'react-native-paper'
import { Shadows } from '../helper/Utils'
import Colors from '../helper/Colors'
import DisplayRating from './DisplayRating'
import Fonts from '../helper/Fonts'

const SittersNearYouCard = ({ name, location, image, distance, rating, reviews, bookings, connections, mutual_connections, isVerified, price, size = 300 }) => {
    return (
        <View style={[styles.container, { width: size, }]}>
            <View style={styles.horizontalView}>
                <View>
                    <Image source={{ uri: image }}
                        style={styles.profilePic}
                    />
                    {isVerified
                        &&
                        <View style={styles.verificationFlag}>
                            <Text style={styles.verifiedText}>VERIFIED</Text>
                        </View>}
                    <Text style={styles.price}>${price}/Hr</Text>
                </View>
                <View style={styles.secondContainer}>
                    <View style={[styles.horizontalView, { justifyContent: 'space-between' }]}>
                        <Text style={styles.name}>{name}</Text>
                        <Image source={require('../assets/images/add-to-favorites.png')}
                            style={styles.addUserIcon}
                        />
                    </View>
                    <View style={styles.horizontalView}>
                        <Text>{location}</Text>
                        <Image source={require('../assets/images/placeholder.png')}
                            style={styles.locationImage}
                        />
                        <Text>{distance}</Text>
                    </View>
                    <Divider style={styles.divider} />
                    <View style={styles.horizontalView}>
                        <DisplayRating
                            size={18}
                            value={Number.parseFloat(rating)}
                        />
                        <Text>{rating}</Text>
                        <Text style={styles.numberOfReviewsText}> ({reviews})</Text>
                    </View>

                    <Text>
                        <Text>{bookings} Bookings</Text>
                        <Text> | </Text>
                        <Text>{connections} Connections</Text>
                    </Text>
                    <Text>{mutual_connections} Mutual Connections</Text>
                </View>
            </View>


        </View>
    )
}

export default SittersNearYouCard

const styles = StyleSheet.create({
    container:
    {
        ...Shadows,
        borderWidth: 0.2,
        backgroundColor: '#fff',
        alignSelf: 'center',
        padding: 8,
        margin: 8,
        marginTop:5,
        borderRadius: 8,
    },
    profilePic:
    {
        height: 80,
        aspectRatio: 1,
        borderRadius: 8,
    },
    horizontalView:
    {
        flexDirection: 'row',
    },
    verificationFlag: {
        backgroundColor: Colors.verificationBlue,
        width: 100,
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
        flex: 1
    },
    locationImage:
    {
        height: 20,
        width: 20,
        marginHorizontal: 5
    },
    divider:
    {
        marginVertical: 3.5,
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
    numberOfReviewsText:
    {
        opacity:0.4
    }

})