import { StyleSheet, TouchableOpacity, View, Dimensions, Modal, ImageBackground, Alert, useWindowDimensions, } from 'react-native'
import { TextInput, Text, configureFonts, DefaultTheme, Provider as PaperProvider, ActivityIndicator, Divider } from 'react-native-paper';
import React, { useState, useContext, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import CustomButton from '../components/Button';


const Register = ({ navigation, route }) => {
    const isFocused = useIsFocused()
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    const [password, setPassword] = useState("")

    
    const onPressContinue = () => {
       Alert.alert("Button Pressed")
    }
    return (
        <View style={styles.upperContainer}>

            {/* <ImageBackground source={require('../../assets/icons/pexels-lorilee-e-1309753.jpg')}
                style={{ height: H, width: W, opacity: 0.12, }} /> */}

            <ImageBackground
                source={{ uri: 'https://cdn2.momjunction.com/wp-content/uploads/2023/02/15-Best-Babysitting-Apps-For-Reliable-Childcare-624x702.jpg.webp' }}
                style={styles.ImageBackground} />
            <View style={styles.viewContainer1}>
                <View style={styles.viewContainer2}>
                    <Text style={[styles.text1, Fonts.xlSemiBold]}>Welcome back, Gaurav</Text>
                    <Divider style={styles.Devider}></Divider>
                    <View style={styles.textContainerForAlignment}>

                    <Text style={[styles.text2, Fonts.medMedium]}>Enter password to continue!</Text>

                        <TextInput style={[styles.textInput, Fonts.medMedium]}
                            placeholder="Enter Password"
                            mode="outlined"
                            placeholderTextColor={"gray"}
                            activeUnderlineColor={"green"}
                            value={password}
                            onChangeText={(text) => { setPassword(text) }} />
                       <CustomButton
                            title={'Continue'}
                            onPressButton={onPressContinue}
                        />
                        <Text 
                        
                        style={[styles.forgotpassword, Fonts.medMedium]}>Forgot Password?</Text>

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
      //  marginVertical: H*0.03,
        padding: Spaces.sm,
        textDecorationLine:'underline',
        alignItems: 'flex-start',
        color:Colors.buttoncolor
    },
    textInput:
    {
        backgroundColor: 'white',
        fontSize: Spaces.lar,
        height: 45,
        marginTop: H * 0.02,
        padding: 1,

    }
})
export default Register;
