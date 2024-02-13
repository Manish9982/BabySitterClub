import { Alert, FlatList, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import Colors from '../helper/Colors'
import Fonts from '../helper/Fonts'
import Spaces from '../helper/Spaces'
import SittersNearYouCard from '../components/SittersNearYouCard'

const DATA = {
  status: '200',
  data: {
    profile_pic: 'https://images.pexels.com/photos/11369171/pexels-photo-11369171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    is_verified: true,
    is_friend: true,
    number_of_bookings: '4',
    first_name: 'Catherine',
    name: 'Catherine Deaton',
    city: 'Dallas',
    street_name: 'Denton',
    number_of_children: '2 children',
    joined_time: 'Member since 2018',
    recommended_sitters: [
      {
        name: 'Bianca Allison',
        image: 'https://images.pexels.com/photos/11369171/pexels-photo-11369171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        location: 'Dallas',
        distance: '1.4 mi',
        rating: '4.2',
        reviews: '22',
        bookings: '22',
        connections: '14',
        mutual_connections: '2',
        isVerified: true,
        price: "25",
      },
      {
        name: 'Celine',
        image: 'https://images.pexels.com/photos/11369171/pexels-photo-11369171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        location: 'Dallas',
        distance: '1.4 mi',
        rating: '4.2',
        reviews: '22',
        bookings: '22',
        connections: '14',
        mutual_connections: '2',
        price: "20",

      },
    ]
  }
}

const FriendsProfile_Parent = () => {
  const [friendsProfile, setFriendsProfile] = useState(null)

  useEffect(() => {
    setFriendsProfile(DATA)
  }, [])

  const renderSitters = ({ item }) => {
    return (
      <SittersNearYouCard
        price={item?.price}
        isVerified={item?.isVerified}
        name={item?.name}
        image={item?.image}
        location={item?.location}
        distance={item?.distance}
        rating={item?.rating}
        reviews={item?.reviews}
        bookings={item?.bookings}
        connections={item?.connections}
        mutual_connections={item?.mutual_connections}
      />
    )
  }

  const onPressChatButton = () => {
    Alert.alert('Redirect')
  }
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../assets/images/background.png')}
    >
      <TouchableOpacity
        onPress={onPressChatButton}
        style={styles.chatButton}>
        {
          friendsProfile?.data?.is_friend
            ?
            <Image
              source={require('../assets/images/chat.png')}
              style={styles.chatIcon}
            />
            :
            <Image
              source={require('../assets/images/add-user.png')}
              style={styles.chatIcon}
            />
        }

      </TouchableOpacity>
      <View style={styles.imageGroupContainer}>
        <Image
          source={{ uri: friendsProfile?.data?.profile_pic }}
          style={styles.profilePic}
        />
        <View style={styles.verificationFlag}>
          <Text style={styles.verifiedText}>VERIFIED</Text>
        </View>
      </View>
      <Text style={styles.numberOfBookingsText}>{friendsProfile?.data?.number_of_bookings} Bookings</Text>
      <Text style={styles.nameText}>{friendsProfile?.data?.name}</Text>
      <Text style={styles.childrenText}>{friendsProfile?.data?.street_name}, {friendsProfile?.data?.city}</Text>
      <Text style={styles.childrenText}>{friendsProfile?.data?.number_of_children}</Text>
      <Text style={styles.joinedText}>{friendsProfile?.data?.joined_time}</Text>
      <Text style={styles.headingText}>Sitters Recommended By {friendsProfile?.data?.first_name}:</Text>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={friendsProfile?.data?.recommended_sitters}
          renderItem={renderSitters}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    </ImageBackground>
  )
}

export default FriendsProfile_Parent

const styles = StyleSheet.create({
  profilePic:
  {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.Secondary,
    alignSelf: 'center',
  },
  container:
  {
    flex: 1,
  },
  chatIcon:
  {
    //position: 'absolute',
    height: 30,
    width: 30,
    //right: Spaces.sm,
    //top: Spaces.sm,
    opacity: 0.4,
  },
  verificationFlag: {
    backgroundColor: Colors.verificationBlue,
    width: 100,
    height: 18,
    position: 'absolute',
    width: 70,
    alignSelf: 'center',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    zIndex: 2
  },
  verifiedText:
  {
    color: 'white',
    fontSize: 12
  },
  imageGroupContainer:
  {
    //backgroundColor: 'red',
    alignSelf: 'center',
    marginTop: Spaces.med
  },
  numberOfBookingsText:
  {
    color: Colors.rejectedRed,
    alignSelf: 'center',
    marginBottom: Spaces.sm,
    marginTop: Spaces.sm,
  },
  nameText:
  {
    alignSelf: 'center',
    ...Fonts.larBold
  },
  childrenText:
  {
    alignSelf: 'center'
  },
  joinedText:
  {
    alignSelf: 'center'
  },
  headingText:
  {
    ...Fonts.medSemiBold,
    margin: Spaces.sm
  },
  chatButton:
  {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: Spaces.sm,
    right: Spaces.sm
  },

})