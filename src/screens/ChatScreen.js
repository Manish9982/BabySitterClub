import React, { useCallback, useRef, useState } from 'react';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text, Avatar, TextInput } from 'react-native-paper';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';

const ChatScreen = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello!', fromMe: false, user: 'User A', profileImage: 'https://img.freepik.com/free-photo/man-looking-his-phone-while-wearing-brown-jacket_188544-20349.jpg?t=st=1691647567~exp=1691651167~hmac=5de8a4321f48d5903b28e42fa2272b60e137af38f8b853d91ec4c0461fb247d8&w=1800' },
        { id: '2', text: 'Hi there!', fromMe: true, user: 'You', profileImage: 'https://img.freepik.com/free-photo/young-woman-illuminated-night-texting-phone-generated-by-ai_188544-26190.jpg?t=st=1691647660~exp=1691651260~hmac=5503fa38c59e219f68b3e7d7cbf115d08d35179633643aa0dcdb16e3a1a5b9a8&w=1800' },
        // Add more messages as needed
    ]);

    const flatlistRef = useRef()

    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: item.fromMe ? 'row-reverse' : 'row', marginVertical: 5, }}>
                {item.fromMe ? (
                    <View style={{ flex: 1 }} />
                ) : (
                    <Avatar.Image source={{ uri: item.profileImage }} size={40} />
                )}
                <View
                    style={{
                        backgroundColor: item.fromMe ? '#DCF8C6' : '#FFFFFF',
                        padding: 10,
                        borderRadius: 10,
                        flex: 3,
                        marginLeft: item.fromMe ? 40 : 0,
                    }}
                >
                    <Text>{item.text}</Text>
                </View>
                {item.fromMe && <Avatar.Image source={{ uri: item.profileImage }} size={40} />}
            </View>
        );
    };
    const sendMessage = () => {
        if (message.trim().length === 0) {
            return;
        }

        const newMessage = {
            id: (messages.length + 1).toString(),
            text: message,
            fromMe: true,
        };

        setMessages([newMessage, ...messages]);
        setMessage('');
        flatlistRef?.current?.scrollToEnd()
    }

    console.log(messages)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                ref={flatlistRef}
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                inverted
            />
            <TextInput
                right={
                    <TextInput.Icon
                        onPress={sendMessage}
                        icon='send' />
                }
                style={StyleSheet.messageInput}
                value={message}
                onChangeText={(text) => setMessage(text)}
                placeholder="Type your message..."
            />
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    messsageInput:
    {
        backgroundColor: Colors.white,
        borderRadius: 5,
        margin: Spaces.lar,
        width: '90%',
        alignSelf: 'center'
    }
})