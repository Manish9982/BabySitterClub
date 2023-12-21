import { Alert, Modal, Platform, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchBabySitter_Parent from '../screens/SearchBabySitter_Parent';
import Bookings from '../screens/Bookings';
import Account from '../screens/Account';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Favourite_Parent from '../screens/Favourite_Parent';
import { useDispatch, useSelector } from 'react-redux';
import { setIsProfileCompleted, setDefaultAdressModalVisible } from '../redux/GlobalSlice';
import { LOCAL_STORE, handleGetRequest, handlePostRequest } from './Utils';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfile_Parent from '../screens/MyProfile_Parent';
import { onNotificationReceiver, requestUserPermission } from './Notifications';
import { getLocalValue, storeLocalValue } from './LocalStore';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import { ActivityIndicator, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import RapidSearch_Parent from '../screens/RapidSearch_Parent';
import Spaces from './Spaces';
import Colors from './Colors';
import Radar_Parent from '../screens/Radar_Parent';
import Fonts from './Fonts';

const ACTIVE_REQUEST_DETAILS = {
    data: {
        duration: "01:00 PM - 04:00 PM",
        price: "$ 13",
        service: "Baby Sitter",
        address: "Dallas",
        comment: "Hey this is a comment"
    }
}



const BottomTabsParent = ({ navigation }) => {

    const W = useWindowDimensions().width
    const H = useWindowDimensions().height

    const styles = makeStyles(H, W)

    useEffect(() => {
        checkCancelledBookings()
        checkProfileStatus()
        updateFcmToken()
        // if (Platform.OS == 'android') {
        requestUserPermission()
        onNotificationReceiver()
        //}
    }, [])

    const [location, setLocation] = useState(null)
    const [activeRequestDetails, setActiveRequestDetails] = useState(null)
    const [showActiveRequestModal, setShowActiveRequestModal] = useState(false)
    const [modalLoader, setModalLoader] = useState(true)


    const isProfileCompleted = useSelector((state) => state.global.isProfileCompleted)
    const isRequestActive = useSelector((state) => state.global.isRequestActive)
    const defaultAdressModalVisible = useSelector((state) => state.global.defaultAdressModalVisible)
    const defaultAddress = useSelector((state) => state.global.defaultAddress)
    const dispatch = useDispatch();

    // const [isProfileCompleted, setIsProfileCompleted] = useState(true)

    const getActiveRequestDetails = async () => {
        const result = await handleGetRequest('get_rapidReq_detail')
        if (result?.status == '200') {
            setShowActiveRequestModal(true)
            setActiveRequestDetails(result)
        }
        setModalLoader(false)
    }

    const onClose = () => {
        setShowActiveRequestModal(false)
    }

    const checkCancelledBookings = async () => {
        const result = await handleGetRequest('get_cancel_booking')
        console.log("Cancelled Bookings.", result)
        if (result?.status == '200') {
            navigation.navigate('CancelledBookings_Parent', { cancelled_bookings: JSON.stringify(result) })
        }
    }

    const updateFcmToken = async () => {
        const permissionRequest = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        console.log('permissionRequest', permissionRequest)
    }
    // const updateFcmToken = async () => {
    //     try {
    //         let permission;
    //         if (Platform.OS === 'ios') {
    //             permission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    //             console.log("permission", permission)
    //             if ((permission === RESULTS.DENIED) || (permission === RESULTS.UNAVAILABLE)) {
    //                 const permissionRequest = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    //                 console.log('permissionRequest', permissionRequest)
    //                 if (permissionRequest !== RESULTS.GRANTED) {
    //                     Alert.alert('Permission Denied', 'Please enable location services to help us refine your search results', [
    //                         {
    //                             text: 'OK',
    //                             onPress: () => openSettings()
    //                         },
    //                         {
    //                             text: 'Not Now',
    //                         },
    //                     ]);
    //                     const authStatus = await messaging().requestPermission();
    //                     if (authStatus === 1) {
    //                         // //console.log("Trying To Get Token ======================>")
    //                         let fcmToken = await messaging().getToken();
    //                         if (fcmToken) {
    //                             const fcmToken = await messaging().getToken();
    //                             storeLocalValue(LOCAL_STORE.FCM_TOKEN, fcmToken)
    //                             var formdata = new FormData()
    //                             formdata.append('fcm_token', fcmToken)
    //                             formdata.append('device_type', Platform.OS)
    //                             const result = await handlePostRequest('update_fcm', formdata)
    //                         }
    //                     }
    //                 } else {
    //                     console.log("Condition 1")
    //                     fetchLocation();
    //                 }
    //             } else {
    //                 console.log("Condition 2")
    //                 fetchLocation();
    //             }
    //         } else if (Platform.OS === 'android') {
    //             permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    //             console.log("permission", permission)
    //             console.log("RESULTS.DENIED", RESULTS.DENIED)
    //             if (permission === RESULTS.DENIED) {
    //                 const permissionRequest = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    //                 console.log("permissionRequest", permissionRequest)
    //                 if (permissionRequest !== RESULTS.GRANTED) {
    //                     Alert.alert('Permission Denied', 'Please enable location services to help us refine your search results', [
    //                         {
    //                             text: 'OK',
    //                             onPress: () => openSettings()
    //                         },
    //                         {
    //                             text: 'Cancel',
    //                         },
    //                     ]);
    //                     const authStatus = await messaging().requestPermission();
    //                     if (authStatus === 1) {
    //                         // //console.log("Trying To Get Token ======================>")
    //                         let fcmToken = await messaging().getToken();
    //                         if (fcmToken) {
    //                             const fcmToken = await messaging().getToken();
    //                             storeLocalValue(LOCAL_STORE.FCM_TOKEN, fcmToken)
    //                             var formdata = new FormData()
    //                             formdata.append('fcm_token', fcmToken)
    //                             formdata.append('device_type', Platform.OS)
    //                             const result = await handlePostRequest('update_fcm', formdata)
    //                         }
    //                     }
    //                 } else {
    //                     fetchLocation();
    //                 }
    //             } else {
    //                 fetchLocation();
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error requesting location permission:', error);
    //     }
    // }

    const fetchLocation = () => {
        Geolocation.getCurrentPosition(
            async (position) => {
                const authStatus = await messaging().requestPermission();
                if (authStatus === 1) {
                    // //console.log("Trying To Get Token ======================>")
                    let fcmToken = await messaging().getToken();
                    if (fcmToken) {
                        const fcmToken = await messaging().getToken();
                        storeLocalValue(LOCAL_STORE.FCM_TOKEN, fcmToken)
                        var formdata = new FormData()
                        formdata.append('fcm_token', fcmToken)
                        formdata.append('device_type', Platform.OS)
                        formdata.append('lat', position?.coords?.latitude)
                        formdata.append('long', position?.coords?.longitude)
                        const result = await handlePostRequest('update_fcm', formdata)
                    }
                }
            },
            (error) => {
                console.error('Error getting location:', error);
                Alert.alert('Error', 'Failed to fetch location.');
            },
            { enableHighAccuracy: true, }
        );
    };

    const checkProfileStatus = async () => {
        const result = await handleGetRequest('profile')
        if (result?.status == '200') {
            if (result?.userDetails?.status == '1') {
                dispatch(setIsProfileCompleted(true))
            }
            else {
                Alert.alert('Profile Incomplete', `Seems like you've not completed your Profile. Kindly fill in your details to continue using the App.`)
                dispatch(setIsProfileCompleted(false))
            }
        }
    }

    const onPressLocation = () => {
        dispatch(setDefaultAdressModalVisible(true))
    }

    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    console.log("Default Address ========>", defaultAddress)

    return (
        isProfileCompleted

            ?
            <>
                <Modal visible={showActiveRequestModal}
                    transparent={true}
                >
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={styles.overlay}>
                            <TouchableWithoutFeedback>
                                <View style={styles.popUp}>
                                    {
                                        modalLoader
                                            ?
                                            <ActivityIndicator
                                                size={'small'}
                                                color={Colors.Secondary}
                                            />
                                            :
                                            <>
                                                <TouchableOpacity
                                                    style={styles.closeButton}
                                                >
                                                    <AntDesign name="close" color={"red"} size={Spaces.xl} onPress={onClose} />
                                                </TouchableOpacity>
                                                <View>
                                                    <Text>
                                                        <Text style={{
                                                            ...Fonts.medBold,
                                                            //textDecorationLine: 'underline'
                                                        }}>Duration:</Text>
                                                        <Text > {activeRequestDetails?.data?.duration}</Text>
                                                    </Text>
                                                    <Text>
                                                        <Text style={{
                                                            ...Fonts.medBold,
                                                            //textDecorationLine: 'underline'
                                                        }}>Service:</Text>
                                                        <Text> {activeRequestDetails?.data?.service}</Text>
                                                    </Text>
                                                    <Text>
                                                        <Text style={{
                                                            ...Fonts.medBold,
                                                            //textDecorationLine: 'underline'
                                                        }}>Address:</Text>
                                                        <Text> {activeRequestDetails?.data?.address}</Text>
                                                    </Text>
                                                    <Text>
                                                        <Text style={{
                                                            ...Fonts.medBold,
                                                            //textDecorationLine: 'underline'
                                                        }}>Price:</Text>
                                                        <Text> {activeRequestDetails?.data?.price}</Text>
                                                    </Text>
                                                    <Text>
                                                        <Text style={{
                                                            ...Fonts.medBold,
                                                            //textDecorationLine: 'underline'
                                                        }}>Comments:</Text>
                                                        <Text> {activeRequestDetails?.data?.comment}</Text>
                                                    </Text>
                                                </View>
                                            </>
                                    }
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <Tab.Navigator screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.PRIMARY,
                    },
                    headerShadowVisible: true
                }}>
                    <Tab.Screen name="Search" component={SearchBabySitter_Parent} options={{
                        headerStyle: {
                            height: H * 0.14,
                            backgroundColor: Colors.PRIMARY
                        },
                        headerLeft: ({ color, size }) => {
                            return (
                                <TouchableOpacity
                                    onPress={onPressLocation}
                                    style={styles.locationBox}>
                                    <AntDesign name="enviromento" size={Spaces.xxxl} color={Colors.DEEP_GRAY} style={styles.search} />
                                    <Text
                                        style={styles.locationText}
                                        numberOfLines={1}>{defaultAddress?.city || "No address selected"}</Text>
                                </TouchableOpacity>
                            )
                        },
                        tabBarIcon: ({ color, size }) => <AntDesign name="search1" size={size} color={color} />
                    }} />
                    <Tab.Screen name="Favourites" component={Favourite_Parent} options={{
                        tabBarIcon: ({ color, size }) => <AntDesign name="staro" size={size} color={color} />
                    }} />
                    <Tab.Screen name="Bookings" component={Bookings} options={{
                        tabBarIcon: ({ color, size }) => <AntDesign name="calendar" size={size} color={color} />
                    }} />
                    {/* <Tab.Screen name="Messages" component={Messages} options={{
                tabBarIcon: ({ color, size }) => <AntDesign name="mail" size={size} color={color} />
            }} /> */}
                    <Tab.Screen name="Account" component={Account} options={{
                        tabBarIcon: ({ color, size }) => <AntDesign name="user" size={size} color={color} />
                    }} />
                    {
                        isRequestActive
                            ?
                            <Tab.Screen name="BlitzCare" component={Radar_Parent} options={{
                                headerShown: true,
                                headerTitle: 'Searching..',
                                headerRight: () => <AntDesign name="infocirlce" size={Spaces.xxl} color={Colors.black} onPress={getActiveRequestDetails} style={{
                                    marginRight: 8
                                }} />,
                                tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="fast-forward" size={size} color={color} />
                            }} />
                            :
                            <Tab.Screen name="BlitzCare" component={RapidSearch_Parent} options={{
                                headerStyle: {
                                    height: H * 0.14,
                                    backgroundColor: Colors.PRIMARY
                                },
                                headerLeft: ({ color, size }) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={onPressLocation}
                                            style={styles.locationBox}>
                                            <AntDesign name="enviromento" size={Spaces.xxxl} color={Colors.DEEP_GRAY} style={styles.search} />
                                            <Text
                                                style={styles.locationText}
                                                numberOfLines={1}>{defaultAddress?.city || "No address selected"}</Text>
                                        </TouchableOpacity>
                                    )
                                },
                                tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="fast-forward" size={size} color={color} />
                            }} />
                    }


                </Tab.Navigator>
            </>
            :
            <Stack.Navigator
                screenOptions={{
                    headerBackTitleVisible: false,
                    headerShown: Platform.OS == "android" ? true : true
                }}
            >
                <Stack.Screen name='Complete Your Profile' component={MyProfile_Parent} options={{ headerShown: true }} />
            </Stack.Navigator>
    )
}
export default BottomTabsParent

const makeStyles = (H, W) => StyleSheet.create({
    search:
    {

    },
    locationBox:
    {
        borderWidth: 1,
        borderRadius: 8,
        padding: Spaces.sm,
        margin: Spaces.sm,
        justifyContent: 'center',
        //alignItems:'center'
    },
    locationText:
    {
        maxWidth: W * 0.35,
    },
    overlay:
    {
        backgroundColor: 'rgba(0,0,0,0.4)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    popUp:
    {
        padding: 10,
        backgroundColor: Colors.white,
        borderRadius: 8,
        width: '80%',
        justifyContent: 'center',
        //alignItems: 'center'
    },
    closeButton:
    {
        // position: 'absolute',
        // //backgroundColor: 'red',
        alignSelf: 'flex-end',
        // right: 4,
        // top: 4
    }
})