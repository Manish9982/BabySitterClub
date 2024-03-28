import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import Colors from '../helper/Colors'
import { Text } from 'react-native-paper'
import Fonts from '../helper/Fonts'

const MessageComponent = ({ name, profilePicture, message, firstPerson, time, read }) => {
    console.log("Profile==>> " , profilePicture)
    return (
        <View style={[styles.messageStyle, {}]}>
            {
                firstPerson
                    ?
                    <View style={[styles.horizontalContainer, { alignSelf: 'flex-end', }]}>
                        <Text style={styles.time}>{time}</Text>
                        <View style={styles.messageFirstContainer}>
                            <Text style={styles.messageFirst}>{message}</Text>
                        </View>
                    </View>
                    :
                    <View style={styles.horizontalContainer}>
                        <Image
                            source={{ uri : profilePicture }}
                            style={styles.profilePic}
                        />
                        <View>
                            <Text style={styles.nameText}>{name}</Text>
                            <View style={[styles.horizontalContainer, { alignSelf: 'flex-start', }]}>
                                <View style={firstPerson ? styles.messageFirstContainer : styles.messageSecondContainer}>
                                    <Text style={firstPerson ? styles.messageFirst : styles.messageSecond}>{message}</Text>
                                </View>
                                <Text style={styles.time}>{time}</Text>
                            </View>
                        </View>
                    </View>
            }

        </View>
    )
}

export default MessageComponent

const styles = StyleSheet.create({
    profilePic:
    {
        height: 40,
        aspectRatio: 1,
        borderRadius: 50 / 2
    },
    horizontalContainer:
    {
        flexDirection: 'row'
    },
    messageStyle:
    {
        margin: 5,
    },
    messageFirst: {
        color: '#fff',
    },
    messageSecond:
    {
        color: '#000',
    },
    messageFirstContainer:
    {
        maxWidth: '75%',
        alignSelf: 'flex-end',
        backgroundColor: Colors.verificationBlue,
        padding: 10,
        borderRadius: 8,
        margin: 5,
    },
    messageSecondContainer:
    {
        maxWidth: '75%',
        alignSelf: 'flex-start',
        backgroundColor: Colors.messageGray,
        padding: 10,
        borderRadius: 8,
        margin: 5,
    },
    nameText: {
        marginLeft: 5,
    },
    time:
    {
        ...Fonts.vsm,
        alignSelf: 'flex-end',
        marginBottom: 4,
        color: 'gray'
    }

})