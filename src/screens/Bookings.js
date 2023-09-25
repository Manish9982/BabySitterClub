import { StyleSheet, FlatList, View, Alert, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import BookingCard from '../components/BookingCard';
import { handleGetRequest } from '../helper/Utils';
import { Divider, Text } from 'react-native-paper';
import Loader from '../components/Loader';
import { useIsFocused } from '@react-navigation/native';
import Fonts from '../helper/Fonts';
import Spaces from '../helper/Spaces';

const Bookings = ({ navigation }) => {

  const [bookingdata, setBookingData] = useState()
  const [loader, setLoader] = useState(true)

  const isFocused = useIsFocused()

  const onPressBookingCard = () => {
    navigation.navigate('ViewBookings')
  }



  const onClickHandle = () => {
    navigation.navigate('BookingDetailsPage')

  }

  useEffect(() => {
    if (isFocused) {
      getBookings()
    }
  }, [isFocused])


  // const getBookings = async () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Bearer 199|WtLkncCwC2L0rWyubAzKCM6gBXdJJTQx53KmNBUP");
    
  //   var requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //     redirect: 'follow'
  //   };
    
  //   fetch("https://thebabysitterclubs.com/babysitter/api/v1/parent_get_booking", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }
  const getBookings = async () => {
    const result = await handleGetRequest('parent_get_booking')
    setBookingData(result)
    console.log(result)
    // if (result?.status == '200') {
    // } else if (result?.status == '201') {
    //   Alert.alert("Alert", result?.message)
    // }
    setLoader(false)
  }

  const renderBookings = ({ item }) => {
    return (
      <>
        <BookingCard
          booking={item}
          profileURL={bookingdata?.url}
          onItemPress={() => { onClickHandle(item.id) }}
        />
      </>
    );
  }

  return (
    loader
      ?
      <Loader />
      :
      <ImageBackground 
      source={require('../assets/images/background.png')}
      style={styles.container}>
        {
          bookingdata?.data?.length == 0
            ?
            <View style={styles.mainContainer}>
              <Text>No bookings found</Text>
            </View>
            :
            <View style={styles.mainContainer}>
              <FlatList
                data={bookingdata?.data}
                renderItem={renderBookings}
                keyExtractor={(item) => item.id.toString()}
              />
              <Text style={styles.warning}>*All bookings are non-refundable.</Text>
            </View>
        }

      </ImageBackground>
  )
}

export default Bookings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  mainContainer:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  warning:
  {
    ...Fonts.smMedium,
    margin: Spaces.sm
  },

})