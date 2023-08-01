import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

const ContactItem = ({ displayPicture, name, lastMessage, onPressContact }) => {
    return (
        <TouchableOpacity 
        onPress={onPressContact}
        style={styles.contactItem}>
            <Image
                defaultSource={require('../assets/images/profile-user.png')}
                source={displayPicture} style={styles.avatar} />
            <View style={styles.contactDetails}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.lastMessage}>{lastMessage}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ContactItem

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
    },
    contactItem:
    {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    avatar:
    {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    contactDetails:
    {
        flex: 1,
    },
    name:
    {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lastMessage:
    {
        fontSize: 14,
        color: '#666',
    }
})