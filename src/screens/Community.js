import { FlatList, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Searchbar, Text } from 'react-native-paper'
import Spaces from '../helper/Spaces'
import Colors from '../helper/Colors'
import SittersNearYouCard from '../components/SittersNearYouCard'
import RecommendedFriends from '../components/RecommendedFriends'

const DATA = {
    status: 200,
    msg_title: 'Success',
    msg_body: 'Data Fetched Successfully',
    data: [
        {
            name: 'Bianca Allison',
            image: 'https://images.pexels.com/photos/11369171/pexels-photo-11369171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            location: 'Dallas',
            distance: '1.4 mi',
            rating: '4.2',
            reviews: '22',
            bookings: '22',
            connections: '14',
            mutual_connections: '2',
            isVerified: true,
            price: "25",
        },
        {
            name: 'Celine',
            image: 'https://images.pexels.com/photos/11369171/pexels-photo-11369171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            location: 'Dallas',
            distance: '1.4 mi',
            rating: '4.2',
            reviews: '22',
            bookings: '22',
            connections: '14',
            mutual_connections: '2',
            price: "20",

        },
        {
            name: 'Bianca Allison',
            image: 'https://images.pexels.com/photos/11369171/pexels-photo-11369171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            location: 'Dallas',
            distance: '1.4 mi',
            rating: '4.2',
            reviews: '22',
            bookings: '22',
            connections: '14',
            mutual_connections: '2',
            price: "20",

        },
    ]
}
const DATA2 = {
    status: 200,
    msg_title: 'Success',
    msg_body: 'Data Fetched Successfully',
    my_sitters:8,
    my_friends:11,
    friends_sitters:47,
    data: [
        {
            name: 'Bianca Allison',
            image: 'https://images.pexels.com/photos/11369171/pexels-photo-11369171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            location: 'Dallas',
            distance: '1.4 mi',
            rating: '4.2',
            reviews: '22',
            bookings: '22',
            connections: '14',
            mutual_connections: '2',
            isVerified: true,
            price: "25",
        },
        {
            name: 'Celine',
            image: 'https://images.pexels.com/photos/11369171/pexels-photo-11369171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            location: 'Dallas',
            distance: '1.4 mi',
            rating: '4.2',
            reviews: '22',
            bookings: '22',
            connections: '14',
            mutual_connections: '2',
            price: "20",

        },
        {
            name: 'Bianca Allison',
            image: 'https://images.pexels.com/photos/11369171/pexels-photo-11369171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            location: 'Dallas',
            distance: '1.4 mi',
            rating: '4.2',
            reviews: '22',
            bookings: '22',
            connections: '14',
            mutual_connections: '2',
            price: "20",

        },
    ]
}

const Community = ({ navigation }) => {
    const [searchText, setSearchText] = useState("")
    const [sittersNearYou, setSittersNearYou] = useState(null)
    const [recommendedFriends, setRecommendedFriends] = useState(null)

    useEffect(() => {
        getSittersNearYou()
    }, [])

    const getSittersNearYou = () => {
        setSittersNearYou(DATA)
        setRecommendedFriends(DATA2)
    }

    const onPressMyFriends = () => {
        navigation.navigate('MyFriends_Parent')
    }
    const onPressFriendsSitter = () => {
        navigation.navigate('FriendsSittersListing_Parent')
    }
    const onPressMySitters = () => {
        navigation.navigate('Favourite_Parent')
    }

    const renderItem = ({ item }) => {
        return (
            <SittersNearYouCard
                price={item?.price}
                isVerified={item?.isVerified}
                name={item?.name}
                image={item?.image}
                location={item?.location}
                distance={item?.distance}
                rating={item?.rating}
                reviews={item?.reviews}
                bookings={item?.bookings}
                connections={item?.connections}
                mutual_connections={item?.mutual_connections}
            />
        )
    }
    const renderItem2 = ({ item }) => {
        return (
            <RecommendedFriends
                price={item?.price}
                isVerified={item?.isVerified}
                name={item?.name}
                image={item?.image}
                location={item?.location}
                distance={item?.distance}
                rating={item?.rating}
                reviews={item?.reviews}
                bookings={item?.bookings}
                connections={item?.connections}
                mutual_connections={item?.mutual_connections}
            />
        )
    }

    return (
        <ImageBackground
            source={require('../assets/images/background.png')}
            style={{ flex: 1 }}>
            <View>
                <Searchbar
                    style={styles.searchBar}
                    placeholder='Search for friends or sitters.. '
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <View style={styles.statsTableContainer}>
                    <TouchableOpacity
                        onPress={onPressMySitters}
                        style={styles.statsTableBlock}>
                        <Text style={styles.infoText}>{recommendedFriends?.my_sitters}</Text>
                        <Text>My Sitters</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPressMyFriends}
                        style={styles.statsTableBlock}>
                        <Text style={styles.infoText}>{recommendedFriends?.my_friends}</Text>
                        <Text>My Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPressFriendsSitter}
                        style={styles.statsTableBlock}>
                        <Text style={styles.infoText}>{recommendedFriends?.friends_sitters}</Text>
                        <Text>Friends' Sitters</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewAllContainer}>
                    <Text >Sitters Near You</Text>
                    <Text
                        onPress={() => navigation.navigate('SittersNearYouList_Parent')}
                        style={styles.viewAllText}>View All</Text>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={sittersNearYou?.data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${index}`}
                />
                <View style={styles.viewAllContainer}>
                    <Text >Recommended Friends</Text>
                    <Text style={styles.viewAllText}>View All</Text>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={recommendedFriends?.data}
                    renderItem={renderItem2}
                    keyExtractor={(item, index) => `${index}`}
                />
            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    statsTableContainer:
    {
        flexDirection: 'row',
        width: '100%',
    },
    statsTableBlock:
    {
        height: 66,
        width: `${100 / 3}%`,
        borderWidth: 0.5,
        borderColor: Colors.gray,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    infoText:
    {
        color: Colors.Secondary,
        ...Fonts.xlSemiBold
    },
    searchBar: {
        margin: Spaces.med
    },
    viewAllContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: Spaces.med
    },
    viewAllText:
    {
        color: Colors.Secondary,
        textDecorationLine: 'underline',
    },
})

export default Community