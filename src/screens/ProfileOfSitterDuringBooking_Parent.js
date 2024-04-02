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
import TextInputComponent from '../components/TextInputComponent'
import LinearGradient from 'react-native-linear-gradient'
import ReviewCard from '../components/ReviewCard'

const ProfileOfSitterDuringBooking_Parent = ({ navigation, route }) => {

    const { userID, bookingDate, startTime, endTime, service } = route.params
    const dateParse = JSON.parse(bookingDate)
    const usedDate = dateParse.map(item => formatDate(item, true))
    console.log("bookingDate ====>", dateParse)

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const [addressdata, setAddressdata] = useState()
    const [profiledetailsdata, setProfiledetailsdata] = useState()
    const [finalpriceresult, setsetFinalPriceResult] = useState()
    const [loader, setLoader] = useState(true)
    const [slotsDate, setSlotsDate] = useState(JSON.parse(bookingDate)?.startDate ? new Date(JSON.parse(bookingDate)?.startDate) : new Date(JSON.parse(bookingDate)))
    const [serviceFilterId, setServiceFilterId] = useState(null);
    const [isAddressModalVisible, setIsAddressModalVisible] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [error, setError] = useState(false);
    const [price, setPrice] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [pricemodalVisible, setPriceModalVisible] = useState(false);
    const isFocused = useIsFocused()
    const [children, setChildren] = useState('')
    const [finalPrice, setFinalPrice] = useState(null); // State to store the final price from API

    const handleIconPress = () => {
        setPriceModalVisible(true)
    };
    const handleOutSidePress = () => {
        setPriceModalVisible(false)
    };


    const handleInputChange = (text) => {
        if (text === '') {
            setChildren('');
            setFinalPrice(null);
        } else if (isNaN(text) || parseInt(text) === 0) {
            setChildren('');
            setFinalPrice(null);
            Alert.alert('Error', 'Input a valid number');
        } else {
            if (parseInt(text) <= 4) {
                setChildren(text);
                getFinalPrice(text)
            }
        }
    };

    const onPressCancelButton = () => {
        setModalVisible(false)
    }

    useEffect(() => {
        getUsersProfileDetails()
    }, [slotsDate])

    useEffect(() => {
        calculatePrice()
        getAddress()
    }, [isFocused])

    const getAddress = async () => {
        const result = await handleGetRequest('address_list')
        setAddressdata(result)
        console.log(result)
    }

    const onPressCloseModal = () => {
        console.log("State", modalVisible)
        setModalVisible(false);
    };




    const calculatePrice = async () => {
        console.log('usedDate', usedDate)
        var formdata = new FormData()
        formdata?.append('user_id', userID)
        formdata?.append('start_time', convertTo24HourFormat(JSON.parse(startTime)))
        formdata?.append('end_time', convertTo24HourFormat(JSON.parse(endTime)))
        formdata?.append('date', usedDate?.join(','))
        formdata?.append('service_id', service?.id)
        const result = await handlePostRequest('price_calculate', formdata)
        if (result?.status == '200') {
            setPrice(result?.price)
        }
        else {
            Alert.alert("Info", result?.message)
            navigation.goBack()
        }
    }

    const toggleModal = () => {
        setIsAddressModalVisible(prev => !prev)
    }

    const onPressBookNow = (time, amount, slotId, price) => {
        navigation.navigate('CreateBooking_Parent', {
            bookingDetails: JSON.stringify({
                name: `${profiledetailsdata?.userDetails?.first_name} ${profiledetailsdata?.userDetails?.last_name}`,
                date: usedDate,
                start_time: startTime,
                end_time: endTime,
                price: price,
                user_id: userID,
                booking_address: selectedAddress
            })
        })
    }

    const handleAddressSelection = (address) => {
        setSelectedAddress(address?.address);
        // setError(false);
    };

    const handleAddAddress = () => {
        // Logic to add a new address
        // This could open a modal or navigate to a different screen
        // to enter a new address
        console.log('Add new address functionality here');
    };

    const renderAddressItem = (item, index) => {
        if (index == 0) {
            return (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleAddressSelection(item)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <RadioButton.Android
                        theme={{ colors: { accent: Colors.Secondary } }}
                        value={item}
                        status={selectedAddress && selectedAddress === item?.address ? 'checked' : 'unchecked'}
                        onPress={() => handleAddressSelection(item)}
                    /> */}
                        <Text>{item?.address}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

    }

    const handleProceed = () => {

    };

    const getUsersProfileDetails = async () => {
        const formdata = new FormData()
        formdata.append('userId', userID)
        {
            JSON.parse(bookingDate)?.startDate
                ?
                formdata.append('date', formatDate(slotsDate, true))
                :
                formdata.append('date', formatDate(slotsDate, true))
        }
        const result = await handlePostRequest('user_details', formdata)

        if (result?.status == '200') {
            setProfiledetailsdata(result)
            console.log("profiledetailsdata?.data?.reviews_data?.length", result?.userDetails)
        } else if (result?.status == '201') {
            Alert.alert("Error", result?.message)
            navigation.goBack()
        }
        setLoader(false)
    }
    const getFinalPrice = async (childrencount) => {
        const formdata = new FormData()
        formdata.append('userId', userID)
        formdata.append('children', childrencount)
        formdata?.append('start_time', convertTo24HourFormat(JSON.parse(startTime)))
        formdata?.append('end_time', convertTo24HourFormat(JSON.parse(endTime)))

        const result = await handlePostRequest('childrenwise_price', formdata)

        if (result?.status == '200') {
            setsetFinalPriceResult(result)
            setFinalPrice(result?.final_price)
            console.log(result)
        } else if (result?.status == '201') {
            Alert.alert("Error", result?.message)
            setChildren('')

            //navigation.goBack()
        }
        setLoader(false)
    }

    const DateSection = ({ section }) => (
        <View style={styles.datesection}>
            <Text style={{ ...Fonts.medBold }}>{formatDateProfilePageDate(section.date)}</Text>
        </View>
    );

    const onChangeAndroidPicker = (a, time) => {
        setSlotsDate(time)
    }

    const onChangeIosPicker = (a, time) => {
        setSlotsDate(time)
    }

    const SlotItem = ({ item }) => (
        <View style={styles.slotItem}>
            <Text>
                {convertTimeRangeTo12HourFormat(item?.duration)}
                <Text> (
                    {item?.service_id == 1 && <TagIcon name="baby-carriage" label="Babysit" fontawesome={true} style={styles.tag} />}
                    {item?.service_id == 2 && <TagIcon name="paw" label="Petsit" style={styles.tag} />}
                    {item?.service_id == 3 && <TagIcon name="home" label="Homesit" style={styles.tag} />}
                    )
                </Text>
            </Text>
            {
                item?.status === 0 ?
                    <TouchableOpacity onPress={() => onPressBookNow(convertTimeRangeTo12HourFormat(item?.duration), item?.amount, item?.id, item?.amount)}>
                        <Text style={{ textDecorationLine: 'underline', color: Colors.Secondary }}>
                            Book Now
                        </Text>
                    </TouchableOpacity>
                    :
                    <Text style={{}}>
                        Booked <AntDesign name="checkcircleo" color={Colors.MUTED_GREEN} />
                    </Text>
            }
        </View>
    );

    const onPressProceed = () => {
        if (false) {
            setError(true);
            // Show an error message or perform any other action
            return;
        }
        else {
            setModalVisible(true)
            console.log('Proceed with address:', selectedAddress);
            //     navigation.navigate('CreateBooking_Parent', {
            //         createBooking: JSON.stringify({
            //             name: `${profiledetailsdata?.userDetails?.first_name} ${profiledetailsdata?.userDetails?.last_name}`,
            //             date: usedDate,
            //             start_time: startTime,
            //             end_time: endTime,
            //             price: price,
            //             user_id: userID,
            //             booking_address: selectedAddress,
            //             service: service
            //         })
            //     })
            // }
        }
    }


    const onPressButton = () => {
        if (children == '') {
            Alert.alert("Error", "Field can not be empty")
        } else {
            setModalVisible(false)
            console.log('PARAMS==============:', usedDate,);
            console.log('Proceed with PARAMS==============:', startTime,);
            console.log('Proceed with PARAMS==============:', endTime,);
            console.log('Proceed with PARAMS==============:', finalPrice,);
            console.log('Proceed with PARAMS==============:', userID,);
            console.log('Proceed with PARAMS==============:', selectedAddress,);
            console.log('Proceed with PARAMS==============:', service,);
            navigation.navigate('CreateBooking_Parent', {
                createBooking: JSON.stringify({
                    name: `${profiledetailsdata?.userDetails?.first_name} ${profiledetailsdata?.userDetails?.last_name}`,
                    date: usedDate,
                    start_time: startTime,
                    end_time: endTime,
                    price: finalPrice,
                    user_id: userID,
                    booking_address: selectedAddress,
                    service: service
                })
            })

        }

        // getFinalPrice()
    }
    const onPressReviews = () => {
        navigation.navigate("Reviews_Parent", { 'userId': userID })
    }

    console.log("new Date(bookingDate)====>", new Date(JSON.parse(bookingDate)))
    const styles = makeStyles(H, W)



    const renderReviews = ({ item, index }) => {
        return (
            <ReviewCard
                baseUrl={profiledetailsdata?.url}
                profilePicture={item?.image}
                fullName={item?.name}
                date={item?.date}
                rating={item?.rating}
                review={item?.review}
            />
        )
    }



    return (
        loader
            ?
            <Loader />
            :
            <ImageBackground
                source={require('../assets/images/background.png')}
                style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.contentContainerStyle}
                    style={styles.container}>

                    <View style={styles.upperContainer}>

                        <TouchableOpacity onPress={() => navigation.navigate('ViewPicture', { imageUrl: `${profiledetailsdata?.url}${profiledetailsdata?.userDetails?.picture}` })}>
                            <Image
                                source={{ uri: `${profiledetailsdata?.url}${profiledetailsdata?.userDetails?.picture}` }}
                                defaultSource={require('../assets/images/profile-user.png')}
                                style={styles.profilePic}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={[styles.heading, { marginBottom: 0 }]}>{`${profiledetailsdata?.userDetails?.first_name} ${profiledetailsdata?.userDetails?.last_name}`}</Text>
                            <Text style={[styles.textSecondary, { marginBottom: 0 }, Fonts.medMedium]}>{profiledetailsdata?.userDetails?.address}</Text>

                            <View style={styles.priceBox}>
                                <View style={styles.whiteBox}>
                                    {/* <Text style={[styles.text, { marginBottom: 0, ...Fonts.larMedium }]}> {`$ ${profiledetailsdata?.userDetails?.hour_price}/Hr`}</Text> */}
                                    <Text style={[styles.text, { marginBottom: 0, ...Fonts.larMedium }]}> {`$ ${profiledetailsdata?.userDetails?.price1}/Hr`}</Text>

                                </View>
                                <TouchableOpacity
                                    style={{ justifyContent: 'center', marginLeft: 10 }}
                                    onPress={handleIconPress}>
                                    <AntDesign
                                        name="infocirlce" size={22} color={'red'}>
                                    </AntDesign>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                    <View style={styles.lowerContainer}>
                        <Text style={styles.description}>
                            {profiledetailsdata?.userDetails?.description}
                        </Text>
                        <Text>
                            <Text style={styles.subheading}>Favorited: </Text>
                            <Text style={[styles.text, Fonts.medMedium]}>{profiledetailsdata?.userDetails?.no_of_favourite} times</Text>
                        </Text>
                        <Text>
                            <Text style={styles.subheading}>Rating: </Text>
                            <Text style={[styles.text, Fonts.medMedium]}>{profiledetailsdata?.userDetails?.rating}/5 <AntDesign name="star" size={16} color={Colors.golden} /></Text>
                        </Text>



                        <View
                            style={{
                                flexDirection: 'row'
                            }}>
                            <Text style={[styles.subheading, { textDecorationLine: "underline", color: Colors.gray }]}>Reviews({profiledetailsdata?.userDetails?.reviews}) </Text>
                            <TouchableOpacity
                                onPress={onPressReviews}
                                style={{
                                    marginStart: 20
                                }}
                            >
                                <Text style={[styles.seemore, { textDecorationLine: "underline", color: "red" }]}>See More </Text>
                            </TouchableOpacity>
                        </View>


                        {/* 
                        <TouchableOpacity
                            onPress={onPressReviews}>
                            <Text style={[styles.subheading, { textDecorationLine: "underline", color: Colors.gray }]}>Reviews({profiledetailsdata?.userDetails?.reviews}) </Text>
                        </TouchableOpacity> */}



                        <View style={styles.flatlist}>
                            {
                                profiledetailsdata?.userDetails?.reviews_data?.length == 0
                                    ?
                                    <View style={styles.errorContainer}>
                                        <Text>No Reviews Yet..</Text>
                                    </View>
                                    :
                                    <FlatList
                                        data={profiledetailsdata?.userDetails?.reviews_data}
                                        renderItem={renderReviews}
                                        keyExtractor={(item, index) => `${index}`}
                                    />
                            }
                        </View>


                        <Text style={styles.warningtitle}>Warning: </Text>
                        <Text style={[styles.warning, Fonts.smMedium]}>
                            For your own safety and protection, only communicate through this app.
                            Never pay for anything and don't share personal information like ID documents and bank details with someone you have never met.
                        </Text>
                        {/* <Text style={styles.textneedbabysittertitle}>Availability</Text> */}
                        <Divider style={styles.divider} />
                        <Text style={styles.mainHeading}>Booking Summary :</Text>

                        <Text style={styles.detailRow}>
                            <Text style={styles.label}>
                                Date(s) : </Text>
                            <Text style={styles.bookingSpecs}>
                                {dateParse?.map((item, index) => index == dateParse?.length - 1 ? `${formatDate_mmddyyyy(item, true)}` : `${formatDate_mmddyyyy(item, true)} ; `)}
                            </Text>
                        </Text>
                        <Text style={styles.detailRow}>
                            <Text style={styles.label}>
                                Time : </Text>
                            <Text style={styles.bookingSpecs}>
                                {`${convertTo12HourFormat(convertTo24HourFormat(JSON.parse(startTime)))} - ${convertTo12HourFormat(convertTo24HourFormat(JSON.parse(endTime)))}`}
                            </Text>
                        </Text>
                        <Text style={styles.detailRow}>
                            <Text style={styles.label}>
                                Price : </Text>
                            <Text style={styles.bookingSpecs}>$ {price}   </Text>



                        </Text>
                        <Text style={styles.detailRow}>
                            <Text style={styles.label}>
                                Service : </Text>
                            <Text style={styles.bookingSpecs}>
                                {service?.service_name}
                            </Text>
                        </Text>
                        <View style={styles.horizontal}>
                            <Text style={[styles.detailRow, { marginBottom: Spaces.sm }]}>
                                <Text style={styles.mainHeading}>
                                    Address :
                                </Text>
                            </Text>
                            {/* <TouchableOpacity
                                onPress={() => navigation.navigate('AddAddress')}
                                style={styles.smallButton}>
                                <Text style={styles.whiteText}><AntDesign name="pluscircle" /> Add</Text>
                            </TouchableOpacity> */}
                        </View>

                        {
                            addressdata?.data?.map((item, index) => renderAddressItem(item, index))
                        }
                        {/* {
                            error
                            &&
                            <Text style={{ color: 'red' }}>Please select an address</Text>
                        } */}
                    </View>
                    <CustomButton
                        onPressButton={onPressProceed}
                        // title={"Proceed to Payment"} />
                        title={"Proceed"} />
                </ScrollView>

                {/* final price modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.sectionHeader}>Enter Children To Proceed</Text>
                            <TextInputComponent
                                keyboardType='numeric'
                                value={children}
                                onChangeText={text => handleInputChange(text)}
                                placeholder={"No of children"}
                                style={styles.input} />


                            <Text style={styles.sectionHeader}>
                                Final Price ($) : {finalPrice}</Text>

                            <TouchableOpacity
                                style={[styles.button]}
                                //disabled={disabled || loader}
                                onPress={onPressButton}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.linearGradientButton}
                                    colors={[Colors.PRIMARY, Colors.golden]}>
                                    {
                                        loader ?
                                            <ActivityIndicator size={"small"}
                                                color={Colors.white}
                                            />
                                            :
                                            <Text style={styles.text}>Proceed to Payment</Text>
                                    }
                                </LinearGradient>
                            </TouchableOpacity>

                            <View style={styles.tipButtons} >
                                <Text
                                    onPress={onPressCancelButton}
                                    style={styles.buttonNo}>Cancel</Text>


                            </View>

                        </View>
                    </View>
                </Modal>

                {/* children and price detail modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={pricemodalVisible}
                    onRequestClose={() => {
                        setPriceModalVisible(false);
                    }}
                >
                    <TouchableOpacity
                        onPress={handleOutSidePress}
                        style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {/* Content */}
                            <View style={styles.rowItemsLayout}>
                                <Text style={styles.text}>Children</Text>
                                <Text style={styles.text}>Price ($)</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.textcontent}>{profiledetailsdata?.userDetails?.children1}</Text>
                                <Text style={styles.textcontent}>{profiledetailsdata?.userDetails?.price1}/Hr</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.textcontent}>{profiledetailsdata?.userDetails?.children2}</Text>
                                <Text style={styles.textcontent}>{profiledetailsdata?.userDetails?.price2}/Hr</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.textcontent}>{profiledetailsdata?.userDetails?.children3}</Text>
                                <Text style={styles.textcontent}>{profiledetailsdata?.userDetails?.price3}/Hr</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.textcontent}>{profiledetailsdata?.userDetails?.children4}+</Text>
                                <Text style={styles.textcontent}>{profiledetailsdata?.userDetails?.price4}/Hr</Text>
                            </View>
                            {/* End of Content */}
                        </View>
                    </TouchableOpacity>
                </Modal>

            </ImageBackground >
    )
}

