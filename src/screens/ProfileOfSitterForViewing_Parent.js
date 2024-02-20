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
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View, useWindowDimensions, Modal, FlatList } from 'react-native'

const DATA = {
    status: '200',
    data: {
        profile_pic: 'https://images.pexels.com/photos/13991663/pexels-photo-13991663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        name: 'James McAvoy',
        address: '4136 Sussex Court, Dallas, TX, Texas',
        hourly_price: '24',
        rating: '2.4',
        reviews: '22',
        no_of_favourite: '5',
        description:'Welcome to my profile! I am a nurturing and dependable baby sitter dedicated to providing a safe and engaging environment for your little ones. With a genuine love for children and years of experience, I am committed to ensuring both their well-being and enjoyment while in my care.',
        service:'',
    }
}


const ProfileOfSitterForViewing_Parent = ({ navigation, route }) => {


    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const [addressdata, setAddressdata] = useState()
    const [profiledata, setProfiledata] = useState()
    const [loader, setLoader] = useState(false)
    //const [slotsDate, setSlotsDate] = useState(JSON.parse(bookingDate)?.startDate ? new Date(JSON.parse(bookingDate)?.startDate) : new Date(JSON.parse(bookingDate)))
    const [serviceFilterId, setServiceFilterId] = useState(null);
    const [isAddressModalVisible, setIsAddressModalVisible] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [error, setError] = useState(false);
    const [price, setPrice] = useState('')

    const isFocused = useIsFocused()

    useEffect(() => {
        getSitterProfile()
    }, [])

    const getSitterProfile = () => {
        var formdata = new FormData()
        setProfiledata(DATA)
    }



    const getAddress = async () => {
        const result = await handleGetRequest('address_list')
        setAddressdata(result)
        console.log(result)
    }

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
        console.log("formdata", result)
    }

    const toggleModal = () => {
        setIsAddressModalVisible(prev => !prev)
    }

    const onPressBookNow = (time, amount, slotId, price) => {
        navigation.navigate('CreateBooking_Parent', {
            bookingDetails: JSON.stringify({
                name: `${profiledata?.data?.first_name} ${profiledata?.data?.last_name}`,
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
            console.log(result)
        } else if (result?.status == '201') {
            Alert.alert("Error", result?.message)
            navigation.goBack()
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
            console.log('Proceed with address:', selectedAddress);
            navigation.navigate('CreateBooking_Parent', {
                createBooking: JSON.stringify({
                    name: `${profiledata?.data?.first_name} ${profiledata?.data?.last_name}`,
                    date: usedDate,
                    start_time: startTime,
                    end_time: endTime,
                    price: price,
                    user_id: userID,
                    booking_address: selectedAddress,
                    service: service
                })
            })
        }
    }

    const onPressReviews = () => {
        navigation.navigate("Reviews_Parent", { 'userId': userID })
    }

    //console.log("new Date(bookingDate)====>", new Date(JSON.parse(bookingDate)))
    const styles = makeStyles(H, W)
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
                        <TouchableOpacity onPress={() => navigation.navigate('ViewPicture', { imageUrl: `${profiledata?.data?.profile_pic}` })}>
                            <Image
                                source={{ uri: `${profiledata?.data?.profile_pic}` }}
                                defaultSource={require('../assets/images/profile-user.png')}
                                style={styles.profilePic}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={[styles.heading, { marginBottom: 0 }]}>{`${profiledata?.data?.name}`}</Text>
                            <Text style={[styles.textSecondary, { marginBottom: 0 }, Fonts.medMedium]}>{profiledata?.data?.address}</Text>
                            <View style={styles.whiteBox}>
                                <Text style={[styles.text, { marginBottom: 0, ...Fonts.larMedium }]}> {`$ ${profiledata?.data?.hourly_price}/Hr`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.lowerContainer}>
                        <Text style={styles.text}>
                            {profiledata?.data?.description}
                        </Text>
                        <Text>
                            <Text style={styles.subheading}>Favorited: </Text>
                            <Text style={[styles.text, Fonts.medMedium]}>{profiledata?.data?.no_of_favourite} times</Text>
                        </Text>
                        <Text>
                            <Text style={styles.subheading}>Rating: </Text>
                            <Text style={[styles.text, Fonts.medMedium]}>{profiledata?.data?.rating}/5 <AntDesign name="star" size={16} color={Colors.golden} /></Text>
                        </Text>
                        <TouchableOpacity onPress={onPressReviews}>
                            <Text style={[styles.subheading, { textDecorationLine: "underline", color: Colors.gray }]}>Reviews({profiledata?.data?.reviews}) </Text>
                        </TouchableOpacity>
                        <Text style={styles.warningtitle}>Warning: </Text>
                        <Text style={[styles.warning, Fonts.smMedium]}>
                            For your own safety and protection, only communicate through this app.
                            Never pay for anything and don't share personal information like ID documents and bank details with someone you have never met.
                        </Text>
                        {/* <Text style={styles.textneedbabysittertitle}>Availability</Text> */}
                    </View>
                </ScrollView>
            </ImageBackground >
    )
}

export default ProfileOfSitterForViewing_Parent

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
}) 

