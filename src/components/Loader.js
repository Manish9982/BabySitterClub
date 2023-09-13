import { ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import Colors from '../helper/Colors'

const Loader = () => {
    return (
        <ImageBackground
            imageStyle={styles.imageStyle}
            source={require('../assets/images/background.png')}
            style={styles.container}>
            <ActivityIndicator
                color={Colors.selectedcolor}
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
    },
    imageStyle:
    {
        opacity: 0,
        backgroundColor:'transparent'
    },
})