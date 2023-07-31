import { StyleSheet, View, ImageBackground, useWindowDimensions, } from 'react-native'
import { Text, Divider } from 'react-native-paper';
import React, { useState } from 'react'
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import CustomButton from '../components/Button';
import TextInputComponent from '../components/TextInputComponent';

const Password = ({ navigation }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    const [password, setPassword] = useState("")

    const onPressContinue = () => {
        navigation.navigate("Register")
    }
    return (
        <ImageBackground
            imageStyle={styles.imageStyle}
            source={{ uri: 'https://cdn2.momjunction.com/wp-content/uploads/2023/02/15-Best-Babysitting-Apps-For-Reliable-Childcare-624x702.jpg.webp' }}
            style={styles.ImageBackground} >
            <View style={styles.viewContainer2}>
                <Text style={[styles.text1, Fonts.xlSemiBold]}>Welcome back, Gaurav</Text>
                <Divider style={styles.Devider}></Divider>
                <View style={styles.textContainerForAlignment}>
                    <Text style={[styles.text2, Fonts.medMedium]}>Enter password to continue!</Text>
                    <TextInputComponent
                        placeholder='Enter Password'
                        value={password}
                        onChangeText={(text) => { setPassword(text) }}
                    />
                    <CustomButton
                        title={'Continue'}
                    />
                    <Text
                        style={[styles.forgotpassword, Fonts.medMedium]}>Forgot Password?</Text>
                </View>
            </View>
        </ImageBackground>
    )
}

const makeStyles = (H, W) => StyleSheet.create({
    mainContainer:
    {
        flex: 1
    },
    upperContainer:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },

    viewContainer1: {
        height: H,
        width: W,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute"
    },

    viewContainer2: {
        width: W * 0.95,
        backgroundColor: "white",
        borderRadius: 5,
        elevation: 15
    },
    ImageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Devider: {
        marginHorizontal: W * 0.02,
        color: "black",
    },


    textContainerForAlignment: {
        marginHorizontal: W * 0.05,
    },
    text:
    {
        textAlign: 'center',
        color: 'white',
        fontSize: Spaces.lar,
    },
    text1:
    {
        fontSize: Spaces.xl,
        alignSelf: 'center',
        marginVertical: H * 0.03
    },

    text2:
    {
        padding: Spaces.sm,
        fontSize: Spaces.lar,
        marginTop: Spaces.sm,
        alignItems: 'flex-start'
    },
    forgotpassword:
    {
        fontSize: Spaces.lar,
        marginVertical: H * 0.03,
        padding: 5,
        textDecorationLine: 'underline',
        alignItems: 'flex-start',
        color: Colors.buttoncolor
    },
    textInput:
    {
        backgroundColor: 'white',
        fontSize: Spaces.lar,
        height: 45,
        marginTop: H * 0.02,
        padding: 1,
    },
    imageStyle:
    {
        flex: 1,
        opacity: 0.5
    }

})
export default Password;
