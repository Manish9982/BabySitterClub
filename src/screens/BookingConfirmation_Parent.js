import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert, useWindowDimensions, Image, TouchableOpacity, Modal, Platform } from 'react-native';
import Colors from '../helper/Colors';
import CustomButton from '../components/Button';
import { Picker } from '@react-native-picker/picker';
import Fonts from '../helper/Fonts';
import { Shadows, formatDate_mmddyyyy, handleGetRequest } from '../helper/Utils';
import Spaces from '../helper/Spaces';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import SmallButtonSecondary from '../components/SmallButtonSecondary';
import { Text } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

const BookingConfirmation_Parent = ({ route, navigation }) => {

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width

  const [addressdata, setAddressdata] = useState()
  const [loader, setLoader] = useState(true)
  const [selectedAddress, setSelectedAddress] = useState('Choose Address')
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false)

  const { bookingDetails } = route.params;
  const details = JSON.parse(bookingDetails)
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getAddress()
    }
  }, [isFocused])


  const getAddress = async () => {
    const result = await handleGetRequest('address_get')
    setAddressdata(result)
    console.log(result)
    setLoader(false)
  }

  const onPressAddAddress = () => {
    navigation.navigate('AddAddress')
  }

  const toggleModal = () => {
    setIsAddressModalVisible(prev => !prev)
  }

  const onPressPayment = () => {
    if (!(selectedAddress == 'Choose Address')) {
      Alert.alert(
        'Proceed To Payment',
        `Please ensure that booking details are correct as they can't be changed later.Are you sure you want to proceed to payment?`,
        [{
          text: 'Yes',
          onPress: () => proceedToPayment()
        },
        {
          text: 'No'
        }]
      )
    }
    else {
      Alert.alert('Invalid Address', 'Please select an address first')
    }

  }

  const proceedToPayment = () => {
    navigation.navigate('CreateBooking_Parent', {
      createBooking: JSON.stringify({
        user_id: details?.user_id,
        slot_id: details?.slot_id,
        amount: details?.amount,
        booking_address: selectedAddress
      })


    })
  }

  const onPressPicture = (url) => {
    navigation.navigate('ViewPicture', { imageUrl: url })
  }

  const styles = makeStyles(H, W)
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Please review your booking and make sure all details are correct:</Text>
      <View style={styles.detailsContainer}>

        <TouchableOpacity onPress={() => onPressPicture(details.profile_pic)}>
          <Image
            style={styles.profilePic}
            source={{ uri: details.profile_pic }}
          />
        </TouchableOpacity>

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

        <View style={[styles.detailRow]}>
          <View style={styles.addressRow}>
            <Text style={styles.label}>Address:</Text>
            <AntDesign name="pluscircle" size={Spaces.xl} color={Colors.Secondary} onPress={onPressAddAddress} />
          </View>
          {
            Platform.OS == "android"
              ?
              <View style={styles.boxOutline}>
                <Picker
                  mode='dropdown'
                  style={{
                    color: Colors.black
                  }}
                  selectedValue={selectedAddress}
                  onValueChange={(t) => setSelectedAddress(t)}
                >
                  <Picker.Item
                    label='Choose Address' value='Choose Address' />
                  {
                    addressdata?.data?.map((item) => <Picker.Item key={item?.id} label={item.address} value={item.address} />)
                  }
                </Picker>
              </View>
              :
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.valueBox}>
                <Text style={[styles.value]}>{selectedAddress}</Text>
                <AntDesign
                  name="caretdown"
                  size={Spaces.lar}
                  style={styles.caretIcon}
                  color={Colors.black}
                />
              </TouchableOpacity>
          }

        </View>
      </View>
      <Modal
        visible={isAddressModalVisible}
        transparent>
        <View style={styles.modalContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.label}>Address:</Text>
            <Picker
              style={{
                color: Colors.black
              }}
              selectedValue={selectedAddress}
              onValueChange={(t) => setSelectedAddress(t)}
            >
              <Picker.Item
                label='Choose Address' value='Choose Address' />
              {
                addressdata?.data?.map((item) => <Picker.Item key={item?.id} label={item.address} value={item.address} />)
              }
            </Picker>
            <SmallButtonSecondary
              onPressSmallButton={toggleModal}
              title={'OK'}
              style={styles.smallButtonSecondary}
            />
          </View>
        </View>
      </Modal>

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
  },
  detailsContainer: {
    width: W * 0.7,
    ...Shadows,
    //backgroundColor: Colors.PRIMARY, // Change the background color to your preference
    borderRadius: 10,
    padding: Spaces.xl,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.PRIMARY
  },
  detailRow: {
    //flexDirection: 'row',
    justifyContent: 'space-between',
    //alignItems: 'center',
    marginTop: Spaces.sm,
  },
  label: {
    width: W * 0.18,
    ...Fonts.medBold,
    color: 'black', // Change the color to your preference
  },
  value: {
    ...Fonts.med,
    color: Colors.DEEP_GRAY, // Change the color to your preference
    //width: W * 0.41
  },
  addressContainer:
  {
    width: W * 0.7,
    backgroundColor: Colors.white,
    margin: Spaces.med,
    padding: Spaces.med,
    borderRadius: 10,
  },
  profilePic:
  {
    width: 100,
    height: 100,
    borderRadius: 100 / 3,
    marginRight: Spaces.med,
    borderWidth: 0.6,
    borderColor: Colors.black
  },
  valueBox:
  {
    flexWrap: 'wrap',
    borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spaces.sm,
    borderRadius: 8,
    borderColor: Colors.PRIMARY,
    flexDirection: 'row',
    paddingRight: Spaces.xl
  },
  modalContainer:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayTransparent
  },
  smallButtonSecondary:
  {
    width: W * 0.2,
    backgroundColor: Colors.PRIMARY
  },
  boxOutline:
  {
    borderWidth: 1,
    borderRadius: 8,
  },
  caretIcon:
  {
    position: 'absolute',
    left: W * 0.53
  },
  addressRow:
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Spaces.med
  }
});

export default BookingConfirmation_Parent
