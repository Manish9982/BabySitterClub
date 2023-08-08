import { ImageBackground, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLocalValue, storeLocalValue } from '../helper/LocalStore'
import { LOCAL_STORE } from '../helper/Utils'
import { login, logout } from '../redux/AuthSlice'

const Splash = ({ navigation }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            checkStatus()
        }, 2000);
    }, [])

    const handleLogin = () => {
        dispatch(login());
    };

    const handleLogout = () => {
        dispatch(logout());
        navigation.navigate('SelectCountry')
    };

    const checkStatus = async () => {
        const status = await getLocalValue(LOCAL_STORE.LOGIN)
        console.log('status', status)
        if (status == 'true') {
            handleLogin()
        }
        else {
            handleLogout()
        }
    }

    return (
        <ImageBackground
            style={styles.splash}
            imageStyle={styles.imgstyle}
            source={require('../assets/images/splash.jpg')}>
            <Text style={{
                marginTop: -200,
                fontSize: 18
            }}>Insert Logo Here</Text>
            <Text style={{
                marginTop: 200,
                fontSize: 25
            }}>The BabySitters Club</Text>
        </ImageBackground>
    )
}

export default Splash

const styles = StyleSheet.create({
    splash:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgstyle:
    {
        opacity: 0.3
    }
})