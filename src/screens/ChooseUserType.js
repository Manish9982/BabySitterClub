import { ImageBackground, StyleSheet, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import CustomButton from '../components/Button'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'
import Fonts from '../helper/Fonts'

const ChooseUserType = () => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    return (
        <ImageBackground
            imageStyle={styles.imageStyle}
            source={require('../assets//images/app_bg.webp')}
            style={styles.container}>
            <View style={styles.smallBox}>
                <Text style={[styles.countryText, Fonts.xlSemiBold]}>India</Text>
            </View>
            <View style={styles.box}>
                <CustomButton
                    title={'I want to babysit'}
                    style={styles.button}
                />
                <CustomButton title={'I am looking for a babysitter'} />
            </View>

        </ImageBackground>
    )
}

export default ChooseUserType

const makeStyles = (H, W) => StyleSheet.create({
    container:
    {
        flex: 1,
    },
    imageStyle:
    {
        opacity: 0.5
    },
    button:
    {

    },
    smallBox:
    {
        width: W * 0.45,
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        top: H * 0.05,
        backgroundColor: Colors.grayTransparent,
        borderRadius: 8,
        padding: Spaces.xl,
        margin: Spaces.med,
    },
    box:
    {
        marginTop: H * 0.7,
        backgroundColor: Colors.grayTransparent,
        alignSelf: 'center',
        padding: Spaces.xl,
        borderRadius: 10
    },
    countryText:
    {
        color: Colors.white
    }

})