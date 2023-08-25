import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';

const AddAddress = () => {

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width
  const styles = makeStyles(H,W)

  const [streetNo, setStreetNo] = useState('');
  const [completeAddress, setCompleteAddress] = useState('');
  const [addressType, setAddresstype] = useState("Home")

  

  const handleSaveAddress = () => {
    // Handle saving address logic here
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, Fonts.larMedium]}>Save Address As</Text>

     
      <View style={{
        flexDirection: "row",
        height: H * 0.04,
      }}>
        <TouchableOpacity
          onPress={() => { setAddresstype("Home") }}
          style={{
            backgroundColor: addressType == "Home" ? Colors.blue : "white",
            borderColor: Colors.blue,
            alignItems: 'center',
            width: W * 0.2,
            borderRadius: 8,
            justifyContent: 'center',
            borderColor: Colors.blue,
            borderWidth: 1
          }}>

          <Text style={{ textAlign: "center", 
          color: addressType == "Home" ? "white" : "black", }}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { setAddresstype("Work") }}

          style={{
            backgroundColor: addressType == "Work" ? Colors.blue : "white",
            borderColor: 'gray',
            borderWidth: 1,
            borderColor: Colors.blue,
            alignItems: "center",
            width: W * 0.2,
            justifyContent: 'center',
            borderRadius: 8,
            marginStart: 10
          }}>
          <Text style={{ color: addressType == "Work" ? "white" : "black", }}>Work</Text>
        </TouchableOpacity>

      </View>


      <TextInput
        style={styles.input}
        placeholder="Street No / Flat No"
        value={streetNo}
        onChangeText={setStreetNo}
      />

      <TextInput
        style={styles.input}
        placeholder="Complete Address"
        value={completeAddress}
        onChangeText={setCompleteAddress}
        multiline
      />

      <Button title="Save Address" onPress={handleSaveAddress} />
    </View>
  );
};

const makeStyles = (H,W)=>StyleSheet.create({
  container: {
    flex: 1,
    padding: Spaces.lar,
  },
  title: {
color:"black"
  },
  input: {
    marginTop:H*0.03,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default AddAddress;
