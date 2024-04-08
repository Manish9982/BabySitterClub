import { StyleSheet, View, Image, ImageBackground, ScrollView, KeyboardAvoidingView, Keyboard, useWindowDimensions, FlatList, Modal, TouchableOpacity, Alert, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Text, TextInput } from 'react-native-paper'
import MessageComponent from '../components/MessageComponent'
import Colors from '../helper/Colors'
import { useIsFocused } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import ImageCropPicker from 'react-native-image-crop-picker'
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions'
import { handlePostRequest } from '../helper/Utils'

const DATA = {
    status: "200",
    msg_title: "Success",
    msg_body: "Messages Fetched Successfully",
    data:
        [
            {
                "first_person": false,
                "message": "Yeah! same here.",
                "name": "Monique Wells",
                "profile_pic": "https://images.pexels.com/photos/7282818/pexels-photo-7282818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "read": false,
                "time": "15:34"
            },
            {
                "first_person": true,
                "message": "I am liking this app.",
                "name": "Monique Wells",
                "profile_pic": "https://images.pexels.com/photos/6414654/pexels-photo-6414654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "read": true,
                "time": "14:24"
            },
            {
                "first_person": false,
                "message": "Okay. Let me know if you liked the offer.",
                "name": "Monique Wells",
                "profile_pic": "https://images.pexels.com/photos/7282818/pexels-photo-7282818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "read": false,
                "time": "13:28"
            },
            {
                "first_person": true,
                "message": "Not Right now but I will let you know.",
                "name": "Monique Wells",
                "profile_pic": "https://images.pexels.com/photos/6414654/pexels-photo-6414654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "read": true,
                "time": "13:26"
            },
            {
                "first_person": false,
                "message": "Hi! Are you Free?",
                "name": "Monique Wells",
                "profile_pic": "https://images.pexels.com/photos/7282818/pexels-photo-7282818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                "read": false,
                "time": "13:24"
            }
        ]
}

