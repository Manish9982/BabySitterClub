import { FlatList, ImageBackground, StyleSheet, View, useWindowDimensions, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'
import Colors from '../helper/Colors'
import LottieView from 'lottie-react-native'
import AcceptSitterCard from '../components/AcceptSitterCard'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import AcceptSitterCardDetailsOnly from '../components/AcceptSitterCardDetailsOnly'
import CustomButton from '../components/Button'
import { handlePostRequest } from '../helper/Utils'
import Loader from '../components/Loader'

const OFFER_API_RESPONSE = {
  available_sitters: [
    {
      id: '1',
      name: 'Cassandra Morgan',
      price_offered: '23',
      rating: '3.5',
      profile_picture: `https://thebabysitterclubs.com/babysitter/public/uploads/profile/1701254250.`,
      service_ids: "1,2,3",
      description: "As a professional babysitter, pet sitter, and home sitter, I'm dedicated to creating a safe and nurturing environment for your little ones, furry friends, and your cherished home. With years of experience in childcare, a passion for animals, and a keen eye for household management, I ensure peace of mind while you're away."
    },
  ],
  request_details: {
    time: "01:00 PM - 04:00 PM",
    price: "$ 13",
    services: "Baby Sitter"
  }
}

const Radar_Parent = () => {
  const [loader, setLoader] = useState(true)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [showSitterDetails, setShowSitterDetails] = useState(false)
  const [offerApiResponse, setOfferApiResponse] = useState(null)
  const [baseUrl, setBaseUrl] = useState('')

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width

  useEffect(() => {
    getOffers()
  }, [])
  useEffect(() => {
    const getOffersRepeatedly = setInterval(() => {
      getOffers()
    }, 10000);

    return () => clearInterval(getOffersRepeatedly)

  }, [])


  const styles = makeStyles(H, W)

  const getOffers = () => {
    // *** get offers from API after every 10 seconds
    // var formdata = new FormData()
    // formdata.append('service', selectedService?.id)
    // formdata.append('price', price)
    // formdata.append('duration', Number.parseInt(selectedDuration, 10))
    // formdata.append('comment', comments)
    // const result = await handlePostRequest('rapid_request', formdata)
    // if (result?.status == '200') {
    //     navigation.navigate('Radar_Parent')
    // }
    // else {
    //     Alert.alert('Info', result?.message)
    // }
    setOfferApiResponse(OFFER_API_RESPONSE)
    Alert.alert("We fetch results after every 10 seconds on this page")
    setLoader(false)
  }

  const onCloseDetails = () => {
    setShowSitterDetails(prev => !prev)
  }

  const handleAccept = () => {
    // *** get offers from API after every 10 seconds
    // var formdata = new FormData()
    // formdata.append('service', selectedService?.id)
    // formdata.append('price', price)
    // formdata.append('duration', Number.parseInt(selectedDuration, 10))
    // formdata.append('comment', comments)
    // const result = await handlePostRequest('rapid_request', formdata)
    // if (result?.status == '200') {
    //     navigation.navigate('Radar_Parent')
    // }
    // else {
    //     Alert.alert('Info', result?.message)
    // }
    Alert.alert("Create booking and navigate to payment gateway API")
  }

  const handleReject = () => {
    // *** get offers from API after every 10 seconds
    // var formdata = new FormData()
    // formdata.append('service', selectedService?.id)
    // formdata.append('price', price)
    // formdata.append('duration', Number.parseInt(selectedDuration, 10))
    // formdata.append('comment', comments)
    // const result = await handlePostRequest('rapid_request', formdata)
    // if (result?.status == '200') {
    //     navigation.navigate('Radar_Parent')
    // }
    // else {
    //     Alert.alert('Info', result?.message)
    // }
    Alert.alert('Reject Offer API')
  }

  const renderSittersAvailable = ({ item, index }) => {
    return (
      <AcceptSitterCard
        rating={item?.rating}
        profilePicture={item?.profile_picture}
        name={item?.name}
        description={item?.description}
        priceOffered={item?.price_offered}
        //isFavourite={}
        //onPressFavourite={() => handleFavourite(item?.Id)}
        onPressItemSelected={() => handleSitterCardPress(item)}
        serviceIds={item?.service_ids}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    )
  }

  const onPressCancel = async () => {
    setLoader(true)
    // var formdata = new FormData()
    // formdata.append('service', selectedService?.id)
    // formdata.append('price', price)
    // formdata.append('duration', Number.parseInt(selectedDuration, 10))
    // formdata.append('comment', comments)
    // const result = await handlePostRequest('rapid_request', formdata)
    // if (result?.status == '200') {
    //     navigation.navigate('Radar_Parent')
    // }
    // else {
    //     Alert.alert('Info', result?.message)
    // }
    Alert.alert('Cancellation API Pending')
    setLoader(false)
  }

  const handleSitterCardPress = (item) => {
    setSelectedProfile(item)
    setShowSitterDetails(prev => !prev)
  }

  return (
    loader
      ?
      <Loader />
      :
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
              rating={selectedProfile?.rating}
              profilePicture={selectedProfile?.profile_picture}
              name={selectedProfile?.name}
              description={selectedProfile?.description}
              priceOffered={selectedProfile?.price_offered}
              serviceIds={selectedProfile?.service_ids}
            />
          </View>
        </Modal>

        {/* <ActivityIndicator
                color={Colors.Secondary}
                size={"large"} /> */}
        <View style={styles.listView}>
          <FlatList
            data={offerApiResponse?.available_sitters}
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
        <View style={styles.cancelButtonContainer}>
          <CustomButton
            onPressButton={onPressCancel}
            title={"Cancel Request"}
          />
        </View>
      </ImageBackground>
  )
}

export default Radar_Parent

const makeStyles = (H, W) => StyleSheet.create({
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
    //backgroundColor: 'red',
    height: H * 0.78
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
  },
  cancelButtonContainer:
  {
    position: 'absolute',
    //backgroundColor:'red',
    bottom: 0,
  }
})