import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { Divider, List } from 'react-native-paper'
import Colors from '../helper/Colors'
import CustomButton from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'

const Account = ({ navigation }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
            action: () => navigation.navigate('Profile')
        },
        {
            title: 'Switch User Type',
        },
        {
            title: 'Tips & Articles',
        },
        {
            title: 'How we work',
        },
        {
            title: 'Pricing',
        },
        {
            title: 'Trust & Safety',
        },
        {
            title: 'Help',
        },
    ]

    const renderOptions = ({ item }) => {
        return (
            <>
                <List.Item
                    onPress={item?.action}
                    title={item?.title}
                    underlayColor={Colors.blue}
                />
                <Divider />
            </>
        )
    }

    return (
        <View>
            <FlatList
                data={DATA}
                renderItem={renderOptions}
                keyExtractor={(item, index) => `${index}`}
            />
            {
                !isLoggedIn
                &&
                <CustomButton
                    style={styles.button}
                    title='Login' />
            }
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