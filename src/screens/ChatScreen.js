import React, { useCallback, useRef, useState } from 'react';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text, Avatar, TextInput } from 'react-native-paper';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ChatScreen = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello!', fromMe: false, user: 'User A', profileImage: 'https://img.freepik.com/free-photo/man-looking-his-phone-while-wearing-brown-jacket_188544-20349.jpg?t=st=1691647567~exp=1691651167~hmac=5de8a4321f48d5903b28e42fa2272b60e137af38f8b853d91ec4c0461fb247d8&w=1800' },
        { id: '2', text: 'Hi there!', fromMe: true, user: 'You', profileImage: 'https://img.freepik.com/free-photo/young-woman-illuminated-night-texting-phone-generated-by-ai_188544-26190.jpg?t=st=1691647660~exp=1691651260~hmac=5503fa38c59e219f68b3e7d7cbf115d08d35179633643aa0dcdb16e3a1a5b9a8&w=1800' },
        // Add more messages as needed
    ]);

    const flatlistRef = useRef()

    const renderItem = (item, index) => {
        return (
            <View
                key={index}
                style={item?.fromMe ? styles.myMessages : styles.clientMessages}>
                <Text>{item?.text}</Text>
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

        setMessages([...messages, newMessage]);
        setMessage('');
        flatlistRef?.current?.scrollToEnd()
    }

    console.log(messages)
    return (
        <KeyboardAwareScrollView
            keyboardDismissMode='interactive'
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.container}>

            {/* <FlatList
                ref={flatlistRef}
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                inverted
            /> */}
            {
                messages?.map((item, index) => renderItem(item, index))
            }
            <TextInput
                right={
                    <TextInput.Icon
                        onTouchStart={sendMessage}
                        onPress={sendMessage}
                        icon='send' />
                }
                style={styles.messageInput}
                value={message}
                onChangeText={(text) => setMessage(text)}
                placeholder="Type your message..."
            />
        </KeyboardAwareScrollView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    messageInput:
    {
        position: 'absolute',
        width: '94%',
        alignSelf: 'center',
        backgroundColor: Colors.white,
        top: '90%'
    },
    container:
    {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    myMessages:
    {
        backgroundColor: Colors.MESSAGE_GREEN,
        alignSelf: 'flex-end',
        padding: Spaces.lar,
        marginHorizontal: Spaces.sm,
        marginVertical: Spaces.vsm,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,

    },
    clientMessages: {
        marginVertical: Spaces.vsm,
        backgroundColor: Colors.white,
        alignSelf: 'flex-start',
        padding: Spaces.lar,
        marginHorizontal: Spaces.sm,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    }
})