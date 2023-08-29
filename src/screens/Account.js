import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { Divider, List } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../redux/AuthSlice'
import { clearStorage } from '../helper/LocalStore'

const Account = ({ navigation }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const usertype = useSelector((state) => state.global.usertype);
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(login());
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const DATA = [
        {
            title: 'Account',
            action: () => {
                if (usertype == '2') {
                    navigation.navigate('MyProfile_Sitter')
                }
                else if (usertype == '3') {
                    navigation.navigate('MyProfile_Parent')
                }
            }
        },
        {
            title: 'Manage Address',
            action: () => navigation.navigate('ManageAddress')
        },


        {
            title: 'Transaction History',
            action: () => navigation.navigate('TransactionHistory')
        },
        {
            title: 'Switch Role',
            action: () => navigation.navigate('SwitchUserType')
        },
        // {
        //     title: 'Tips & Articles',
        // },
        // {
        //     title: 'How we work',
        // },
        // {
        //     title: 'Pricing',
        // },
        // {
        //     title: 'Trust & Safety',
        // },
        {
            title: 'Help',
        },
        {
            title: 'Logout',
            action: () => handleLogout()
        },
    ]


    const renderOptions = ({ item }) => {
        if ((usertype == 2 && item.title !== 'Manage Address') || (usertype == 3)) {
            return (
                <>
                    <List.Item
                        onPress={item?.action}
                        title={item?.title}
                    />
                    <Divider />
                </>
            )
        }

    }
    return (
        <View>

            <FlatList
                data={DATA}
                renderItem={renderOptions}
                keyExtractor={(item, index) => `${index}`}
            />

            {/* {
                !isLoggedIn
                &&
                <CustomButton
                    style={styles.button}
                    title='Login' />
            } */}
        </View>
    )
}

export default Account

const makeStyles = (H, W) => StyleSheet.create({
    button: {
        position: 'absolute',
        top: H * 0.7
    }
})