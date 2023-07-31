import { StyleSheet, View, ImageBackground, useWindowDimensions, } from 'react-native'
import { Text, Divider } from 'react-native-paper';
import React, { useState } from 'react'
import Fonts from '../helper/Fonts';
import Spaces from '../helper/Spaces';
import CustomButton from '../components/Button';
import Colors from '../helper/Colors';
import TextInputComponent from '../components/TextInputComponent';

const Login = ({ navigation, route }) => {

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width

  const styles = makeStyles(H, W)

  const [email, setEmail] = useState("")

  const onPressContinue = () => {
    navigation.navigate("Password")
  }

  return (
    <ImageBackground
      imageStyle={{
        height: H,
        width: W,
        opacity: 0.4
      }}
      source={{ uri: 'https://cdn2.momjunction.com/wp-content/uploads/2023/02/15-Best-Babysitting-Apps-For-Reliable-Childcare-624x702.jpg.webp' }}
      style={styles.ImageBackground}>
      <View style={styles.viewContainer1}>
        <View style={styles.viewContainer2}>
          <Text style={[styles.text1, Fonts.xlSemiBold]}>Welcome to BabySits Club</Text>
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
  )
}

const makeStyles = (H, W) => StyleSheet.create({
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
    paddingVertical: Spaces.xl
  },
})
export default Login;
