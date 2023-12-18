import { FlatList, ImageBackground, StyleSheet, View, useWindowDimensions, Modal } from 'react-native'
import React, { useState } from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'
import Colors from '../helper/Colors'
import LottieView from 'lottie-react-native'
import AcceptSitterCard from '../components/AcceptSitterCard'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import AcceptSitterCardDetailsOnly from '../components/AcceptSitterCardDetailsOnly'

const Radar_Parent = () => {

  const [selectedProfile, setSelectedProfile] = useState(null)
  const [showSitterDetails, setShowSitterDetails] = useState(false)

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width

  const SITTERS = [
    {
      id: '1',
      name: 'Cassandra Morgan',
      price_offered: '23',
    },
  ]

  const onCloseDetails = () => {
    setShowSitterDetails(prev => !prev)
  }

  const renderSittersAvailable = ({ item, index }) => {
    return (
      <AcceptSitterCard
        rating={"3.5"}
        profilePicture={`https://thebabysitterclubs.com/babysitter/public/uploads/profile/1701254250.`}
        name={item?.name}
        description={"As a professional babysitter, pet sitter, and home sitter, I'm dedicated to creating a safe and nurturing environment for your little ones, furry friends, and your cherished home. With years of experience in childcare, a passion for animals, and a keen eye for household management, I ensure peace of mind while you're away."}
        priceOffered={"12"}
        //isFavourite={}
        //onPressFavourite={() => handleFavourite(item?.Id)}
        onPressItemSelected={() => handleSitterCardPress(item)}
        serviceIds={"1,2,3"}
        onAccept={() => console.log("Accept")}
        onReject={() => console.log("Reject")}
      />
    )
  }

  const handleSitterCardPress = (item) => {
    setSelectedProfile(item)
    setShowSitterDetails(prev => !prev)
  }

  return (
    <ImageBackground
      imageStyle={styles.imageStyle}
      source={require('../assets/images/background.png')}
      style={styles.container}>
      <Modal
        visible={showSitterDetails}
        //visible={true}
        transparent={true}
      >
        <View style={styles.overlay}>
          <AcceptSitterCardDetailsOnly
            onClose={onCloseDetails}
            rating={"3.5"}
            profilePicture={`https://thebabysitterclubs.com/babysitter/public/uploads/profile/1701254250.`}
            name={selectedProfile?.name}
            description={"As a professional babysitter, pet sitter, and home sitter, I'm dedicated to creating a safe and nurturing environment for your little ones, furry friends, and your cherished home. With years of experience in childcare, a passion for animals, and a keen eye for household management, I ensure peace of mind while you're away."}
            priceOffered={"12"}
            //isFavourite={}
            //onPressFavourite={() => handleFavourite(item?.Id)}
            // onPressItemSelected={() => handleSitterCardPress(item)}
            serviceIds={"1,2,3"}
            onAccept={() => console.log("Accept")}
            onReject={() => console.log("Reject")}
          />
        </View>
      </Modal>

      {/* <ActivityIndicator
                color={Colors.Secondary}
                size={"large"} /> */}
      <View style={styles.listView}>
        <FlatList
          data={SITTERS}
          renderItem={renderSittersAvailable}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
      <LottieView
        style={{
          height: W * 0.7,
          width: W * 0.7
        }}
        source={require("../assets/lottie/Animation - 1701683276649.json")} autoPlay loop />
      <Text>Searching For Sitters Around You...</Text>
    </ImageBackground>
  )
}

export default Radar_Parent

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle:
  {
    opacity: 0,
    backgroundColor: 'transparent'
  },
  listView:
  {
    position: 'absolute',
    zIndex: 10,
    top: 0,
  },
  horizontal:
  {
    flexDirection: 'row'
  },
  overlay:
  {
    backgroundColor: "rgba(0,0,0,0.4)",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})