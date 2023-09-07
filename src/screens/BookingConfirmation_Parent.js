import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Colors from '../helper/Colors';
import CustomButton from '../components/Button';

const BookingConfirmation_Parent = ({ route, navigation }) => {
  // Assuming you have passed booking details through navigation
//   const { bookingDetails } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Details:</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Booking ID:</Text>
        <Text style={styles.value}>bookingDetails.bookingId</Text>

        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>bookingDetails.name</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>bookingDetails.date</Text>

        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>bookingDetails.time</Text>

        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>bookingDetails.location</Text>
      </View>

      <CustomButton
      title={'Proceed'}
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
    fontSize: 24,
    fontWeight: 'bold',
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
