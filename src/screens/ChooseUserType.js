import { ImageBackground, StyleSheet, View, useWindowDimensions } from 'react-native'
import React from 'react'
import CustomButton from '../components/Button'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'

const ChooseUserType = ({ navigation }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    const onPressOne = () => {
        navigation.navigate('Login')
    }
    const onPressTwo = () => {
        navigation.navigate('Login')
    }

    return (
        <ImageBackground
            imageStyle={styles.imageStyle}
            source={require('../assets//images/app_bg.webp')}
            style={styles.container}>
            <View style={styles.box}>
                <CustomButton
                    onPressButton={onPressOne}
                    title={'I want to babysit'} //babysitters
                    style={styles.button}
                />
                <CustomButton
                    onPressButton={onPressTwo}
                    title={'I am looking for a babysitter'} // parent
                />
            </View>

        </ImageBackground>
    )
}

export default ChooseUserType

const makeStyles = (H, W) => StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent:'center'
    },
    imageStyle:
    {
        opacity: 0.5,
    },
    button:
    {

    },
    smallBox:
    {
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