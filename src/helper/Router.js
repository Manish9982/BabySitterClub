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
import MyProfile_Sitter from '../screens/MyProfile_Sitter';
import ProfileOfParentDuringBooking_Sitter from '../screens/ProfileOfParentDuringBooking_Sitter';
import ProfileOfSitterDuringBooking_Parent from '../screens/ProfileOfSitterDuringBooking_Parent';
import BookingDetailsPage from '../screens/BookingDetailsPage';
import ViewBookings from '../screens/ViewBookings';
import Filters from '../screens/Filters';
import { useSelector } from 'react-redux';
import TransactionHistory from '../screens/TransactionHistory';
import TimeSlotScreen from '../screens/TimeSlotScreen';
import BottomTabsParent from './BottomTabsParent';
import BottomTabsSitter from './BottomTabsSitter';
import SwitchServices from '../screens/SwitchServices';
import SwitchUserType from '../screens/SwitchUserType';
import MyProfile_Parent from '../screens/MyProfile_Parent';
import ManageAddress from '../screens/ManageAddress';
import AddAddress from '../screens/AddAddress';
import AddAvailability_Sitter from '../screens/AddAvailability_Sitter';
import BookingConfirmation_Parent from '../screens/BookingConfirmation_Parent';
import PaymentWebview_Parent from '../screens/PaymentWebview_Parent';
import CreateBooking_Parent from '../screens/CreateBooking_Parent';
import NotificationsScreen from '../screens/NotificationsScreen';
import FAQs_Parent from '../screens/FAQs_Parent';
import FAQs_Sitter from '../screens/FAQs_Sitter';
import Help from '../screens/Help';

const Router = () => {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const usertype = useSelector(state => state.global.usertype)
    const Stack = createNativeStackNavigator();

    console.log("USERTYPE at Router", usertype)
    const returnStack = () => {
        if (isLoggedIn) {
            if (usertype == "3") {//Parent
                return (
                    <Stack.Navigator screenOptions={{
                        headerBackTitleVisible: false,
                        headerShown: Platform.OS == "android" ? false : true
                    }}>
                        <Stack.Screen name="BottomTabsParent" component={BottomTabsParent} options={{ headerShown: false }} />
                        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerTitle: 'Chat' }} />
                        <Stack.Screen name="ProfileOfSitterDuringBooking_Parent" component={ProfileOfSitterDuringBooking_Parent} options={{headerShown:true, headerTitle:'Profile Details'}} />
                        <Stack.Screen name="BookingDetailsPage" component={BookingDetailsPage} options={{ headerTitle: 'Parent Profile' }} />
                        <Stack.Screen name="ViewBookings" component={ViewBookings} options={{ headerTitle: 'Booking' }} />
                        <Stack.Screen name="Filters" component={Filters} options={{ headerTitle: 'Filter' }} />
                        <Stack.Screen name="TransactionHistory" component={TransactionHistory} options={{ headerTitle: 'Transaction History' }} />
                        <Stack.Screen name="TimeSlotScreen" component={TimeSlotScreen} options={{ headerTitle: 'Book Slot' }} />
                        <Stack.Screen name="MyProfile_Parent" component={MyProfile_Parent} options={{}} />
                        <Stack.Screen name="SwitchServices" component={SwitchServices} options={{ headerTitle: 'Switch Services' }} />
                        <Stack.Screen name="SwitchUserType" component={SwitchUserType} options={{ headerTitle: 'Switch Role' }} />
                        <Stack.Screen name="ManageAddress" component={ManageAddress} options={{ headerShown: true, headerTitle: 'Manage Address' }} />
                        <Stack.Screen name="AddAddress" component={AddAddress} options={{ headerShown: true, headerTitle: 'Add Address' }} />
                        <Stack.Screen name="BookingConfirmation_Parent" component={BookingConfirmation_Parent} options={{ headerShown: true, headerTitle: 'Confirm Booking' }} />
                        <Stack.Screen name="PaymentWebview_Parent" component={PaymentWebview_Parent} options={{}} />
                        <Stack.Screen name="CreateBooking_Parent" component={CreateBooking_Parent} options={{}} />
                        <Stack.Screen name="FAQs_Parent" component={FAQs_Parent} options={{ headerTitle: 'FAQs' }} />
                        <Stack.Screen name="Help" component={Help} options={{ headerShown:true,headerTitle: 'Help and Support' }} />

                    </Stack.Navigator>
                )
            }
            else if (usertype == "2") {//Sitter
                return (
                    <Stack.Navigator screenOptions={{
                        headerBackTitleVisible: false,
                        headerShown: Platform.OS == "android" ? false : true
                    }}>
                        <Stack.Screen name="BottomTabsSitter" component={BottomTabsSitter} options={{ headerShown: false }} />
                        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerTitle: 'Chat' }} />
                        <Stack.Screen name="ProfileOfParentDuringBooking_Sitter" component={ProfileOfParentDuringBooking_Sitter} options={{ headerShown: true, headerTitle: 'Profile Details' }} />
                        <Stack.Screen name="BookingDetailsPage" component={BookingDetailsPage} options={{ headerTitle: 'Parent Profile' }} />
                        <Stack.Screen name="ViewBookings" component={ViewBookings} options={{ headerTitle: 'Booking' }} />
                        <Stack.Screen name="Filters" component={Filters} options={{ headerTitle: 'Filter' }} />
                        <Stack.Screen name="TransactionHistory" component={TransactionHistory} options={{ headerTitle: 'Transaction History' }} />
                        <Stack.Screen name="TimeSlotScreen" component={TimeSlotScreen} options={{ headerTitle: 'Book Slot' }} />
                        <Stack.Screen name="MyProfile_Sitter" component={MyProfile_Sitter} options={{}} />
                        <Stack.Screen name="SwitchUserType" component={SwitchUserType} options={{ headerTitle: 'Switch Role' }} />
                        <Stack.Screen name="AddAvailability_Sitter" component={AddAvailability_Sitter} options={{ headerShown: true, headerTitle: 'Add Availabiltity' }} />
                        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerShown: true, headerTitle: 'My Notifications' }} />
                        <Stack.Screen name="FAQs_Sitter" component={FAQs_Sitter} options={{ headerTitle: 'FAQs' }} />
                        <Stack.Screen name="Help" component={Help} options={{ headerShown:true,headerTitle: 'Help and Support' }} />

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