import { View, Text } from 'react-native'
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

const Router = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="SelectCountry" component={SelectCountry} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
                <Stack.Screen name="Password" component={Password} options={{headerShown:false}} />
                <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />
                <Stack.Screen name="ChooseUserType" component={ChooseUserType} options={{headerShown:false}} />
                <Stack.Screen name="CountryList" component={CountryList} options={{ headerTitle: 'Choose Country' }} />
                <Stack.Screen name="ForgotPassword" component={Forgotpassword} options={{headerShown:false}} />
                <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router