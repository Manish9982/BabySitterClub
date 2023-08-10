import { StyleSheet, View, ImageBackground, useWindowDimensions, Alert, SafeAreaView } from 'react-native'
import { Text, Divider } from 'react-native-paper';
import React, { useState } from 'react'
import Fonts from '../helper/Fonts';
import Spaces from '../helper/Spaces';
import CustomButton from '../components/Button';
import Colors from '../helper/Colors';
import TextInputComponent from '../components/TextInputComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Login = ({ navigation, route }) => {

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width

  const styles = makeStyles(H, W)

  const [email, setEmail] = useState("")

  const testEmail = (text) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(text)
  }

  const onPressContinue = () => {
    if (!testEmail(email)) {
      Alert.alert("Invalid Email", "Please enter valid email")

    } else {
      navigation.navigate("Password", { email: email })

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
        source={require('../assets/images/app_bg.webp')}
        style={styles.ImageBackground}>
        <View style={styles.viewContainer1}>
          <View style={styles.viewContainer2}>
            <Text style={[styles.text1, Fonts.xlSemiBold]}>Welcome to BabySitters Club</Text>
            <Divider style={styles.divider} />
            <View style={styles.textContainerForAlignment}>
              <Text style={[styles.text2, Fonts.medMedium]}>Please enter email to login or sign up!</Text>
              <TextInputComponent
                placeholder='Enter Email'
                value={email}
                onChangeText={(text) => { setEmail(text) }}
              />
              <CustomButton
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
    marginVertical: Spaces.med
  },
  text2:
  {
    marginTop: Spaces.med,
    alignItems: 'flex-start'
  },
  textUniversal:
  {
    padding: Spaces.med,
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
    marginVertical: Spaces.med
  },
  viewContainer2: {
    width: W * 0.95,
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 15,
    paddingVertical: Spaces.xl,
    marginBottom: H * 0.1
  },
})
export default Login;
