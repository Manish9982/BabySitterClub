import { Alert, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View, useWindowDimensions, Modal, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider, RadioButton, Text } from 'react-native-paper'
import Spaces from '../helper/Spaces'
import Fonts from '../helper/Fonts'
import Colors from '../helper/Colors'
import Loader from '../components/Loader'
import { Shadows, convertTimeRangeTo12HourFormat, convertTo12HourFormat, convertTo24HourFormat, formatDate, formatDateProfilePageDate, formatDate_mmddyyyy, handleGetRequest, handlePostRequest } from '../helper/Utils'
import TagIcon from '../components/TagIcon'
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import SmallButtonSecondary from '../components/SmallButtonSecondary'
import CustomButton from '../components/Button'
import { useIsFocused } from '@react-navigation/native'
import { AirbnbRating, Rating } from 'react-native-ratings'
import DisplayRating from '../components/DisplayRating'
import ReviewCard from '../components/ReviewCard'

const APIDATA = {
    'status': 200,
    'base_url': '',
    'data': {
        'profile': {
            name: 'Thomas Lacier',
            address: 'Dallas, Texas',
            description: 'I am a Sitter',
            price: '20',
            image: 'https://images.pexels.com/photos/18897882/pexels-photo-18897882/free-photo-of-man-standing-on-a-boat.jpeg',
            rating: 3.4,
            number_of_reviews: 24
        },
        'reviews': [
            {
                name: 'Jason Todd',
                image: 'https://images.pexels.com/photos/18897882/pexels-photo-18897882/free-photo-of-man-standing-on-a-boat.jpeg',
                review: 'Nice Sitter',
                date: 'Dec 22nd, 2023',
                rating: 3.5
            }
        ]
    }
}


const Reviews_Parent = ({ navigation, route }) => {
    // const { userID, bookingDate, startTime, endTime, service } = route?.params
    const [loader, setLoader] = useState(true)
    const [reviewsData, setReviewsData] = useState(null)
    // const [slotsDate, setSlotsDate] = useState(JSON.parse(bookingDate)?.startDate ? new Date(JSON.parse(bookingDate)?.startDate) : new Date(JSON.parse(bookingDate)))
    // const dateParse = JSON.parse(bookingDate)
    // const usedDate = dateParse.map(item => formatDate(item, true))

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    const isFocused = useIsFocused()

    useEffect(() => {
        getReviewsForSitter()
    }, [])

    useEffect(() => {
        //  calculatePrice()
        //  getAddress()
    }, [isFocused])

    const getReviewsForSitter = async () => {
        // var formdata = new FormData()
        // formdata.append('', '')
        // const result = await handlePostRequest('', formdata)
        // if (result?.status == '200') {
        setReviewsData(APIDATA)
        // }
        // else {
        //     Alert.alert(result?.message)
        // }
        setLoader(false)
    }

    const renderReviews = ({ item, index }) => {
        return (
            <ReviewCard
                profilePicture={item?.image}
                fullName={item?.name}
                date={item?.date}
                rating={item?.rating}
                review={item?.review}
            />
        )
    }

    //console.log("new Date(bookingDate)====>", new Date(JSON.parse(bookingDate)))
    return (
        loader
            ?
            <Loader />
            :
            <ImageBackground
                source={require('../assets/images/background.png')}
                style={styles.container}>
                <View
                    style={styles.container}>
                    <View style={styles.upperContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('ViewPicture', { imageUrl: `${reviewsData?.base_url}${reviewsData?.data?.profile?.image}` })}>
                            <Image
                                source={{ uri: `${reviewsData?.base_url}${reviewsData?.data?.profile?.image}` }}
                                defaultSource={require('../assets/images/profile-user.png')}
                                style={styles.profilePic}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={[styles.heading, { marginBottom: 0 }]}>{`${reviewsData?.data?.profile?.name}`}</Text>
                            <Text style={[styles.textSecondary, { marginBottom: 0 }, Fonts.medMedium]}>{reviewsData?.data?.profile?.address}</Text>
                            <View style={styles.whiteBox}>
                                <Text style={[styles.text, { marginBottom: 0, ...Fonts.larMedium }]}> {`$ ${reviewsData?.data?.profile?.price}/Hr`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.lowerContainer}>
                        <Text style={styles.subheading}>Ratings:</Text>
                        <View style={styles.ratingContainer}>
                            <DisplayRating
                                value={Number.parseFloat(reviewsData?.data?.profile?.rating)}
                            />
                            <Text style={styles.ratingText}>  ({reviewsData?.data?.profile?.rating})</Text>
                        </View>

                        <Text style={styles.subheading}>Reviews:</Text>
                        <View style={styles.flatlist}>
                            <FlatList
                                data={reviewsData?.data?.reviews}
                                renderItem={renderReviews}
                                keyExtractor={(item, index) => `${index}`}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground >
    )
}

