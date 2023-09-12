import { StyleSheet, FlatList, View , Alert} from 'react-native'
import React , { useState, useEffect}from 'react'
import BookingCard from '../components/BookingCard';
import { handleGetRequest } from '../helper/Utils';

const Bookings = ({ navigation }) => {
  const bookingData = [
    {
      id: 1,
      name: 'John Doe',
      profileImage: 'https://thumbs.dreamstime.com/b/mother-doughter-14742077.jpg',
      type: 'Baby Sitter',
      status: 'Confirmed',
    },
    {
      id: 2,
      name: 'Jane Smith',
      profileImage: 'https://thumbs.dreamstime.com/b/mother-doughter-14742077.jpg',
      type: 'Pet Sitter',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Jane Smith',
      profileImage: 'https://thumbs.dreamstime.com/b/mother-doughter-14742077.jpg',
      type: 'Pet Sitter',
      status: 'Pending',
    },
    // Add more booking data as needed
  ];

  const [bookingdata, setBookingData] = useState()

  const onPressBookingCard = () => {
    navigation.navigate('ViewBookings')
  }



  const onClickHandle = () => {
    navigation.navigate('BookingDetailsPage')

  }

  useEffect(() => {
    getBookings()
  }, [])
  

  const getBookings = async () => {
    const result = await handleGetRequest('get_booking')
    setBookingData(result)
    if (result?.status == '200') {
    } else if (result?.status == '201') {
        Alert.alert("Alert", result?.message)
    }
    //setLoader(false)
}

  const renderBookings = ({ item }) => (
    <BookingCard
      booking={item}
      profileURL={bookingdata?.url}
      onItemPress={() => { onClickHandle(item.id) }}
    />

  );


  return (
    <View style={styles.container}>

      <FlatList
        data={bookingdata?.data}
        renderItem={renderBookings}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

export default Bookings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },


})