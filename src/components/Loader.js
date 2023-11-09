import { ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'
import Colors from '../helper/Colors'
import LottieView from 'lottie-react-native'

const Loader = () => {
    return (
        <ImageBackground
            imageStyle={styles.imageStyle}
            source={require('../assets/images/background.png')}
            style={styles.container}>
            {/* <ActivityIndicator
                color={Colors.Secondary}
                size={"large"} /> */}
            <LottieView
                style={{
                    height: 100,
                    width: 100
                }}
                source={require("../assets/lottie/loader.json")} autoPlay loop />
            <Text>Loading...</Text>
        </ImageBackground>
    )
}

export default Loader

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle:
    {
        opacity: 0,
        backgroundColor: 'transparent'
    },
})