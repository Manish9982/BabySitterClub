import React, { useCallback, useRef, useState } from 'react';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text, Avatar, TextInput } from 'react-native-paper';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';

const ChatScreen = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello!', fromMe: false },
        { id: '2', text: 'Hi there!', fromMe: true },
        // Add more messages as needed
    ]);

    const flatlistRef = useRef()

    const renderItem = ({ item }) => {
        return (
            <View style={{ alignItems: item.fromMe ? 'flex-end' : 'flex-start', marginVertical: 5 }}>
                <View
                    style={{
                        backgroundColor: item.fromMe ? '#DCF8C6' : '#FFFFFF',
                        padding: 10,
                        borderRadius: 10,
                    }}
                >
                    <Text>{item.text}</Text>
                </View>
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