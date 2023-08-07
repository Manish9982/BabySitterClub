import { View, Text, Platform } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import SelectCountry from '../screens/SelectCountry';
import Password from '../screens/Password';
import Register from '../screens/Register';
import ChooseUserType from '../screens/ChooseUserType';
import Forgotpassword from '../screens/ForgotPassword';
import CountryList from '../screens/CountryList';
import BottomTabs from './BottomTabs';
import ChatScreen from '../screens/ChatScreen';
import Splash from '../screens/Splash';
import Services from '../screens/Services';
import Profile from '../screens/Profile';
import ParentProfile from '../screens/ParentProfile';

const Router = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerBackTitleVisible: false,
                headerShown: Platform.OS == "android" ? false : true
            }}>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} options={{}} />
                <Stack.Screen name="Services" component={Services} />
                <Stack.Screen name="SelectCountry" component={SelectCountry} options={{ headerTitle: '' }} />
                <Stack.Screen name="Login" component={Login} options={{ headerTitle: '' }} />
                <Stack.Screen name="Password" component={Password} options={{}} />
                <Stack.Screen name="Register" component={Register} options={{}} />
                <Stack.Screen name="ChooseUserType" component={ChooseUserType} options={{ headerTitle: '' }} />
                <Stack.Screen name="CountryList" component={CountryList} options={{ headerTitle: 'Choose Country' }} />
                <Stack.Screen name="ForgotPassword" component={Forgotpassword} options={{}} />
                <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} options={{}} />
                <Stack.Screen name="ParentProfile" component={ParentProfile} options={{ headerTitle: 'Parent Profile' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router