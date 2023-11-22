import { Alert, Platform, StyleSheet, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchBabySitter_Parent from '../screens/SearchBabySitter_Parent';
import Bookings from '../screens/Bookings';
import Account from '../screens/Account';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Favourite_Parent from '../screens/Favourite_Parent';
import { useDispatch, useSelector } from 'react-redux';
import { setIsProfileCompleted } from '../redux/GlobalSlice';
import { LOCAL_STORE, handleGetRequest, handlePostRequest } from './Utils';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfile_Parent from '../screens/MyProfile_Parent';
import { onNotificationReceiver, requestUserPermission } from './Notifications';
import { getLocalValue, storeLocalValue } from './LocalStore';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';


const BottomTabsParent = ({ navigation }) => {

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

    const isProfileCompleted = useSelector((state) => state.global.isProfileCompleted)
    const dispatch = useDispatch();

    // const [isProfileCompleted, setIsProfileCompleted] = useState(true)

    const checkCancelledBookings = async () => {
        const result = await handleGetRequest('get_cancel_booking')
        console.log("Cancelled Bookings.", result)
        if (result?.status == '200') {
            navigation.navigate('CancelledBookings_Parent', { cancelled_bookings: JSON.stringify(result) })
        }
    }

    const updateFcmToken = async () => {
        try {
            let permission;
            if (Platform.OS === 'ios') {
                permission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
                if (permission === RESULTS.DENIED) {
                    const permissionRequest = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
                    if (permissionRequest !== RESULTS.GRANTED) {
                        Alert.alert('Permission Denied', 'Please enable location services to help us refine your search results', [
                            {
                                text: 'OK',
                                onPress: () => openSettings()
                            }
                        ]);
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
                                const result = await handlePostRequest('update_fcm', formdata)
                            }
                        }
                    } else {
                        fetchLocation();
                    }
                } else {
                    fetchLocation();
                }
            } else if (Platform.OS === 'android') {
                permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
                console.log("permission", permission)
                console.log("RESULTS.DENIED", RESULTS.DENIED)
                if (permission === RESULTS.DENIED) {
                    const permissionRequest = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
                    console.log("permissionRequest", permissionRequest)
                    if (permissionRequest !== RESULTS.GRANTED) {
                        Alert.alert('Permission Denied', 'Please enable location services to help us refine your search results', [
                            {
                                text: 'OK',
                                onPress: () => openSettings()
                            }
                        ]);
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
                                const result = await handlePostRequest('update_fcm', formdata)
                            }
                        }
                    } else {
                        fetchLocation();
                    }
                } else {
                    fetchLocation();
                }
            }
        } catch (error) {
            console.error('Error requesting location permission:', error);
        }
    }

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

    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    return (
        isProfileCompleted

            ?

            <Tab.Navigator screenOptions={{}}>
                <Tab.Screen name="Search" component={SearchBabySitter_Parent} options={{
                    // headerRight: ({ color, size }) => <AntDesign name="search1" size={Spaces.xxxl} color={color} style={styles.search} />,
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
            </Tab.Navigator>
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

const styles = StyleSheet.create({
    search:
    {
        marginRight: 15
    }
})