import { Alert, Platform, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from '../screens/Account';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Dashboard_Sitter from '../screens/Dashboard_Sitter';
import Bookings_Sitter from '../screens/Bookings_Sitter';
import { LOCAL_STORE, handleGetRequest, handlePostRequest } from './Utils';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompleteYourProfile from '../screens/CompleteYourProfile';
import { useDispatch, useSelector } from 'react-redux';
import { setIsProfileCompleted } from '../redux/GlobalSlice';
import MyProfile_Sitter from '../screens/MyProfile_Sitter';
import { onNotificationReceiver, requestUserPermission } from './Notifications';
import { getLocalValue } from './LocalStore';

const BottomTabsSitter = () => {

    useEffect(() => {
        requestUserPermission()
        checkProfileStatus()
        {
            Platform.OS == 'android'
                &&
                onNotificationReceiver()
        }
        updateFcmToken()
    }, [])

    const isProfileCompleted = useSelector((state) => state.global.isProfileCompleted)
    const dispatch = useDispatch();

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
        const fcmToken = await getLocalValue(LOCAL_STORE.FCM_TOKEN)
        var formdata = new FormData()
        formdata.append('fcm_token', fcmToken)
        formdata.append('device_type', Platform.OS)
        const result = await handlePostRequest('update_fcm', formdata)
        console.log('fcmToken API result==>', result)
    }

    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator()

    return (
        isProfileCompleted
            ?
            <Tab.Navigator>
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
            </Tab.Navigator>
            :
            <Stack.Navigator>
                <Stack.Screen name='Complete Your Profile' component={MyProfile_Sitter} options={{ headerShown: true }} />
            </Stack.Navigator>

    )
}
export default BottomTabsSitter

const styles = StyleSheet.create({})