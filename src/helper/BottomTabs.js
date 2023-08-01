import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchBabySitter from '../screens/SearchBabySitter';
import Favourites from '../screens/Favourites';
import Bookings from '../screens/Bookings';
import Messages from '../screens/Messages';
import Account from '../screens/Account';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'

const BottomTabs = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Search" component={SearchBabySitter} options={{
                tabBarIcon: ({ color, size }) => <AntDesign name="search1" size={size} color={color} />
            }} />
            <Tab.Screen name="Favourites" component={Favourites} options={{
                tabBarIcon: ({ color, size }) => <AntDesign name="staro" size={size} color={color} />
            }} />
            <Tab.Screen name="Bookings" component={Bookings} options={{
                tabBarIcon: ({ color, size }) => <AntDesign name="calendar" size={size} color={color} />
            }} />
            <Tab.Screen name="Messages" component={Messages} options={{
                tabBarIcon: ({ color, size }) => <AntDesign name="mail" size={size} color={color} />
            }} />
            <Tab.Screen name="Account" component={Account} options={{
                tabBarIcon: ({ color, size }) => <AntDesign name="user" size={size} color={color} />
            }} />
        </Tab.Navigator>
    )
}
export default BottomTabs

const styles = StyleSheet.create({})