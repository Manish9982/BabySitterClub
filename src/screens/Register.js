import { StyleSheet, View, ImageBackground, useWindowDimensions, } from 'react-native'
import { Text, Divider } from 'react-native-paper';
import React, { useState } from 'react'
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import CustomButton from '../components/Button';
import TextInputComponent from '../components/TextInputComponent';

const Register = ({ navigation }) => {
  
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    const [name, setName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(true)

    const onDismissSnackBar = () => setVisible(false)

    const testEmail = (text) => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return regex.test(text)
    }
    const testName = (text) => {
        const regex = /^[a-zA-Z ]+$/
        return regex.test(text)
    }
    const testNumber = (num) => {
        const regex2 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        return regex2.test(num)
    }

    const onPressSignup = () => {
        if (!testName(name)) {
            Alert.alert("Alert", "Last Name can not be empty or contain special characters and numbers!")
        } else if (!testName(lastname)) {
            Alert.alert("Alert", "Last Name can not be empty or contain special characters and numbers!")
        } else if (!testEmail(email)) {
            Alert.alert("Alert", "Please enter valid email!")
        } else if (password.length == 0) {
            Alert.alert("Alert!", "Password can not be empty!")
        } else {
            navigation.navigate("ChooseUserType")
        }
    }
    
    return (
        <ImageBackground
            imageStyle={styles.imageStyle}
            source={require('../assets/images/app_bg.webp')}
            style={styles.ImageBackground}>
            <View style={styles.viewContainer2}>
                <Text style={[styles.text1, Fonts.xlSemiBold]}>Sign up</Text>
                <Divider style={styles.Devider}></Divider>
                <View style={styles.textContainerForAlignment}>
                    <Text style={[styles.text2, Fonts.medMedium]}>Please enter details to contiue!</Text>
                    <TextInputComponent
                        placeholder='Enter First Name'
                        value={name}
                        onChangeText={(text) => { setName(text) }}
                    />
                    <TextInputComponent
                        placeholder='Enter Last Name'
                        value={lastname}
                        onChangeText={(text) => { setLastName(text) }}
                    />
                    <TextInputComponent
                        placeholder='Enter Email'
                        value={email}
                        onChangeText={(text) => { setEmail(text) }}
                    />
                    <TextInputComponent
                        placeholder='Enter Password'
                        value={password}
                        onChangeText={(text) => { setPassword(text) }}
                    />
                    <CustomButton
                        onPressButton={onPressSignup}
                        title={'Sign up'}
                    />
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
        elevation: 15,
        paddingVertical: Spaces.xl

    },
    ImageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#131313"
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
export default Register;
