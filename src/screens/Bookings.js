import { StyleSheet, FlatList, View } from 'react-native'
import React from 'react'
import BookingCard from '../components/BookingCard';

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

  const onPressBookingCard = () => {
    navigation.navigate('ViewBookings')
  }


  const renderBookings = ({ item }) => (
    <BookingCard
      booking={item}
      onPressBookingCard={onPressBookingCard}
    />
  );


  return (
    <View style={styles.container}>

      <FlatList
        data={bookingData}
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