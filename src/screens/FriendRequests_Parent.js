import { FlatList, ImageBackground, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import ConnectionRequestCard from '../components/ConnectionRequestCard'

const DATA = {
    status: '200',
    msg_title: 'Success',
    msg_body: 'Connections Fetched Successfully!',
    data: [
        {
            name: 'James Smith',
            profile: 'https://images.pexels.com/photos/701016/pexels-photo-701016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            bookings: '23',
            connections: '12',
            mutual_connections: '32',
            request_duration: 'few mins'
        }
    ]
}

const FriendRequests_Parent = () => {
    const [connectionRequests, setConnectionRequests] = useState(null)

    useEffect(() => {
        setConnectionRequests(DATA)
    }, [])

    const renderConnectionRequests = ({ item }) => {
        return (
            <ConnectionRequestCard
                name={item?.name}
                image={item?.profile}
                bookings={item?.bookings}
                connections={item?.connections}
                mutual_connections={item?.mutual_connections}
                requestDuration={item?.request_duration}
            />
        )
    }

    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={require('../assets/images/background.png')}
        >
            <FlatList
                data={connectionRequests?.data}
                renderItem={renderConnectionRequests}
                keyExtractor={(item, index) => `${index}`}
            />
        </ImageBackground>
    )
}

export default FriendRequests_Parent

const styles = StyleSheet.create({})