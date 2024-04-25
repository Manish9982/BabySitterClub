import { Alert, Modal, Platform, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
import { useDispatch, useSelector } from 'react-redux';
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
import { clearStorage } from './LocalStore';
import CancelledBookingDisplay_Sitter from '../screens/CancelledBookingDisplay_Sitter';
import ViewPicture from '../screens/ViewPicture';
import NotificationCenter_Parent from '../screens/NotificationCenter_Parent';
import CancelledBookings_Parent from '../screens/CancelledBookings_Parent';
import FindReplacements from '../screens/FindReplacements';
import CreateReplacementBooking_Parent from '../screens/CreateReplacementBooking_Parent';
import { Constants, handleGetRequest, handlePostRequest } from './Utils';
import AppUpdateMessageScreen from '../screens/AppUpdateMessageScreen';
import AutoCompleteScreen from '../screens/AutoCompleteScreen';
import Radar_Parent from '../screens/Radar_Parent';
import BlitzCareListingSuccess_Sitter from '../screens/BlitzCareListingSuccess_Sitter';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Spaces from './Spaces';
import Colors from './Colors';
import { ActivityIndicator, Text } from 'react-native-paper';
import Fonts from './Fonts';
import JobPostings_Sitter from '../screens/JobPostings_Sitter';
import Reviews_Parent from '../screens/Reviews_Parent';
import SittersNearYouList_Parent from '../screens/SittersNearYouList_Parent';
import FriendRequests_Parent from '../screens/FriendRequests_Parent';
import MyMessages_Parent from '../screens/MyMessages_Parent';
import ChatScreen_Parent from '../screens/ChatScreen_Parent';
import SearchScreen_Parent from '../screens/SearchScreen_Parent';
import Favourite_Parent from '../screens/Favourite_Parent';
import MyFriends_Parent from '../screens/MyFriends_Parent';
import FriendsProfile_Parent from '../screens/FriendsProfile_Parent';
import RequestSitter_Parent from '../screens/RequestSitter_Parent';
import { setDefaultAdressModalVisible } from '../redux/GlobalSlice';
import FriendsSittersListing_Parent from '../screens/FriendsSittersListing_Parent';
import CustomHeader from '../components/CustomHeader';
import ProfileOfSitterForViewing_Parent from '../screens/ProfileOfSitterForViewing_Parent';
import WelcomeScreen from '../screens/WelcomeScreen';
import TipPaymentWebview from '../screens/TipPaymentWebview';
import ChatScreen_Sitter from '../screens/ChatScreen_Sitter';
import SupportChat_ParentAndAdmin from '../screens/SupportChat_ParentAndAdmin';
import CustomHeaderForChat from '../components/CustomHeaderForChat';

const Router = ({ initialRouteName, data }) => {

    const [isAppUpdate, setIsAppUpdate] = useState(true)
    const [goHome, setGoHome] = useState(false)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const usertype = useSelector(state => state.global.usertype)
    const Stack = createNativeStackNavigator();
    const dispatch = useDispatch();
    const defaultAddress = useSelector((state) => state.global.defaultAddress)
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const dataParse = data !== undefined ? JSON.parse(data) : {}
    const styles = makeStyles(H, W)

    useEffect(() => {
        checkVersion()
    }, [])

    const checkVersion = async () => {
        var formdata = new FormData()
        formdata.append('version', Constants.VERSION)
        //formdata.append('version', '0.9')
        formdata.append('device_type', Platform.OS)
        const result = await handlePostRequest('check_version', formdata)
        if (result?.status == '201') {
            setIsAppUpdate(false)
        }
        console.log("checkVersion result===>", result)
    }

    const onPressLocation = () => {
        dispatch(setDefaultAdressModalVisible(true))
    }

    console.log("USERTYPE at Router(parent = 3; babysitter = 2 ) ========>", usertype)
    const returnStack = () => {
        if (isAppUpdate) {
            if (isLoggedIn) {
                if (usertype == "3") {//Parent
                    console.log('------------Parent is Logged In--------------')
                    return (
                        <Stack.Navigator
                            initialRouteName={goHome ? "BottomTabsParent" : initialRouteName}
                            screenOptions={{
                                statusBarColor: Colors.PRIMARY,
                                headerBackTitleVisible: false,
                                headerStyle: {
                                    backgroundColor: Colors.PRIMARY,
                                },
                            }}>
                            <Stack.Screen name="BottomTabsParent" component={BottomTabsParent} options={{ headerShown: false }} />
                            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerTitle: 'Chat' }} />
                            <Stack.Screen name="ProfileOfSitterDuringBooking_Parent" component={ProfileOfSitterDuringBooking_Parent} options={{ headerShown: true, headerTitle: 'Profile Details' }} />
                            <Stack.Screen name="BookingDetailsPage" component={BookingDetailsPage} options={{ headerTitle: 'Parent Profile' }} />
                            <Stack.Screen name="ViewBookings" component={ViewBookings} options={{ headerTitle: 'Booking' }} />
                            <Stack.Screen name="Filters" component={Filters} options={{ headerTitle: 'Filter' }} />
                            <Stack.Screen name="TransactionHistory" component={TransactionHistory} options={{ headerTitle: 'Transaction History' }} />
                            <Stack.Screen name="TimeSlotScreen" component={TimeSlotScreen} options={{ headerTitle: 'Book Slot' }} />
                            <Stack.Screen name="MyProfile_Parent" component={MyProfile_Parent} options={{ headerTitle: 'My Profile' }} />
                            <Stack.Screen name="SwitchServices" component={SwitchServices} options={{ headerTitle: 'Services' }} />
                            <Stack.Screen name="SwitchUserType" component={SwitchUserType} options={{ headerTitle: 'Role' }} />
                            <Stack.Screen name="ManageAddress" component={ManageAddress} options={{ headerShown: true, headerTitle: 'Manage Address' }} />
                            <Stack.Screen name="AddAddress" component={AddAddress} options={{ headerShown: true, headerTitle: 'Add Address' }} />
                            <Stack.Screen name="BookingConfirmation_Parent" component={BookingConfirmation_Parent} options={{ headerShown: true, headerTitle: 'Confirm Booking' }} />
                            <Stack.Screen name="PaymentWebview_Parent" component={PaymentWebview_Parent} options={{ headerTitle: 'Payment' }} />
                            <Stack.Screen name="CreateBooking_Parent" component={CreateBooking_Parent} options={{ headerTitle: 'Creating Booking' }} />
                            <Stack.Screen name="FAQs_Parent" component={FAQs_Parent} options={{ headerTitle: 'FAQs' }} />
                            <Stack.Screen name="Help" component={Help} options={{ headerShown: true, headerTitle: 'Help and Support' }} />
                            <Stack.Screen name="ViewPicture" component={ViewPicture} options={{ headerShown: true, headerTitle: '' }} />
                            <Stack.Screen name="NotificationCenter_Parent" component={NotificationCenter_Parent} options={{ headerShown: true, headerTitle: 'Notification Center' }} />
                            <Stack.Screen name="CancelledBookings_Parent" component={CancelledBookings_Parent} options={{ headerShown: true, headerTitle: 'Cancelled Bookings' }} />
                            <Stack.Screen name="FindReplacements" component={FindReplacements} options={{ headerShown: true, headerTitle: 'Choose New Booking' }} />
                            <Stack.Screen name="CreateReplacementBooking_Parent" component={CreateReplacementBooking_Parent} options={{ headerShown: true, headerTitle: 'Create Replacement Booking' }} />
                            <Stack.Screen name="AutoCompleteScreen" component={AutoCompleteScreen} options={{ headerShown: true, headerTitle: 'AutoCompleteScreen' }} />
                            <Stack.Screen name="Reviews_Parent" component={Reviews_Parent} options={{ headerShown: true, headerTitle: 'Reviews' }} />
                            <Stack.Screen name="SittersNearYouList_Parent" component={SittersNearYouList_Parent} options={{ headerShown: true, headerTitle: 'Sitters Near You' }} />
                            <Stack.Screen name="FriendRequests_Parent" component={FriendRequests_Parent} options={{ headerShown: true, headerTitle: 'Connection Requests' }} />
                            <Stack.Screen name="MyMessages_Parent" component={MyMessages_Parent} options={{ headerShown: true, headerTitle: 'Messages' }} />
                            <Stack.Screen name="ChatScreen_Parent" component={ChatScreen_Parent} options={{ headerShown: true, header: () => <CustomHeaderForChat onPressLeft={"BottomTabsParent"} title={'Chat'} /> }} initialParams={{
                                user_id: dataParse?.chat_userid
                            }} />
                            <Stack.Screen name="SearchScreen_Parent" component={SearchScreen_Parent} options={{ headerShown: true, headerTitle: 'Search' }} />
                            <Stack.Screen name="Favourite_Parent" component={Favourite_Parent} options={{ headerShown: true, headerTitle: 'Favourite Sitters' }} />
                            <Stack.Screen name="MyFriends_Parent" component={MyFriends_Parent} options={{ headerShown: true, headerTitle: 'My Friends' }} />
                            <Stack.Screen name="FriendsProfile_Parent" component={FriendsProfile_Parent} options={{ headerShown: true, headerTitle: 'Profile' }} />
                            <Stack.Screen name="FriendsSittersListing_Parent" component={FriendsSittersListing_Parent} options={{ headerShown: true, headerTitle: `Friends' Sitters` }} />
                            <Stack.Screen name="SupportChat_ParentAndAdmin" component={SupportChat_ParentAndAdmin} options={{ headerShown: true, headerTitle: 'Support' }} />
                            <Stack.Screen name="ProfileOfSitterForViewing_Parent" component={ProfileOfSitterForViewing_Parent} options={{ headerShown: true, headerTitle: `My Profile` }} />
                            <Stack.Screen name="RequestSitter_Parent" component={RequestSitter_Parent}
                                options={{
                                    headerShown: true,
                                    header: () => <CustomHeader title={'Request Sitters'} />,
                                }}
                            />
                            <Stack.Screen name="TipPaymentWebview" component={TipPaymentWebview}
                                options={{
                                    headerShown: true,
                                    headerTitle: "Payment",
                                }}
                            />

                        </Stack.Navigator>
                    )
                }
                else if (usertype == "2") {//Sitter
                    console.log("---------Sitter is Logged in------------")
                    return (
                        <Stack.Navigator
                            initialRouteName={goHome ? "BottomTabsSitter" : initialRouteName}
                            screenOptions={{
                                statusBarColor: Colors.PRIMARY,
                                headerBackTitleVisible: false,
                                headerShown: Platform.OS == "android" ? true : true
                            }}>
                            <Stack.Screen name="BottomTabsSitter" component={BottomTabsSitter} options={{ headerShown: false }} />
                            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerTitle: 'Chat' }} />
                            <Stack.Screen name="ProfileOfParentDuringBooking_Sitter" component={ProfileOfParentDuringBooking_Sitter} options={{ headerShown: true, headerTitle: 'Profile Details' }} />
                            <Stack.Screen name="BookingDetailsPage" component={BookingDetailsPage} options={{ headerTitle: 'Parent Profile' }} />
                            <Stack.Screen name="ViewBookings" component={ViewBookings} options={{ headerTitle: 'Booking' }} />
                            <Stack.Screen name="Filters" component={Filters} options={{ headerTitle: 'Filter' }} />
                            <Stack.Screen name="TransactionHistory" component={TransactionHistory} options={{ headerTitle: 'Transaction History' }} />
                            <Stack.Screen name="TimeSlotScreen" component={TimeSlotScreen} options={{ headerTitle: 'Book Slot' }} />
                            <Stack.Screen name="MyProfile_Sitter" component={MyProfile_Sitter} options={{ headerTitle: 'My Profile', headerShown: true }} />
                            <Stack.Screen name="SwitchUserType" component={SwitchUserType} options={{ headerTitle: 'Switch Role' }} />
                            <Stack.Screen name="AddAvailability_Sitter" component={AddAvailability_Sitter} options={{ headerShown: true, headerTitle: 'Add Availabiltity' }} />
                            <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerShown: true, headerTitle: 'My Notifications' }} />
                            <Stack.Screen name="FAQs_Sitter" component={FAQs_Sitter} options={{ headerTitle: 'FAQs' }} />
                            <Stack.Screen name="SwitchServices" component={SwitchServices} options={{ headerTitle: 'Switch Services' }} />
                            <Stack.Screen name="Help" component={Help} options={{ headerShown: true, headerTitle: 'Help and Support' }} />
                            <Stack.Screen name="CancelledBookingDisplay_Sitter" component={CancelledBookingDisplay_Sitter} options={{ headerShown: true, headerTitle: 'Cancelled Bookings' }} />
                            <Stack.Screen name="ViewPicture" component={ViewPicture} options={{ headerShown: true, headerTitle: '' }} />
                            <Stack.Screen name="AddAddress" component={AddAddress} options={{ headerShown: true, headerTitle: 'Add Address' }} />
                            <Stack.Screen name="ManageAddress" component={ManageAddress} options={{ headerShown: true, headerTitle: 'Manage Address' }} />
                            <Stack.Screen name="JobPostings_Sitter" component={JobPostings_Sitter} options={{ headerShown: true, headerTitle: 'New Jobs For You' }} />
                            <Stack.Screen name="SupportChat_ParentAndAdmin" component={SupportChat_ParentAndAdmin} options={{ headerShown: true, headerTitle: 'Support' }} />

                            <Stack.Screen name="ChatScreen_Sitter" component={ChatScreen_Sitter} options={{ headerShown: true, header: () => <CustomHeaderForChat onPressLeft={"BottomTabsSitter"} title={'Chat'} /> }} initialParams={{
                                user_id: dataParse?.chat_userid
                            }} />
                            <Stack.Screen name="BlitzCareListingSuccess_Sitter" component={BlitzCareListingSuccess_Sitter} options={{
                                headerShown: false,
                                headerTitle: 'BlitzCare',
                            }} />
                        </Stack.Navigator>
                    )
                }
            }
            else {
                return (
                    <Stack.Navigator screenOptions={{
                        statusBarColor: Colors.PRIMARY,
                        headerBackTitleVisible: false,
                        headerShown: Platform.OS == "android" ? true : true
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
                        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false, }} />
                    </Stack.Navigator>
                )
            }
        }
        else {
            return (
                <Stack.Navigator screenOptions={{
                    statusBarColor: Colors.PRIMARY,
                    headerBackTitleVisible: false,
                    headerShown: Platform.OS == "android" ? true : true
                }}>
                    <Stack.Screen name="AppUpdateMessageScreen" component={AppUpdateMessageScreen} options={{ headerTitle: 'App Update Reminder' }} />
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

const makeStyles = (H, W) => StyleSheet.create({
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
})

export default Router