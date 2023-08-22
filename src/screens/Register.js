import React, { useState } from 'react';
import { View, ImageBackground, Alert, Platform } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/AuthSlice';
import { LOCAL_STORE, handlePostRequest } from '../helper/Utils';
import Fonts from '../helper/Fonts';
import CustomButton from '../components/Button';
import TextInputComponent from '../components/TextInputComponent';
import Spaces from '../helper/Spaces';
import { storeLocalValue } from '../helper/LocalStore';

const Register = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState(route?.params?.email);
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false)

    const usertype = useSelector(state => state.global.usertype)
    const selectedService = useSelector(state => state.global.selectedService)
    const dispatch = useDispatch();

    const testEmail = (text) => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(text);
    };
    const testName = (text) => {
        const regex = /^[a-zA-Z ]+$/;
        return regex.test(text);
    };
    const testNumber = (num) => {
        const regex2 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return regex2.test(num);
    };
    const onPressSignup = async () => {



        if (!testName(name)) {
            Alert.alert('Invalid First Name', 'First Name can not be empty or contain special characters and numbers');
        } else if (!testName(lastname)) {
            Alert.alert('Invalid Last Name', 'Last Name can not be empty or contain special characters and numbers');
        } else if (!testEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter valid email');
        } else if (password.length === 0) {
            Alert.alert('Invalid Password!', 'Password can not be empty');
        } else {

            var formdata = new FormData()
            formdata.append("FirstName", name);
            formdata.append("LastName", lastname);
            formdata.append("Email", route?.params?.email);
            formdata.append("Password", password);
            formdata.append("RoleId", usertype?.toString());  //2 for ServiceProvider , // 3 for Client
            for (let i = 0; i < selectedService.length; i++) {
                formdata.append("ServiceId[]", selectedService?.[i]?.id);
            }
            setLoader(true)
            const result = await handlePostRequest('register', formdata)
            console.log("Signup====== " , result)

            if (result?.status == "200") {
                storeLocalValue(LOCAL_STORE.TOKEN, result?.token)
                dispatch(login())
            }
            else {
                Alert.alert('Alert', result?.message)
            }
            setLoader(false)
        }

    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer}>
            <ImageBackground
                imageStyle={styles.imageStyle}
                source={require('../assets/images/app_bg.webp')}
                style={styles.imageBackground}>
                <View style={styles.viewContainer}>
                    <Text style={[styles.text, Fonts.xlSemiBold]}>Sign up</Text>
                    <Divider style={styles.divider} />
                    <View style={styles.textContainer}>
                        <Text style={[styles.text, styles.subText, Fonts.medMedium]}>Please enter details to continue!</Text>
                        <TextInputComponent
                            placeholder='Enter First Name'
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                        <TextInputComponent
                            placeholder='Enter Last Name'
                            value={lastname}
                            onChangeText={(text) => setLastName(text)}
                        />
                        <TextInputComponent
                            editable={false}
                            placeholder='Enter Email'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInputComponent
                            placeholder='Enter Password'
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <CustomButton
                            loader={loader}
                            onPressButton={onPressSignup}
                            title={'Sign up'}
                        />
                    </View>
                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>
    );
};

const styles = {
    mainContainer: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewContainer: {
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 15,
        paddingVertical: Spaces.med,
        paddingHorizontal: Spaces.med,
        marginTop: Platform.OS === 'ios' ? 40 : 0, // Adjust marginTop for iOS header
    },
    text: {
        ...Fonts.med,
        alignSelf: 'center',
        marginVertical: 20,
    },
    divider: {
        marginHorizontal: 5,
        backgroundColor: 'black',
    },
    subText: {
        marginBottom: Spaces.lar,
    },
    textContainer: {
        marginHorizontal: '5%',
    },
    imageStyle: {
        opacity: 0.5
    }
};

export default Register;
