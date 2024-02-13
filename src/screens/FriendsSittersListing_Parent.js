import { FlatList, ImageBackground, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Searchbar, Text } from 'react-native-paper'
import RecommendedFriends from '../components/RecommendedFriends'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'

const DATA = {
    status: '200',
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

const FriendsSittersListing_Parent = () => {
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState('')
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        setSearchResults(DATA)
    }, [])

    const renderFriends = ({ item }) => {
        return (
            <RecommendedFriends
                width={"90%"}
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

    const onChangeSearch = (query) => {
        setSearchText(query);
        setShowLoader(true);

    }
    const onSubmitSearch = () => {
        // Perform any search logic here
        // For example, you can make an API call

        // Simulating an API call delay
        setTimeout(() => {
            // After the operation is done, hide the loader
            setShowLoader(false);
        }, 2000);
    };

    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={require('../assets/images/background.png')}
        >
            <View style={styles.searchContainer}>
               
                {showLoader && (
                    <ActivityIndicator
                        style={styles.loader}
                        size="small"
                        color={Colors.Secondary}
                    />
                )}
            </View>
            <FlatList
                data={searchResults?.data}
                renderItem={renderFriends}
                keyExtractor={(item, index) => `${index}`}
            />
        </ImageBackground>
    )
}

export default FriendsSittersListing_Parent

const styles = StyleSheet.create({
    searchBar:
    {

    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: Spaces.sm,
    },
    searchbar: {
        flex: 1,
    },
    loader: {
        marginLeft: 10,
    },
})