import { StyleSheet, TouchableOpacity, View, Dimensions, Modal, ImageBackground, StatusBar, useWindowDimensions, } from 'react-native'
import { TextInput, Text,configureFonts, DefaultTheme, Provider as PaperProvider, ActivityIndicator, Divider } from 'react-native-paper';
import React, { useState, useContext, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';


const Login = ({ navigation, route }) => {
    const isFocused = useIsFocused()
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    const [email, setEmail] = useState("")
    return (
        <View style={styles.upperContainer}>

            {/* <ImageBackground source={require('../../assets/icons/pexels-lorilee-e-1309753.jpg')}
                style={{ height: H, width: W, opacity: 0.12, }} /> */}

            <ImageBackground
                source={{ uri: 'https://cdn2.momjunction.com/wp-content/uploads/2023/02/15-Best-Babysitting-Apps-For-Reliable-Childcare-624x702.jpg.webp' }}
                style={styles.ImageBackground} />
            <View style={styles.viewContainer1}>
                <View style={styles.viewContainer2}>
                    <Text style={[styles.text1, Fonts.xlSemiBold]}>Welcome to BabySits Club</Text>
                    <Divider style={styles.Devider}></Divider>
                    <View style={styles.textContainerForAlignment}>
                        <Text style={[styles.text2, Fonts.medMedium]}>Please enter email to login or sign up!</Text>
                        <TextInput style={[styles.textInput, Fonts.medMedium]}
                            placeholder="Enter Email"
                            mode="outlined"
                            activeUnderlineColor={"green"}
                            value={email}
                            onChangeText={(text) => { setEmail(text) }} />
                        <TouchableOpacity onPress={() => {navigation.navigate("Password")}} style={styles.button}>
                            <Text style={[styles.text, Fonts.medMedium]}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const makeStyles = (H, W) => StyleSheet.create({
    mainContainer:
    {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
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
        height: H, 
        width: W, 
        opacity: 0.2,
        backgroundColor:"#131313"
    },
    Devider: {
        marginHorizontal: W * 0.02, color: "black",
    },
    button:
    {
        backgroundColor: "#1e81b0",
        height: 45,
        width: "100%",
        justifyContent: 'center',
        borderRadius: 15,
        marginVertical: H * 0.04,
    },

    textContainerForAlignment: {
        marginHorizontal: W * 0.05,
    },
    text:
    {
        textAlign: 'center',
        color: 'white',
        
        fontFamily:"Poppins-Regular",
    },
    text1:
    {

        alignSelf: 'center',
        marginVertical: H * 0.03,
    },

    text2:
    {
        padding: 5,
        marginTop: 10,
        alignItems: 'flex-start'
    },
    textUniversal:
    {

        padding: 10,
        paddingRight: 0,
        marginVertical: 20
    },
    textInput:
    {
        backgroundColor: 'white',
        
        height: 45,
        marginTop: H * 0.02,
        padding: 1,

    }
})
export default Login;
