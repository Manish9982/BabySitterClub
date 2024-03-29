import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import SmallButtonSecondary from './SmallButtonSecondary';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import Colors from '../helper/Colors';
import { Shadows, handlePostRequest } from '../helper/Utils';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import { useNavigation } from '@react-navigation/native';

const BookingCardForSitter = ({ name, profilePic, date, service, slot, duration, address, url, createdAt, bookingId, status, callBack, price, bookingNumberId, isRapid , userID }) => {

  console.log("ID==SitterGAURAV" , userID)
  const W = useWindowDimensions().width
  const H = useWindowDimensions().height

  const styles = makeStyles(H, W)
  const navigation = useNavigation()


  const onPressMarkAsComplete = async () => {
    Alert.alert('Confirm Completion', 'Are you sure you want to mark this booking as complete ? This action is irreversible', [
      {
        text: 'Yes',
        onPress: async () => {
          var formdata = new FormData()
          formdata.append('booking_id', bookingId)
          formdata.append('status', '1')
          const result = await handlePostRequest('change_booking_status', formdata)
          if (result?.status == '200') {
            callBack()
            Alert.alert(result?.message)
          }
          else {
            Alert.alert(result?.message)
          }
        },
      },
      {
        text: 'No'
      }
    ])
  }

  const onPressCancel = async () => {
    Alert.alert('Confirm Cancellation', 'Are you sure you want to mark this booking as cancelled ? This action is irreversible and will affect your rating', [
      {
        text: 'Yes',
        onPress: async () => {
          var formdata = new FormData()
          formdata.append('booking_id', bookingId)
          formdata.append('status', '2')
          const result = await handlePostRequest('change_booking_status', formdata)
          if (result?.status == '200') {
            callBack()
          }
          else {
            Alert.alert(result?.message)
          }
        },
      },
      {
        text: 'No'
      }
    ])
  }
  const onPressChat = async () => {
       navigation.navigate('ChatScreen_Sitter', { user_id: `${userID}`, name: `${name}` })

  }

  const returnContainer = (t) => {
    if (t == '0') {
      return (<View>
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
        <SmallButtonSecondary
          onPressSmallButton={onPressChat}
          style={styles.secondarySmallButton}
          title={'Chat'}
        />
      </View>)
    }
    else if (t == '1') {
      return (
        <View style={styles.statusContainer}>
          <AntDesign name='checkcircle' size={30} color={'green'} />
          <Text style={{ ...Fonts.larBold }}>Completed</Text>
        </View>
      )

    }
    else if (t == '2') {
      return (
        <View style={styles.statusContainer}>
          <AntDesign name='closecircle' size={30} color={'red'} />
          <Text style={{ ...Fonts.larBold }}>Cancelled</Text>
        </View>
      )
    }
  }
  console.log('isRapid=======>', isRapid)
  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: `${url}${profilePic}` }} style={styles.profilePic} />
        <View>
          {returnContainer(status)}
        </View>
      </View>
      <Divider style={styles.divider} />
      <Text style={[styles.dateText, { ...Fonts.larBold }]}>Name: {name}</Text>
      {
        isRapid == '1'
        &&
        <View style={styles.blitzcareFlag}>
          <Image source={require('../assets/images/lightning.png')}
            style={styles.light}
          />
          <Text style={{ color: '#fff' }}>BlitzCare</Text>
        </View>
      }
      <Text style={styles.dateText}>Date: {date}</Text>
      <Text style={styles.slotText}>Booking ID: {bookingNumberId}</Text>
      <Text style={styles.slotText}>Slot: {slot}</Text>
      <Text style={styles.slotText}>Price: $ {price}</Text>
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
    padding: Spaces.sm,
    margin: Spaces.sm,
    ...Shadows,
    paddingBottom: Spaces.vsm
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 100 / 3,
    marginRight: Spaces.sm,
    borderWidth: 0.6,
    borderColor: Colors.black
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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  divider:
  {
    marginVertical: Spaces.sm,
    height: 1,
    backgroundColor: Colors.ACCENT_YELLOW,
  },
  secondarySmallButton:
  {
    width: W * 0.4,
    //height: H * 0.04,
    marginVertical: Spaces.sm
  },
  createdAtText:
  {
    alignSelf: 'flex-end',
    ...Fonts.sm,
    color: Colors.gray
  },
  statusContainer:
  {
    justifyContent: 'center',
    alignItems: 'center'
  },
  light: {
    height: 30,
    width: 30,
},
blitzcareFlag:
{
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: Colors.selectedcolor,
    borderRadius: 8,
    padding: 1
}
});

export default BookingCardForSitter;
