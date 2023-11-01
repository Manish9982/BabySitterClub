import { StyleSheet, View, ImageBackground, useWindowDimensions, Alert, TouchableOpacity, Platform } from 'react-native'
import { Text, Divider } from 'react-native-paper';
import React, { useEffect, useState } from 'react'
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import CustomButton from '../components/Button';
import TextInputComponent from '../components/TextInputComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { login } from '../redux/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LOCAL_STORE, handlePostRequest } from '../helper/Utils';
import { storeLocalValue } from '../helper/LocalStore';
import { getTokenForApp } from '../helper/Notifications';
import messaging from '@react-native-firebase/messaging';

const Password = ({ navigation, route }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const styles = makeStyles(H, W)

    const [password, setPassword] = useState("")
    const [loader, setLoader] = useState(false)
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    const userType = useSelector(state => state.global.usertype)
    const selectedService = useSelector(state => state.global.selectedService)
    const dispatch = useDispatch()

    const onPressContinue = async () => {
        if (password.length == 0) {
            Alert.alert("Alert", "Password can not be empty")
        } else {
            var formdata = new FormData()
            formdata.append("Email", route?.params?.email);
            formdata.append("Password", password);
            formdata.append("RoleId", `${userType}`);
            for (let i = 0; i < selectedService.length; i++) {
                formdata.append("ServiceId[]", `${selectedService?.[i]?.id}`);
            }
            formdata.append("device_type", Platform.OS);
            setLoader(true)
            const result = await handlePostRequest('login', formdata)
            if (result?.status == "200") {
                // if (Platform.OS == 'android') {
                if (Platform.OS == "ios") {
                    const authStatus = await messaging().requestPermission();
                    if (authStatus === 1) {
                        // //console.log("Trying To Get Token ======================>")
                        let fcmToken = await messaging().getToken();
                        if (fcmToken) {
                            const fcmToken = await messaging().getToken();
                            storeLocalValue(LOCAL_STORE.FCM_TOKEN, fcmToken)
                            console.log('fcmToken ==>', fcmToken)
                            // //console.log("fcmToken=========================================================================>", fcmToken)
                            // //console.log(" result of getToken at Dashboard===>", result)
                            // //console.log(" formdata  of getToken at Dashboard===>", formdata)
                        }
                    }
                }
                else {
                    const token = await messaging().getToken();
                    storeLocalValue(LOCAL_STORE.FCM_TOKEN, token)
                    console.log('fcmToken ==>', token)
                    // //console.log("fcmToken===>", token)
                    // //console.log(" result of getToken at Dashboard===>", result)
                    // //console.log(" formdata  of getToken at Dashboard===>", formdata)
                }
                // }
                await storeLocalValue(LOCAL_STORE.TOKEN, result?.token)
                dispatch(login())
            }
            else {
                Alert.alert('Alert', result?.message)
            }
            setLoader(false)
        }
    }
    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={styles.mainContainer}
            style={styles.mainContainer}>
            <ImageBackground
                imageStyle={styles.imageStyle}
                source={require('../assets/images/background.png')}
                style={styles.ImageBackground} >
                <View style={styles.viewContainer2}>
                    <Text style={[styles.text1, Fonts.xlSemiBold]}>Welcome back, {route?.params?.name}</Text>
                    <Divider style={styles.Divider}></Divider>
                    <View style={styles.textContainerForAlignment}>
                        <Text style={[styles.text2, Fonts.medMedium]}>Enter password to continue!</Text>
                        <TextInputComponent
                            isRightIconNeeded={true}
                            iconName={'eye'}
                            onPressIcon={() => setSecureTextEntry(prev => !prev)}
                            placeholder='Enter Password'
                            secureTextEntry={secureTextEntry}
                            value={password}
                            onChangeText={(text) => { setPassword(text) }}
                        />
                        <CustomButton
                            loader={loader}
                            title={'Continue'}
                            onPressButton={onPressContinue}
                        />
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("ForgotPassword")
                        }}>
                            <Text
                                style={[styles.forgotpassword, Fonts.medMedium]}>Forgot Password?</Text >
                        </TouchableOpacity>

                    </View>
                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>
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
    Divider: {
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
        fontSize: Spaces.lar,
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
    },

})
export default Password;
