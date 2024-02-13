import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SittersNearYouCard from '../components/SittersNearYouCard'

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

const SittersNearYouList_Parent = () => {

    const [sittersNearYou, setSittersNearYou] = useState(null)

    useEffect(() => {
        setSittersNearYou(DATA)
    }, [])

    const renderSittersNearYou = ({ item }) => {
        return (
            <SittersNearYouCard
                size={350}
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
            style={styles.container}>
            <FlatList
                data={sittersNearYou?.data}
                renderItem={renderSittersNearYou}
                keyExtractor={(item, index) => `${index}`}
            />
        </ImageBackground>
    )
}

export default SittersNearYouList_Parent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 5,
    }
})