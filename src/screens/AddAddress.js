import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, useWindowDimensions, Alert, FlatList } from 'react-native';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import CustomButton from '../components/Button';
import { Constants, handleGetRequest, handlePostRequest } from '../helper/Utils';
import TextInputComponent from '../components/TextInputComponent';
import { Text } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddAddress = ({ navigation }) => {

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width
  const styles = makeStyles(H, W)

  const [streetNo, setStreetNo] = useState('');
  const [completeAddress, setCompleteAddress] = useState('');
  const [addressType, setAddresstype] = useState("Home")
  const [loader, setLoader] = useState(false)
  const [predictions, setPredictions] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false)
  const [activeButton, setActiveButton] = useState(false)


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
        navigation.goBack()
      } else if (result?.status == "201") {
        Alert.alert("Error", result?.message)
      } else {
        Alert.alert("Alert", result?.message)
      }
    }
    setLoader(false)
  }

  const handleSearch = async (text) => {
    setCompleteAddress(text);
    setActiveButton(false)
    if (text.length > 1) {
      const url = `${Constants.PLACES_API_URL}?input=${text}&key=${Constants.GOOGLE_API_KEY}&location=${Constants.DALLAS_TEXAS_COORDS}&radius=${Constants.ADDRESS_RADIUS}&types=address`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log("predictions ==>", result)
        if (result.status === 'OK') {
          setPredictions(result?.predictions);
        } else {
          setPredictions([]);
        }
      } catch (error) {
        Alert.alert('Error fetching address: ', error);
      }
    } else {
      setPredictions([]);
    }
  };

  const onPressSuggestion = (t) => {
    setPredictions([])
    setActiveButton(true)
    setCompleteAddress(t?.description)
  }


  return (
    <KeyboardAwareScrollView>
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
          placeholder="House/Plot No."
          value={streetNo}
          onChangeText={setStreetNo}
        />

        <TextInputComponent
          style={[styles.input2, Fonts.medMedium]}
          placeholder="Complete Address"
          value={completeAddress}
          onChangeText={handleSearch}
          multiline
        />

        {
          (!(predictions?.length == 0))
          &&
          <View style={styles.listView}>

            {predictions?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => onPressSuggestion(item)}
                  style={styles.suggestions}>
                  <Text>{item.description}</Text>
                </TouchableOpacity>
              )
            })}


          </View>
        }

        <CustomButton
          disabled={!activeButton}
          btnColor={!activeButton ? Colors.gray : Colors.PRIMARY }
          loader={loader}
          onPressButton={addAddress}
          title={'Save address'}
        />
      </View>
    </KeyboardAwareScrollView>
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
    padding: Spaces.sm,
  },
  input2: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: Spaces.sm,
    marginTop: H * 0.04,
    marginBottom: H * 0.05

  },

  buttonstyle: {
    marginTop: H * 0.5,

  },

  textStyle: {

  },
  listView:
  {
    backgroundColor: Colors.white,
    //paddingVertical: Spaces.sm,

  },
  suggestions:
  {
    borderWidth: 0.5,
    padding: Spaces.xsm,
  }


});

export default AddAddress;
