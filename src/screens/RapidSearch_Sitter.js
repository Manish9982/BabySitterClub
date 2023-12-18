import { ImageBackground, Keyboard, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Text } from 'react-native-paper'
import Fonts from '../helper/Fonts'
import CustomButton from '../components/Button'
import TextInputComponent from '../components/TextInputComponent'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Colors from '../helper/Colors'
import Spaces from '../helper/Spaces'
import { Regexes } from '../helper/Utils'

const RapidSearch_Sitter = ({ navigation }) => {

  const [hourlyPrice, setHourlyPrice] = useState('');
  const [showWarning, setShowWarning] = useState(true)

  const onPressProceed = () => {
    navigation.navigate('BlitzCareListingSuccess_Sitter')
  }

  const handlePriceChange = (t) => {
    setHourlyPrice(t)
    if (Regexes.PRICE_REGEX.test(t)) {
      setShowWarning(false)
    }
    else {
      setShowWarning(true)
    }
  }

  return (
    <ImageBackground
      style={styles.primaryContainer}
      source={require('../assets/images/background.png')}>
      <KeyboardAwareScrollView>
        <Text style={styles.greeting1}>{"\n\n"}Discover the power of instant connections with SitterSphere's BlitzCare Program.</Text>
        <Text style={styles.greeting2}>{"\n"}By enrolling in BlitzCare, you can discover fresh job opportunities nearby.</Text>
        {/* <Text style={[styles.greeting2, { color: 'red' }]}>{"\n"}Please note that by opting for the BlitzCare Program, you'll be unavailable for regular bookings just for today.</Text> */}
        <Text style={[styles.greeting2, { color: 'red' }]}>{"\n"}Kindly ensure that you have no prior commitments scheduled for today before proceeding.</Text>
        <Text style={styles.greeting3}>{"\n"}Enter your hourly price for today to Proceed</Text>
        <TextInputComponent
          maxlength={3}
          style={styles.input}
          placeholder="Enter hourly price"
          value={hourlyPrice}
          onChangeText={handlePriceChange}
          keyboardType="numeric"
        />
        <Text style={[styles.greeting2, { marginVertical: Spaces.med }]}>Address : 123 Main Street, Dallas, TX 75201</Text>
        {
          showWarning
          &&
          <Text style={styles.warning}>Price is not valid</Text>
        }
        <CustomButton
          disabled={showWarning}
          onPressButton={onPressProceed}
          title={"Proceed"}
          style={styles.proceedButton}
        />
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

export default RapidSearch_Sitter

const styles = StyleSheet.create({
  primaryContainer:
  {
    flex: 1
  },
  greeting1:
  {
    //textAlign: 'center',
    ...Fonts.larSemiBold,
    alignSelf: 'center',
    width: "93%",
  },
  greeting2:
  {
    alignSelf: 'center',
    width: "93%",
    ...Fonts.larSemiBold
  },
  greeting3:
  {
    alignSelf: 'center',
    width: "93%",
    color: Colors.gray
    //...Fonts.larSemiBold
  },
  proceedButton:
  {

  },
  warning: {
    color: 'red',
    alignSelf: 'center'
  }
})