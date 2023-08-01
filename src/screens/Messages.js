import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ContactItem from '../components/ContactItem';

const Messages = ({ navigation }) => {
    // Sample data for contacts (you can replace this with your actual data)
    const [contacts, setContacts] = useState([
        {
            id: '1',
            name: 'John Doe',
            displayPicture: require('../assets/images/mother.png'),
            lastMessage: 'Hey, how are you?',
        },
        {
            id: '2',
            name: 'Jane Smith',
            displayPicture: require('../assets/images/mother.png'),
            lastMessage: 'Sure, see you then!',
        },
        // Add more contacts as needed
    ]);

    const onPressContact = (name) => {
        navigation.navigate('ChatScreen', { name: name })
    }

    const renderContactItem = ({ item }) => (
        <ContactItem
            onPressContact={() => onPressContact(item?.name)}
            displayPicture={item?.displayPicture}
            name={item?.name}
            lastMessage={item?.lastMessage}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                renderItem={renderContactItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

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
});

export default Messages;
