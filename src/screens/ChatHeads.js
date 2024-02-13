import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import Spaces from '../helper/Spaces'
import Colors from '../helper/Colors'
import Fonts from '../helper/Fonts'
import { useNavigation } from '@react-navigation/native'

const ChatHeads = ({ id, profilePic, name, date, lastMessage }) => {
    const navigation = useNavigation()
    const onPressChat = () => {
        navigation.navigate('ChatScreen_Parent')
    }
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPressChat}
        >
            <Image
                source={{
                    uri: profilePic
                }}
                style={styles.profilePic}
            />
            <View style={styles.secondContainer}>
                <View style={styles.nameContainerText}>
                    <Text
                        numberOfLines={1}
                        style={styles.nameText}>{name}</Text>
                    <Text style={{ ...Fonts.sm }}>{date}</Text>
                </View>
                <Text numberOfLines={2} style={styles.lastMessageText}>{lastMessage}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatHeads

const styles = StyleSheet.create({
    container:
    {
        flexDirection: 'row',
        padding: 7,
        borderWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.4)'
    },
    profilePic: {
        height: 70,
        aspectRatio: 1,
        borderRadius: 70 / 2,
        borderColor: Colors.selectedcolor,
        borderWidth: 1
    },
    nameContainerText:
    {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    secondContainer:
    {
        flex: 1,
        paddingHorizontal: Spaces.sm
    },
    nameText:
    {
        ...Fonts.larBold,
        width: '70%',
    },
    lastMessageText:
    {
        ...Fonts.med,
        opacity: 0.5
    }

})