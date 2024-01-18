import { FlatList, ImageBackground, StyleSheet, View, useWindowDimensions, Modal, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Text } from 'react-native-paper'
import Colors from '../helper/Colors'
import LottieView from 'lottie-react-native'
import AcceptSitterCard from '../components/AcceptSitterCard'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import AcceptSitterCardDetailsOnly from '../components/AcceptSitterCardDetailsOnly'
import CustomButton from '../components/Button'
import { handleGetRequest, handlePostRequest } from '../helper/Utils'
import Loader from '../components/Loader'
import { useIsFocused, useFocusEffect } from '@react-navigation/native'
import { setIsRequestActive } from '../redux/GlobalSlice'
import { useDispatch } from 'react-redux'

const Radar_Parent = ({ navigation }) => {
  const [loader, setLoader] = useState(true)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [showSitterDetails, setShowSitterDetails] = useState(false)
  const [offerApiResponse, setOfferApiResponse] = useState(null)
  const [baseUrl, setBaseUrl] = useState('')

  const dispatch = useDispatch()

  const H = useWindowDimensions().height
  const W = useWindowDimensions().width

  useEffect(() => {
    getOffers()
    getStatusForActiveRequest()
  }, [])

  useFocusEffect(
    useCallback(() => {
      const getOffersRepeatedly = setInterval(() => {
        getOffers();
      }, 10000);

      return () => {
        clearInterval(getOffersRepeatedly);
      };
    }, [])
  );


  const styles = makeStyles(H, W)

  const getOffers = async () => {
    // *** get offers from API after every 10 seconds
    const result = await handleGetRequest('get_parent_rapid_request')
    console.log(result)
    if (result?.status == '200') {
      setOfferApiResponse(result)
    }
    else {
      Alert.alert('Info', result?.message)
    }

    setLoader(false)
  }

  const getStatusForActiveRequest = async () => {
    // *** if there is an active request navigation.navigate('Radar_Parent') else do nothing
    setLoader(true)
    const result = await handleGetRequest('check_activity')
    console.log("check_activity", result)
    if (result?.status == '200') {
      if (result?.activity == 1) {
        dispatch(setIsRequestActive(true))
      }
      else {
        dispatch(setIsRequestActive(false))
      }
    }
    else {
      Alert.alert('Info', result?.message)
    }
    setLoader(false)
  }

  const onCloseDetails = () => {
    setShowSitterDetails(prev => !prev)
  }

  const handleAccept = async (Id) => {
    // *** get offers from API after every 10 seconds
    var formdata = new FormData()
    formdata.append('id', Id)

    const result = await handlePostRequest('rapid_booking', formdata)
    console.log('rapid_booking ============>', result)
    if (result?.status == '200') {
      navigation.navigate('PaymentWebview_Parent', { 'bookingId': `${result?.booking_id}` })
    }
    else {
      Alert.alert("Error", result?.message)
    }
  }

  const handleReject = async (Id) => {
    var formdata = new FormData()
    formdata.append('id', Id)

    const result = await handlePostRequest('reject_rapid_request', formdata)
    if (result?.status == '200') {
      Alert.alert("Success")
    }
    else {
      Alert.alert("Error", result?.message)
    }
  }

  const renderSittersAvailable = ({ item, index }) => {
    return (
      <AcceptSitterCard
        rating={item?.rating}
        profilePicture={item?.profile_picture}
        name={item?.name}
        description={item?.description}
        priceOffered={item?.hourlyPrice}
        //isFavourite={}
        //onPressFavourite={() => handleFavourite(item?.Id)}
        onPressItemSelected={() => handleSitterCardPress(item)}
        serviceIds={item?.service_id}
        onAccept={() => handleAccept(item?.rapid_id)}
        onReject={() => handleReject(item?.rapid_id)}
      />
    )
  }

  const onPressCancel = async () => {
    setLoader(true)
    const result = await handleGetRequest('cancel_rapid_request')
    if (result?.status == '200') {
      dispatch(setIsRequestActive(false))
    }
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
              priceOffered={selectedProfile?.hourlyPrice}
              serviceIds={selectedProfile?.service_id}
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