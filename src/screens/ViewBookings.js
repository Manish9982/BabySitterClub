import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Spaces from '../helper/Spaces';

const BookingScreen = () => {
  const handleCancel = () => {
    // Handle cancel logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Details</Text>
      <View style={styles.bookingInfo}>
        <Text style={styles.label}>Order Number:</Text>
        <Text style={styles.value}>12345</Text>
      </View>
      <View style={styles.bookingInfo}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>August 7, 2023</Text>
      </View>
      {/* Add more booking details here */}
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancel Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#007BFF',
  },
  bookingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#444',
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: '#FF0000', // Red color for cancel button
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