export default ProfileOfSitterDuringBooking_Parent

const makeStyles = (H, W) => StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: H * 0.02
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
        marginBottom: Spaces.sm,
    },
    seemore: {
        ...Fonts.medBold,
        marginBottom: Spaces.sm,
    },
    text: {
        marginBottom: Spaces.sm,
    },
    description: {
        ...Fonts.medBold,
        color: "black",
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
        marginVertical: Spaces.sm,
    },
    priceBox:
    {
        borderRadius: 8,
        alignSelf: 'flex-start',
        flexDirection: 'row',
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
        marginTop: H * 0.01
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
    // modalContainer:
    // {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: Colors.grayTransparent
    // },
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
        ...Fonts.larBold,
    },
    bookingSpecs:
    {
        textDecorationLine: 'underline',

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
    modalstyling:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalstyling2:
    {
        width: W * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },



    input: {
        marginBottom: Spaces.sm,
        width: W * 0.5,
        marginTop: Spaces.lar
    },
    sectionHeader: {
        ...Fonts.larBold,
        marginTop: Spaces.med,
        marginBottom: Spaces.sm,

    },
    sectionHeader2: {
        ...Fonts.xlSemiBold,
        marginTop: Spaces.med,
        marginBottom: Spaces.sm,


    },
    updateButton:
    {
        marginBottom: Spaces.sm,

        marginTop: Spaces.lar


    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: Spaces.med,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
    },
    rowItemsLayout: {
        width: W,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 10,
    },
    row: {
        width: W * 0.46,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,

    },
    text: {
        marginRight: 10,
        ...Fonts.medSemiBold,

    },
    textcontent: {
        marginRight: 0,
        ...Fonts.med,

    },

    buttonYes:
    {
        ...Fonts.medSemiBold,
        height: W * 0.08,
        marginEnd: W * 0.03,
        width: W * 0.11,
        color: Colors.acceptedGreen,


    },
    buttonNo:
    {
        ...Fonts.medSemiBold,
        textAlign: 'center',
        width: W * 0.2,
        color: Colors.rejectedRed
    },
    tipButtons:
    {
        height: W * 0.08,
        marginTop: 10,
        marginBottom: 5,
        justifyContent: 'space-between',
        //alignSelf:'flex-start',
    },

    button:
    {
        width: W * 0.55,
        alignSelf: 'center',
        marginVertical: Spaces.sm,
    },
    text:
    {
        textAlign: 'center',
        ...Fonts.medBold
    },
    linearGradientButton:
    {
        borderWidth: 0.6,
        height: 50,
        width: W * 0.55,
        borderRadius: 10,
        justifyContent: 'center',
    },
    flatlist:
    {
        padding: Spaces.med,
        // height: H * 0.54,
        borderWidth: 1,
        borderRadius: 8,
    },
}) 