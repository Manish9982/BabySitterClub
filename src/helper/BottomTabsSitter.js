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
import { setIsProfileCompleted } from '../redux/GlobalSlice';
import MyProfile_Sitter from '../screens/MyProfile_Sitter';
import { onNotificationReceiver, requestUserPermission } from './Notifications';
import { getLocalValue, storeLocalValue } from './LocalStore';
import AddAvailability_Sitter from '../screens/AddAvailability_Sitter';
import AddAddress from '../screens/AddAddress';
import Geolocation from '@react-native-community/geolocation';
import messaging from '@react-native-firebase/messaging';
import RapidSearch_Sitter from '../screens/RapidSearch_Sitter';
import Colors from './Colors';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
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
    }, [])

    useEffect(() => {
        return notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.DISMISSED:
                    console.log('User dismissed notification', detail.notification);
                    break;
                case EventType.PRESS:
                    console.log('User pressed notification', detail?.notification?.data?.onClick);
                    if (detail?.notification?.data?.onClick) {
                        if (detail?.notification?.data?.onClick !== 'default') {
                            navigation.navigate(detail?.notification?.data?.onClick)
                        }
                    }
                    break;
            }
        });
    }, []);

    // const [isProfileCompleted, setIsProfileCompleted] = useState(true)

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
                <Stack.Screen name='Complete Your Profile' component={MyProfile_Sitter} options={{ headerShown: true }} />
                <Stack.Screen name="AddAvailability_Sitter" component={AddAvailability_Sitter} options={{ headerShown: true, headerTitle: 'Add Availabiltity' }} />
                <Stack.Screen name="AddAddress" component={AddAddress} options={{ headerShown: true, headerTitle: 'Add Address' }} />
            </Stack.Navigator>

    )
}
export default BottomTabsSitter

const styles = StyleSheet.create({})