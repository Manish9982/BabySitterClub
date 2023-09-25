import { ImageBackground, StyleSheet, Image, useWindowDimensions, View } from 'react-native'
import { Text } from 'react-native-paper'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearStorage, getLocalValue } from '../helper/LocalStore'
import { LOCAL_STORE } from '../helper/Utils'
import { login, logout } from '../redux/AuthSlice'
import { setUsertype } from '../redux/GlobalSlice'

const Splash = ({ navigation }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    useEffect(() => {
        setTimeout(() => {
            checkStatus()
        }, 2000);
    }, [])

    const checkStatus = async () => {
        const status = await getLocalValue(LOCAL_STORE.LOGIN)
        const USER = await getLocalValue(LOCAL_STORE.USER_TYPE)
        console.log("LOGIN=======  ", status)

        if (status == 'true') {
            dispatch(login());
            dispatch(setUsertype(`${USER}`))
        }
        else {
            dispatch(logout());
            navigation.replace("SelectCountry")
        }
    }

    return (
        <ImageBackground
            style={styles.splash}
            imageStyle={styles.imgstyle}
            source={require('../assets/images/background.png')}>

            <Image
                style={styles.imageSplash}
                source={require('../assets/images/splashimage.png')} />
        </ImageBackground>
    )
}

export default Splash

const makeStyles = (H, W) => StyleSheet.create({
    splash:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgstyle:
    {
        //    opacity: 0.3
    },
    imageSplash:
    {
        width: W * 0.9,
        height: W * 0.4,
        resizeMode: "contain"
    }
})