import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import Colors from '../helper/Colors'

const Loader = () => {
    return (
        <ImageBackground
            imageStyle={styles.imageStyle}
            source={require('../assets/images/app_bg.webp')}
            style={styles.container}>
            <ActivityIndicator
                color={Colors.LIGHT_BLUE}
                size={"large"} />
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
        backgroundColor: Colors.white
    },
    imageStyle:
    {
        opacity: 0.5,
    },
})