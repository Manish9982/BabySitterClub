import { ImageBackground, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import React, { useEffect } from 'react'

const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('SelectCountry')
        }, 2000);
    }, [])


    return (
        <ImageBackground
            style={styles.splash}
            imageStyle={styles.imgstyle}
            source={require('../assets/images/splash.jpg')}>
                <Text style={{
                    marginTop:-200,
                    fontSize:18
                }}>Insert Logo Here</Text>
                <Text style={{
                    marginTop:200,
                    fontSize:25
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