import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Divider, Text } from 'react-native-paper'
import { Shadows } from '../helper/Utils'
import Colors from '../helper/Colors'
import DisplayRating from './DisplayRating'
import Fonts from '../helper/Fonts'
import { useNavigation } from '@react-navigation/native'

const MyFriendsCard = ({ name, location, image, distance, rating, reviews, bookings, connections, mutual_connections, isVerified, price, width = 300 }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('FriendsProfile_Parent')}
            style={[styles.container, { width: width }]}>
            <View style={[styles.horizontalView,]}>
                <View style={{}}>
                    <Image source={{ uri: image }}
                        style={styles.profilePic}
                    />
                    {isVerified
                        &&
                        <View style={styles.verificationFlag}>
                            <Text style={styles.verifiedText}>VERIFIED</Text>
                        </View>}
                    {/* <Text style={styles.price}>${price}/Hr</Text> */}
                </View>
                <View style={[styles.secondContainer, {}]}>
                    <View style={[styles.horizontalView, { justifyContent: 'space-between' }]}>
                        <Text style={styles.name}>{name}</Text>
                        {/* <Image source={require('../assets/images/add-user.png')}
                            style={styles.addUserIcon}
                        /> */}
                    </View>
                    <View style={styles.horizontalView}>
                        <Text>{location}</Text>
                        <Image source={require('../assets/images/placeholder.png')}
                            style={styles.locationImage}
                        />
                        <Text>{distance}</Text>
                    </View>
                    <Divider style={styles.divider} />
                    {/* <View style={styles.horizontalView}>
                        <DisplayRating
                            size={18}
                            value={Number.parseFloat(4.3)}
                        />
                        <Text>{rating}</Text>
                        <Text> ({reviews})</Text>
                    </View> */}

                    <Text>
                        <Text>{bookings} Bookings</Text>
                        <Text> | </Text>
                        <Text>{connections} Connections</Text>
                    </Text>
                    <Text>{mutual_connections} Mutual Connections</Text>
                </View>
            </View>


        </TouchableOpacity>
    )
}

export default MyFriendsCard

const styles = StyleSheet.create({
    container:
    {
        ...Shadows,
        borderWidth: 0.2,
        backgroundColor: '#fff',
        alignSelf: 'center',
        padding: 8,
        margin: 8,
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
        flexDirection: 'row'
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
    }

})