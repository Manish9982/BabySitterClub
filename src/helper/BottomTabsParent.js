import { Alert, Platform, StyleSheet, } from 'react-native'
import React, { useEffect } from 'react'
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
            const result = Geolocation.requestAuthorization()
            console.log('Geolocation.requestAuthorization()', result)
            //Geolocation.getCurrentPosition(info => console.log(info));
        } catch (error) {
            Alert.alert(error)
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
            storeLocalValue('fcm_token', token)
            var formdata = new FormData()
            formdata.append('fcm_token', fcmToken)
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

            <Tab.Navigator>
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
            <Stack.Navigator>
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