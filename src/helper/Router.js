import { View, Text, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import SelectCountry from '../screens/SelectCountry';
import Password from '../screens/Password';
import Register from '../screens/Register';
import ChooseUserType from '../screens/ChooseUserType';
import Forgotpassword from '../screens/ForgotPassword';
import CountryList from '../screens/CountryList';
import ChatScreen from '../screens/ChatScreen';
import Splash from '../screens/Splash';
import Services from '../screens/Services';
import Profile from '../screens/Profile';
import ParentProfile from '../screens/ParentProfile';
import BookingDetailsPage from '../screens/BookingDetailsPage';
import ViewBookings from '../screens/ViewBookings';
import Filters from '../screens/Filters';
import { useSelector } from 'react-redux';
import TransactionHistory from '../screens/TransactionHistory';
import TimeSlotScreen from '../screens/TimeSlotScreen';
import BottomTabsParent from './BottomTabsParent';
import BottomTabsSitter from './BottomTabsSitter';
import { getLocalValue } from './LocalStore';
import { LOCAL_STORE } from './Utils';
import SwitchServices from '../screens/SwitchServices';
import SwitchUserType from '../screens/SwitchUserType';


const Router = () => {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const usertype = useSelector(state => state.global.usertype)
    const Stack = createNativeStackNavigator();

    console.log("USERTYPE at Router", usertype)
    const returnStack = () => {
        if (isLoggedIn) {
            if (usertype == "3") {
                return (
                    <Stack.Navigator screenOptions={{
                        headerBackTitleVisible: false,
                        headerShown: Platform.OS == "android" ? false : true
                    }}>
                        <Stack.Screen name="BottomTabsParent" component={BottomTabsParent} options={{ headerShown: false }} />
                        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerTitle: 'Chat' }} />
                        <Stack.Screen name="ParentProfile" component={ParentProfile} options={{ headerShown: true, headerTitle: 'Profile Details' }} />
                        <Stack.Screen name="BookingDetailsPage" component={BookingDetailsPage} options={{ headerTitle: 'Parent Profile' }} />
                        <Stack.Screen name="ViewBookings" component={ViewBookings} options={{ headerTitle: 'Booking' }} />
                        <Stack.Screen name="Filters" component={Filters} options={{ headerTitle: 'Filter' }} />
                        <Stack.Screen name="TransactionHistory" component={TransactionHistory} options={{ headerTitle: 'Transaction History' }} />
                        <Stack.Screen name="TimeSlotScreen" component={TimeSlotScreen} options={{ headerTitle: 'Book Slot' }} />
                        <Stack.Screen name="Profile" component={Profile} options={{}} />
                        <Stack.Screen name="SwitchServices" component={SwitchServices} options={{ headerTitle: 'Switch Services' }} />
                        <Stack.Screen name="SwitchUserType" component={SwitchUserType} options={{ headerTitle: 'Switch Role' }} />

                    </Stack.Navigator>
                )
            }
            else if (usertype == "2") {
                return (
                    <Stack.Navigator screenOptions={{
                        headerBackTitleVisible: false,
                        headerShown: Platform.OS == "android" ? false : true
                    }}>
                        <Stack.Screen name="BottomTabsSitter" component={BottomTabsSitter} options={{ headerShown: false }} />
                        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerTitle: 'Chat' }} />
                        <Stack.Screen name="ParentProfile" component={ParentProfile} options={{ headerShown: true, headerTitle: 'Profile Details' }} />
                        <Stack.Screen name="BookingDetailsPage" component={BookingDetailsPage} options={{ headerTitle: 'Parent Profile' }} />
                        <Stack.Screen name="ViewBookings" component={ViewBookings} options={{ headerTitle: 'Booking' }} />
                        <Stack.Screen name="Filters" component={Filters} options={{ headerTitle: 'Filter' }} />
                        <Stack.Screen name="TransactionHistory" component={TransactionHistory} options={{ headerTitle: 'Transaction History' }} />
                        <Stack.Screen name="TimeSlotScreen" component={TimeSlotScreen} options={{ headerTitle: 'Book Slot' }} />
                        <Stack.Screen name="Profile" component={Profile} options={{}} />
                    </Stack.Navigator>
                )
            }
        }
        else {
            return (
                <Stack.Navigator screenOptions={{
                    headerBackTitleVisible: false,
                    headerShown: Platform.OS == "android" ? false : true
                }}>
                    <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                    <Stack.Screen name="Services" component={Services} />
                    <Stack.Screen name="SelectCountry" component={SelectCountry} options={{ headerTitle: '' }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerTitle: '' }} />
                    <Stack.Screen name="Password" component={Password} options={{}} />
                    <Stack.Screen name="Register" component={Register} options={{}} />
                    <Stack.Screen name="ChooseUserType" component={ChooseUserType} options={{ headerTitle: '' }} />
                    <Stack.Screen name="CountryList" component={CountryList} options={{ headerTitle: 'Choose Country' }} />
                    <Stack.Screen name="ForgotPassword" component={Forgotpassword} options={{}} />
                </Stack.Navigator>
            )
        }
    }

    return (
        <NavigationContainer>
            {returnStack()}
        </NavigationContainer>
    )
}

export default Router