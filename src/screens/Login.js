import { StyleSheet, View, ImageBackground, useWindowDimensions, Alert, SafeAreaView } from 'react-native'
import { Text, Divider } from 'react-native-paper';
import React, { useState } from 'react'
import Fonts from '../helper/Fonts';
import Spaces from '../helper/Spaces';
import CustomButton from '../components/Button';
import Colors from '../helper/Colors';
import TextInputComponent from '../components/TextInputComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { handlePostRequest } from '../helper/Utils';

const Login = ({ navigation, route }) => {

  //console.log("Services===   " , route?.params?.services)

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width

  const styles = makeStyles(H, W)

  const [email, setEmail] = useState("")
  const [loader, setLoader] = useState(false)

  const testEmail = (text) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(text)
  }

  const onPressContinue = async () => {
    if (!testEmail(email)) {
      Alert.alert("Invalid Email", "Please enter valid email")
    }
    else {
      var formdata = new FormData()
      formdata.append("Email", email);
      setLoader(true)
      const result = await handlePostRequest('verify', formdata)
      console.log("LoginResult" , result)
      if (result?.status == "200") {
        navigation.navigate("Password", { name: result?.userdata?.first_name, email: email })
      } else if (result?.status == "201") {
        Alert.alert('Alert', result?.message, [
          {
            text: 'Cancel',
            onPress: () => { },
            style: 'cancel',
          },
          { text: 'OK', onPress: () => navigation.navigate("Register", { email: email }) },
        ]);
      }
      else {
        Alert.alert(result?.message)
      }
      setLoader(false)
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        imageStyle={{
          flex: 1,
          opacity: 0.4
        }}
        source={require('../assets/images/background.png')}
        style={styles.ImageBackground}>
        <View style={styles.viewContainer1}>
          <View style={styles.viewContainer2}>
            <Text style={[styles.text1, Fonts.xlSemiBold]}>Welcome to Sitter Sphere</Text>
            <Divider style={styles.divider} />
            <View style={styles.textContainerForAlignment}>
              <Text style={[styles.text2, Fonts.medMedium]}>Please enter email to login or sign up!</Text>
              <TextInputComponent
                placeholder='Enter Email'
                value={email}
                onChangeText={(text) => { setEmail(text) }}
              />
              <CustomButton
                loader={loader}
                title={'Continue'}
                onPressButton={onPressContinue}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  )
}

const makeStyles = (H, W) => StyleSheet.create({
  mainContainer:
  {
    
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
    borderRadius: 5,
  },

  ImageBackground: {
    flex: 1
  },
  divider: {
    marginHorizontal: W * 0.02,
    color: "black",
  },
  textContainerForAlignment: {
    marginHorizontal: W * 0.05,
  },
  text:
  {
    textAlign: 'center',
    color: Colors.white,
    fontFamily: "Poppins-Regular",
  },
  text1:
  {
    alignSelf: 'center',
    marginVertical: Spaces.sm
  },
  text2:
  {
    marginTop: Spaces.sm,
    alignItems: 'flex-start'
  },
  textUniversal:
  {
    padding: Spaces.sm,
    paddingRight: 0,
    marginVertical: 20
  },
  textInput:
  {
    backgroundColor: 'white',
    fontSize: Spaces.lar,
    height: 45,
    marginTop: H * 0.02,
    padding: 1,
  },
  customButton:
  {
    marginVertical: Spaces.sm
  },
  viewContainer2: {
    width: W * 0.95,
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 15,
    paddingVertical: Spaces.lar,
    marginBottom: H * 0.1
  },
})
export default Login;
