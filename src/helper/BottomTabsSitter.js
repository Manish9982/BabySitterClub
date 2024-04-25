import { Alert, Platform, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from '../screens/Account';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Dashboard_Sitter from '../screens/Dashboard_Sitter';
import Bookings_Sitter from '../screens/Bookings_Sitter';
import { LOCAL_STORE, handleGetRequest, handlePostRequest } from './Utils';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompleteYourProfile from '../screens/CompleteYourProfile';
import { useDispatch, useSelector } from 'react-redux';
import { setIsProfileCompleted, setMessages } from '../redux/GlobalSlice';
import MyProfile_Sitter from '../screens/MyProfile_Sitter';
import { onDisplayNotification, onNotificationReceiver, requestUserPermission } from './Notifications';
import { getLocalValue, storeLocalValue } from './LocalStore';
import AddAvailability_Sitter from '../screens/AddAvailability_Sitter';
import AddAddress from '../screens/AddAddress';
import Geolocation from '@react-native-community/geolocation';
import messaging from '@react-native-firebase/messaging';
import RapidSearch_Sitter from '../screens/RapidSearch_Sitter';
import Colors from './Colors';
import PushNotification from "react-native-push-notification";
import notifee, { EventType } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';


const BottomTabsSitter = () => {
    const isProfileCompleted = useSelector((state) => state.global.isProfileCompleted)
    const navigation = useNavigation()
    const dispatch = useDispatch();
    useEffect(() => {
        //notificationServices()
        requestUserPermission()
        checkProfileStatus()
        // {
        //     Platform.OS == 'android'
        //         &&
        onNotificationReceiver()
        //}
        updateFcmToken()
        notificationConfig()
    }, [])

    useEffect(() => {
        return notifee.onForegroundEvent(({ detail, type }) => {

            switch (type) {
                case EventType.DISMISSED:
                    console.log('User dismissed notification', detail.notification);
                    break;
                case EventType.PRESS:
                    if (detail?.notification?.data?.onClick) {

                        navigation.navigate(detail?.notification?.data?.onClick, { "user_id": detail?.notification?.data?.chat_userid })
                        //     { "user_id": `14` })
                        // navigation.navigate("Bookings", 
                        //     { "user_id": `14` })

                    }
                    break;
            }
        });
    }, []);
    useEffect(() => {
        return notifee.onBackgroundEvent(({ detail, type }) => {

            switch (type) {
                case EventType.DISMISSED:
                    console.log('User dismissed notification', detail.notification);
                    break;
                case EventType.PRESS:
                    if (detail?.notification?.data?.onClick) {

                        navigation.navigate(detail?.notification?.data?.onClick, { "user_id": detail?.notification?.data?.chat_userid })
                        //     { "user_id": `14` })
                        // navigation.navigate("Bookings", 
                        //     { "user_id": `14` })

                    }
                    break;
            }
        });
    }, []);
    useEffect(() => {
        getStatusOfBookingFlag()
    }, [])

    const getStatusOfBookingFlag = async () => {
        const status = await getLocalValue(LOCAL_STORE.BOOKING_FLAG)
        if (status == '1') {
            navigation.navigate("Bookings")
            storeLocalValue(LOCAL_STORE.BOOKING_FLAG, '0')
        }
    }

    // const [isProfileCompleted, setIsProfileCompleted] = useState(true)

    const notificationConfig = async () => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
            //
            // if (remoteMessage?.data?.type == "cancel") {
            //     navigation.navigate('CancelledBookings_Parent', { cancelled_bookings: {} })
            // }
            if (remoteMessage?.data?.type == "chat") {
                var formdata = new FormData()
                formdata.append('user_id', remoteMessage?.data?.chat_userid)
                const result = await handlePostRequest('get_message', formdata)
                if (result?.status == '200') {
                    dispatch(setMessages(result?.data))
                    console.log('sitter messages fetched successfully')
                }
            }

            onDisplayNotification(remoteMessage?.notification?.title,
                remoteMessage?.notification?.body, remoteMessage?.data)
        });

        return unsubscribe;
    }

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

    const updateFcmToken = async () => {
        try {

        } catch (error) {

        }
        if (Platform.OS == "ios") {
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
                    formdata.append('lat', '')
                    formdata.append('long', '')
                    const result = await handlePostRequest('update_fcm', formdata)
                    console.log('fcmToken API result==>', result)
                    // //console.log("fcmToken=========================================================================>", fcmToken)
                    // //console.log(" result of getToken at Dashboard===>", result)
                    // //console.log(" formdata  of getToken at Dashboard===>", formdata)
                }
            }
        }
        else {
            const token = await messaging().getToken();
            storeLocalValue(LOCAL_STORE.FCM_TOKEN, token)
            var formdata = new FormData()
            formdata.append('fcm_token', token)
            formdata.append('device_type', Platform.OS)
            formdata.append('lat', '')
            formdata.append('long', '')
            const result = await handlePostRequest('update_fcm', formdata)
            console.log('fcmToken API result==>', result)
            // //console.log("fcmToken===>", token)
            // //console.log(" result of getToken at Dashboard===>", result)
            // //console.log(" formdata  of getToken at Dashboard===>", formdata)
        }
    }

    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator()

    return (
        isProfileCompleted
            ?
            <Tab.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.PRIMARY
                }
            }}>
                {/* <Tab.Screen name="Search" component={SearchBabySitter} options={{
                tabBarIcon: ({ color, size }) => <AntDesign name="search1" size={size} color={color} />
            }} /> */}
                <Tab.Screen name="Home" component={Dashboard_Sitter} options={{
                    tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />
                }} />
                <Tab.Screen name="Bookings" component={Bookings_Sitter} options={{
                    tabBarIcon: ({ color, size }) => <AntDesign name="calendar" size={size} color={color} />
                }} />
                {/* <Tab.Screen name="Messages" component={Messages} options={{
                tabBarIcon: ({ color, size }) => <AntDesign name="mail" size={size} color={color} />
            }} /> */}
                <Tab.Screen name="Account" component={Account} options={{
                    tabBarIcon: ({ color, size }) => <AntDesign name="user" size={size} color={color} />
                }} />
                <Tab.Screen name="BlitzCare" component={RapidSearch_Sitter} options={{
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="fast-forward" size={size} color={color} />
                }} />
            </Tab.Navigator>
            :
            <Stack.Navigator
                screenOptions={{
                    headerBackTitleVisible: false,
                    headerShown: Platform.OS == "android" ? true : true
                }}
            >
                <Stack.Screen name="Complete Your Profile" component={MyProfile_Sitter} options={{ headerShown: true }} />
                <Stack.Screen name="AddAvailability_Sitter" component={AddAvailability_Sitter} options={{ headerShown: true, headerTitle: 'Add Availabiltity' }} />
                <Stack.Screen name="AddAddress" component={AddAddress} options={{ headerShown: true, headerTitle: 'Add Address' }} />
            </Stack.Navigator>
    )
}
export default BottomTabsSitter

const styles = StyleSheet.create({})