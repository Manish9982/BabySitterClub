import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Colors from '../helper/Colors';
import CustomButton from '../components/Button';
import { Picker } from '@react-native-picker/picker';
import Fonts from '../helper/Fonts';
import { formatDate, formatDate_mmddyyyy, handleGetRequest } from '../helper/Utils';

const BookingConfirmation_Parent = ({ route, navigation }) => {
  const [addressdata, setAddressdata] = useState()
  const [loader, setLoader] = useState(true)
  const [selectedAddress, setSelectedAddress] = useState('')
  const { bookingDetails } = route.params;
  const details = JSON.parse(bookingDetails)

  useEffect(() => {
    getAddress()
  }, [])


  const getAddress = async () => {
    const result = await handleGetRequest('address_get')
    setAddressdata(result)
    console.log(result)
    setLoader(false)
  }

  const onPressPayment = () => {
    Alert.alert(
      'Proceed To Payment',
      `Please ensure that booking details are correct as they can't be changed later.Are you sure you want to proceed to payment?`,
      [{
        text: 'Yes'
      },
      {
        text: 'No'
      }]
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please review your booking and make sure all details are correct :</Text>
      <View style={styles.detailsContainer}>

        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{details.name}</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{formatDate_mmddyyyy(details.date)}</Text>

        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{details.time}</Text>

        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>$ {details.price}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Address:</Text>
        <Picker selectedValue={selectedAddress}
          onValueChange={(t) => setSelectedAddress(t)}
        >
          <Picker.Item
            label='Choose Address' value='choose' />
          {
            addressdata?.data?.map((item) => <Picker.Item key={item?.id} label={item.address} value={item.address} />)
          }
        </Picker>
      </View>
      <CustomButton
        title={'Proceed to payment'}
        onPressButton={onPressPayment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    ...Fonts.medBold,
    marginBottom: 20,
  },
  detailsContainer: {
    width: '80%',
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default BookingConfirmation_Parent
