import { FlatList, ImageBackground, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import ChatHeads from './ChatHeads'

const DATA = {
    status: '200',
    data: [
        {
            name: 'Cassandra',
            profile: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            last_message: 'Please let me know when we can arrange a meeting',
            date: 'January 26',
        }
    ]
}

const MyMessages_Parent = () => {
    const [chatHeadsData, setChatHeadsData] = useState(null)

    useEffect(() => {
        setChatHeadsData(DATA)
    }, [])

    const renderChatHeads = ({ item }) => {
        return (
            <ChatHeads
                name={item?.name}
                date={item?.date}
                lastMessage={item?.last_message}
                profilePic={item?.profile}
            />
        )
    }

    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={require('../assets/images/background.png')}
        >
            <FlatList
                data={chatHeadsData?.data}
                renderItem={renderChatHeads}
                keyExtractor={(item, index) => `${index}`}
            />
        </ImageBackground>
    )
}

export default MyMessages_Parent

const styles = StyleSheet.create({})