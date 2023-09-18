import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import SmallButtonSecondary from './SmallButtonSecondary';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';
import { Shadows, handlePostRequest } from '../helper/Utils';

const BookingCardForSitter = ({ name, profilePic, date, service, slot, duration, address, url, createdAt, bookingId, status }) => {

  const W = useWindowDimensions().width
  const H = useWindowDimensions().height

  const styles = makeStyles(H, W)

  const onPressMarkAsComplete = async () => {
    var formdata = new FormData()
    formdata.append('booking_id', bookingId)
    formdata.append('status', '1')
    const result = await handlePostRequest('check_booking_status', formdata)
    console.log(result)
  }

  const onPressCancel = async () => {
    var formdata = new FormData()
    formdata.append('booking_id', bookingId)
    formdata.append('status', '2')
    const result = await handlePostRequest('check_booking_status', formdata)
  }

  console.log("Image URL ======>", `${url}${profilePic}`)
  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: `${url}${profilePic}` }} style={styles.profilePic} />
        <View>
          {status == '0'
            ?
            <View>
              <SmallButtonSecondary
                onPressSmallButton={onPressMarkAsComplete}
                style={styles.secondarySmallButton}
                title={'Mark as complete'}
              />
              <SmallButtonSecondary
                onPressSmallButton={onPressCancel}
                style={styles.secondarySmallButton}
                title={'Cancel booking'}
              />
            </View>
            :
            <View>

            </View>
          }
        </View>
      </View>
      <Divider style={styles.divider} />
      <Text style={[styles.dateText, { ...Fonts.larBold }]}>Name: {name}</Text>
      <Text style={styles.dateText}>Date: {date}</Text>
      <Text style={styles.slotText}>Slot: {slot}</Text>
      <Text style={styles.serviceText}>Service: {service}</Text>
      <Text style={styles.durationText}>Duration: {duration}</Text>
      <Text style={styles.addressText}>Address: {address}</Text>
      <Text style={styles.createdAtText}>Booked on: {createdAt}</Text>
    </View>
  );
};

const makeStyles = (H, W) => StyleSheet.create({
  cardContainer: {
    borderColor: Colors.selectedcolor,
    borderWidth: 0.6,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: Spaces.med,
    margin: Spaces.med,
    ...Shadows,
    paddingBottom: Spaces.vsm
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  dateText: {
    marginTop: 5,
    ...Fonts.medBold
  },
  serviceText: {
    marginTop: 5,
  },
  slotText: {
    marginTop: 5,
    ...Fonts.medBold
  },
  durationText: {
    marginTop: 5,
  },
  addressText: {
    marginTop: 5,
  },
  completeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  profileContainer:
  {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  divider:
  {
    marginVertical: Spaces.med,
    height: 1,
    backgroundColor: Colors.ACCENT_YELLOW,
  },
  secondarySmallButton:
  {
    width: W * 0.4,
    height: H * 0.04,
    marginVertical: Spaces.sm
  },
  createdAtText:
  {
    alignSelf: 'flex-end',
    ...Fonts.sm,
    color: Colors.gray
  }
});

export default BookingCardForSitter;
