import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, useWindowDimensions } from 'react-native';
import Colors from '../helper/Colors';
import CustomButton from '../components/Button';
import { Picker } from '@react-native-picker/picker';
import Fonts from '../helper/Fonts';
import { Shadows, formatDate_mmddyyyy, handleGetRequest } from '../helper/Utils';
import Spaces from '../helper/Spaces';

const BookingConfirmation_Parent = ({ route, navigation }) => {

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width

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
  const styles = makeStyles(H, W)
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please review your booking and make sure all details are correct:</Text>
      <View style={styles.detailsContainer}>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{details.name}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{formatDate_mmddyyyy(details.date)}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{details.time}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>$ {details.price}</Text>
        </View>
      </View>
      <View style={styles.addressContainer}>
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

const makeStyles = (H, W) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
  header: {
    ...Fonts.larMedium,
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.selectedcolor
  },
  detailsContainer: {
    width: W*0.7,
    ...Shadows,
    backgroundColor: Colors.PRIMARY, // Change the background color to your preference
    borderRadius: 10,
    padding: Spaces.xxl,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spaces.med,
  },
  label: {
    ...Fonts.medBold,
    color: 'black', // Change the color to your preference
  },
  value: {
    ...Fonts.med,
    color: Colors.DEEP_GRAY // Change the color to your preference
  },
  addressContainer:
  {
    width: W*0.7,
    backgroundColor: Colors.white,
    margin: Spaces.med,
    padding: Spaces.med,
    borderRadius: 10,
  }
});

export default BookingConfirmation_Parent