export default function ChatScreen_Sitter({ navigation, route }) {

    console.log("ID WITH NAME ", route?.params?.name)

    const [messages, setMessages] = useState([])
    const [apiResult, setApiResult] = useState(null)
    const [keyboardHeight, setKeyboardHeight] = useState(0)
    const [camVisible, setCamVisible] = useState(false)
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [loader, setLoader] = useState('')
    const [msg, setMsg] = useState('')
    const isFocused = useIsFocused()

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            ({ endCoordinates }) => {
                setKeyboardHeight(endCoordinates.height)
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardHeight(0)
            }
        );
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [messages])

    // useEffect(() => {
    //     if (isFocused) {
    //         setApiResult(DATA)
    //         setMessages(DATA?.data)
    //     }
    // }, [isFocused])
    useEffect(() => {
        getMessages()
    }, [])


    useEffect(() => {
        checkPermission();
    }, []);

    const getMessages = async () => {
        setLoader(true)
        var formdata = new FormData()
        formdata.append('user_id', route?.params.user_id)
        const result = await handlePostRequest('get_message', formdata)
        console.log("Result Provider ", result)
        if (result?.status == '200') {
            //Alert.alert("Update Staus in API")
            setApiResult(result)
            setMessages(result?.data)
        }
        else {
            Alert.alert('Error', result?.message)
        }
        setLoader(false)
    }



    const checkPermission = async () => {
        const permission = Platform.select({
            android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            //ios: PERMISSIONS.IOS.
        });
        check(PERMISSIONS.IOS.LOCATION_ALWAYS)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        console.log('The permission has not been requested / is denied but requestable');
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch((error) => {
                // …
            });
    };

    const renderMessages = ({ item, index }) => {
        return (
            <MessageComponent
                name={item?.name}
                key={index}
                profilePicture={item?.profile_pic}
                message={item?.message}
                firstPerson={item?.first_person}
                time={item?.time}
                read={item?.read}
            />
        )
    }

    const onPressSend = async () => {
        console.log("Send")
        setLoader(true)
        var formdata = new FormData()
        formdata.append('user_id', route?.params.user_id)
        formdata.append('message', msg)
        const result = await handlePostRequest('sent_message', formdata)
        if (result?.status == '200') {
            setMsg('')
            getMessages()
        }
        else {
            Alert.alert('Error', result?.message)
        }
        setLoader(false)
    }
    const requestGalleryPermission = async () => {
        const permission = Platform.select({
            android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
        });
        const result = await request(permission);
        if (result === RESULTS.GRANTED) {
            openGallery();
        } else {
            Alert.alert('Permission denied', 'You need to grant gallery permission to proceed.');
        }
    };

    const onPressGallery = async () => {
        console.log('hi')
        console.log('galleryPermission', galleryPermission)

        if (galleryPermission === RESULTS.GRANTED) {
            console.log('1')
            openGallery();
        } else if (galleryPermission === RESULTS.DENIED) {
            console.log('2')
            requestGalleryPermission();
        } else {
            console.log('3')
            //openGallery();
            requestGalleryPermission();
            //checkPermission();
        }
    }

    const openGallery = async () => {
        ImageCropPicker.openPicker({
            mediaType: 'photo'
        }).then(images => {
            uploadPhoto(images)
            //ShortToast('Hi', 'progress', '')
        }).catch((error) => console.log(error));
    }
    const uploadPhoto = async (pic) => {
        // setLoading(true)
        // var formdata = new FormData();
        // const temp = await getDataFromLocalStorage('user_id')
        // const temp2 = await getDataFromLocalStorage('coach_id')
        // formdata.append("user_id", JSON.parse(temp));
        // if (pic.length > 1) {

        //   for (var i = 0; i < pic.length; i++) {
        //     formdata.append('icon[]', {
        //       name: pic?.[i]?.path,
        //       type: pic?.[i]?.mime,
        //       uri: pic?.[i]?.path,
        //     });
        //   }
        // }
        // else {
        //   formdata.append('icon[]', {
        //     name: pic?.[0]?.path,
        //     type: pic?.[0]?.mime,
        //     uri: pic?.[0]?.path
        //   })
        // }
        // formdata.append("reciever_id", JSON.parse(temp2));
        // console.log("FORMDATA====================================================", formdata)
        // const result = await PostApiData('sendermessage', formdata)
        // if (result.status == '200') {
        //   setCamVisible(false)
        //   setLoading(false)
        // }
        // else ShortToast(result.message, 'error', '')
        // setLoading(false)
        Alert.alert('Image Upload API')
    }

    return (

        loader ?
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size={"small"}
                    color={"blue"}
                />
            </View>

            :
            Platform.OS == "ios" ?

                <ImageBackground
                    style={{ flex: 1, paddingBottom: keyboardHeight + 80 }}
                    source={require('../assets/images/background.png')}>

                    <FlatList
                        data={messages}
                        renderItem={renderMessages}
                        keyExtractor={(item, index) => `${index}`}
                        inverted
                    />
                    <View
                        style={[styles.keyboardAvoidingContainer, { bottom: keyboardHeight }]}
                    >
                        <TextInput
                            mode='outlined'
                            outlineColor={Colors.Secondary}
                            activeOutlineColor={Colors.Secondary}
                            style={styles.textInput}
                            value={msg}
                            onChangeText={setMsg}
                            right={<TextInput.Icon onPress={onPressSend} icon={'send'} />}
                            placeholder='Write something here..'
                        // left={<TextInput.Icon onPress={onPressGallery} icon={'image'} />}
                        />
                    </View>



                </ImageBackground >



                :



                <ImageBackground
                    style={{ flex: 1, paddingBottom: 80 }}
                    source={require('../assets/images/background.png')}
                >
                    <FlatList
                        data={messages}
                        renderItem={renderMessages}
                        keyExtractor={(item, index) => `${index}`}
                        inverted
                    />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : null}
                        style={styles.keyboardAvoidingContainer}
                    >
                        <TextInput
                            mode='outlined'
                            outlineColor={Colors.Secondary}
                            activeOutlineColor={Colors.Secondary}
                            style={styles.textInput}
                            value={msg}
                            onChangeText={setMsg}
                            right={<TextInput.Icon onPress={onPressSend} icon={'send'} />}
                            placeholder='Write something here..'
                        />
                    </KeyboardAvoidingView>
                </ImageBackground>




    );
};





const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        paddingHorizontal: 16, // Adjust as needed
        paddingBottom: 16, // Adjust as needed
    },
    textInput: {
        // Your text input styles here
        backgroundColor: '#fff',
    }
});