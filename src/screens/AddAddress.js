import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, useWindowDimensions, Alert } from 'react-native';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import CustomButton from '../components/Button';
import { handleGetRequest, handlePostRequest } from '../helper/Utils';
import TextInputComponent from '../components/TextInputComponent';
import { Text } from 'react-native-paper';

const AddAddress = ({ navigation }) => {

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width
  const styles = makeStyles(H, W)

  const [streetNo, setStreetNo] = useState('');
  const [completeAddress, setCompleteAddress] = useState('');
  const [addressType, setAddresstype] = useState("Home")
  const [loader, setLoader] = useState(false)


  const addAddress = async () => {
    setLoader(true)
    if (streetNo?.length == 0) {
      Alert.alert("Alert", "Street no. can not be empty")
    } else if (completeAddress?.length == 0) {
      Alert.alert("Alert", "Complete address can not be empty")

    } else {
      var formdata = new FormData()
      formdata.append("title", addressType);
      formdata.append("address", `${streetNo}, ${completeAddress}`);

      const result = await handlePostRequest('address_add', formdata)

      if (result?.status == "200") {
        navigation.navigate("ManageAddress")
      } else if (result?.status == "201") {
        Alert.alert("Error", result?.message)
      } else {
        Alert.alert("Alert", result?.message)
      }
    }
    setLoader(false)
  }


  return (
    <View style={styles.container}>
      <Text style={[styles.title, Fonts.larMedium]}>Save Address As</Text>

      <View style={{
        flexDirection: "row",
        height: H * 0.04,
        marginTop: H * 0.01
      }}>
        <TouchableOpacity
          onPress={() => { setAddresstype("Home") }}
          style={{
            backgroundColor: addressType == "Home" ? Colors.blue : "white",
            borderColor: Colors.blue,
            alignItems: 'center',
            width: W * 0.17,
            borderRadius: 8,
            justifyContent: 'center',
            borderColor: Colors.blue,
            borderWidth: 1
          }}>

          <Text style={{
            textAlign: "center",
            color: addressType == "Home" ? "white" : "black",
          }}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { setAddresstype("Work") }}

          style={{
            backgroundColor: addressType == "Work" ? Colors.blue : "white",
            borderColor: 'gray',
            borderWidth: 1,
            borderColor: Colors.blue,
            alignItems: "center",
            width: W * 0.17,
            justifyContent: 'center',
            borderRadius: 8,
            marginStart: 10
          }}>
          <Text style={{ color: addressType == "Work" ? "white" : "black", }}>Work</Text>
        </TouchableOpacity>

      </View>


      <TextInputComponent
        style={[styles.input, Fonts.medMedium]}
        placeholder="Street No."
        value={streetNo}
        onChangeText={setStreetNo}
      />

      <TextInputComponent
        style={[styles.input2, Fonts.medMedium]}
        placeholder="Complete Address"
        value={completeAddress}
        onChangeText={setCompleteAddress}
        multiline
      />

      <CustomButton
        loader={loader}
        onPressButton={addAddress}
        title={'Save address'}
      />
    </View>
  );
};

const makeStyles = (H, W) => StyleSheet.create({
  container: {
    flex: 1,
    padding: Spaces.lar,
  },
  title: {
    color: "black"
  },
  input: {
    marginTop: H * 0.04,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: Spaces.med,
  },
  input2: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: Spaces.med,
    marginTop: H * 0.04,
    marginBottom: H * 0.05

  },

  buttonstyle: {
    marginTop: H * 0.5,

  },

  textStyle: {

  }


});

export default AddAddress;
