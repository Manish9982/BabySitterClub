import { ImageBackground, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import CustomButton from '../components/Button'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'
import Fonts from '../helper/Fonts'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'

const ChooseUserType = ({ navigation }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    const onPressSmallBox = () => {
        navigation.navigate('CountryList')
    }

    const onPressOne = () => {
        navigation.navigate('Login')
    }
    const onPressTwo= () => {
        navigation.navigate('Login')
    }

    return (
        <ImageBackground
            imageStyle={styles.imageStyle}
            source={require('../assets//images/app_bg.webp')}
            style={styles.container}>
            <TouchableOpacity
                onPress={onPressSmallBox}
                style={styles.smallBox}>
                <Text style={[styles.countryText, Fonts.xlSemiBold]}>India <AntDesign name="caretright" size={16} /></Text>
            </TouchableOpacity>
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