export default Reviews_Parent

const makeStyles = (H, W) => StyleSheet.create({
    container: {
        flex: 1,
        //paddingBottom: H * 0.02
    },
    secondaryFloatingView: {
        flex: 1,
    },
    heading: {
        ...Fonts.larBold,
        marginBottom: Spaces.sm,
        color: Colors.black
    },
    textneedbabysittertitle: {
        ...Fonts.larMedium,
        color: "black",
        marginTop: H * 0.025
    },
    subheading: {
        ...Fonts.medBold,
        marginVertical: Spaces.sm,
        textDecorationLine: 'underline'
    },
    text: {
        marginBottom: Spaces.sm,
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        margin: Spaces.sm,
    },
    contentContainerStyle:
    {

    },
    textSecondary:
    {
        ...Fonts.sm,
        color: Colors.black,
        marginBottom: Spaces.sm,
        width: W * 0.6,
        flexWrap: 'wrap'
    },
    whiteBox:
    {
        borderRadius: 8,
        backgroundColor: Colors.white,
        alignSelf: 'flex-start',
        padding: Spaces.sm,
        marginVertical: Spaces.sm
    },
    upperContainer:
    {
        backgroundColor: Colors.buttoncolor,
        padding: Spaces.sm,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spaces.sm
    },
    lowerContainer:
    {
        padding: Spaces.sm
    },
    warning:
    {
        ...Fonts.medMedium,
        color: 'gray',
    },
    warningtitle:
    {
        ...Fonts.larMedium,
        color: 'red',
        marginTop: H * 0.025
    },
    floatingView:
    {
        position: 'absolute',
        bottom: H * 0,
        backgroundColor: Colors.buttoncolor,
        width: '100%',
        flexDirection: 'row',
        padding: Spaces.lar,
        flex: 2,
        height: H * 0.13
    },
    floatText:
    {
        color: Colors.white,
        marginVertical: 0,
        marginBottom: 0
    },
    slotItem:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spaces.sm
    },
    datesection:
    {
        backgroundColor: Colors.grayTransparent,
        padding: Spaces.sm,
        borderRadius: 10,
    },
    tag:
    {
        justifyContent: 'center',
        alignItems: 'center'
    },
    segment:
    {
        margin: Spaces.sm
    },
    errorText:
    {
        textAlign: 'center',
        marginTop: Spaces.xxl
    },
    header: {
        ...Fonts.larMedium,
        marginBottom: 20,
        textAlign: 'center',
    },
    detailsContainer: {
        width: W * 0.7,
        ...Shadows,
        //backgroundColor: Colors.PRIMARY, // Change the background color to your preference
        borderRadius: 10,
        padding: Spaces.lar,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.PRIMARY
    },
    detailRow: {
        //flexDirection: 'row',
        //justifyContent: 'space-between',
        //alignItems: 'center',
        marginTop: Spaces.sm,
    },
    label: {
        width: W * 0.18,
        ...Fonts.medBold,
        color: 'black', // Change the color to your preference
    },
    value: {
        ...Fonts.med,
        color: Colors.DEEP_GRAY, // Change the color to your preference
        //width: W * 0.41
    },
    addressContainer:
    {
        width: W * 0.7,
        backgroundColor: Colors.white,
        margin: Spaces.sm,
        padding: Spaces.sm,
        borderRadius: 10,
    },
    profilePic:
    {
        width: 100,
        height: 100,
        borderRadius: 100 / 3,
        marginRight: Spaces.sm,
        borderWidth: 0.6,
        borderColor: Colors.black
    },
    valueBox:
    {
        flexWrap: 'wrap',
        borderWidth: 1.2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spaces.sm,
        borderRadius: 8,
        borderColor: Colors.PRIMARY,
        flexDirection: 'row',
        paddingRight: Spaces.lar
    },
    modalContainer:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.grayTransparent
    },
    smallButtonSecondary:
    {
        width: W * 0.2,
        backgroundColor: Colors.PRIMARY
    },
    boxOutline:
    {
        borderWidth: 1,
        borderRadius: 8,
    },
    caretIcon:
    {
        position: 'absolute',
        right: W * 0.02
    },
    addressRow:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Spaces.sm
    },
    guidingText: {
        ...Fonts.sm,
        color: Colors.gray,
    },
    mainHeading:
    {
        ...Fonts.larBold
    },
    bookingSpecs:
    {
        textDecorationLine: 'underline'
    },
    horizontal:
    {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    smallButton:
    {
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spaces.lar,
        paddingVertical: Spaces.sm,
        alignSelf: 'center',
        borderRadius: 8,
    },
    flatlist:
    {
        padding: Spaces.med,
        height: H * 0.54,
        borderWidth: 1,
        borderRadius: 8,
    },
    ratingContainer:
    {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText:
    {
        ...Fonts.larBold
    }
}) 