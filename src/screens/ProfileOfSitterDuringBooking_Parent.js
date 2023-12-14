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


const ProfileOfSitterDuringBooking_Parent = ({ navigation, route }) => {

    const { userID, bookingDate, startTime, endTime, service } = route.params
    const dateParse = JSON.parse(bookingDate)
    const usedDate = dateParse.map(item => formatDate(item, true))
    console.log("bookingDate ====>", dateParse)

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const [addressdata, setAddressdata] = useState()
    const [profiledetailsdata, setProfiledetailsdata] = useState()
    const [loader, setLoader] = useState(true)
    const [slotsDate, setSlotsDate] = useState(JSON.parse(bookingDate)?.startDate ? new Date(JSON.parse(bookingDate)?.startDate) : new Date(JSON.parse(bookingDate)))
    const [serviceFilterId, setServiceFilterId] = useState(null);
    const [isAddressModalVisible, setIsAddressModalVisible] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [error, setError] = useState(false);
    const [price, setPrice] = useState('')

    const isFocused = useIsFocused()

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
        setError(false);
    };

    const handleAddAddress = () => {
        // Logic to add a new address
        // This could open a modal or navigate to a different screen
        // to enter a new address
        console.log('Add new address functionality here');
    };

    const renderAddressItem = (item, index) => (
        <TouchableOpacity
            key={index}
            onPress={() => handleAddressSelection(item)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton.Android
                    theme={{ colors: { accent: Colors.Secondary } }}
                    value={item}
                    status={selectedAddress && selectedAddress === item?.address ? 'checked' : 'unchecked'}
                    onPress={() => handleAddressSelection(item)}
                />
                <Text>{item?.address}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleProceed = () => {

    };

    const getUsersProfileDetails = async () => {
        const formdata = new FormData()
        formdata.append('userId', userID)
        {
            JSON.parse(bookingDate)?.startDate ?
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
        if (!selectedAddress) {
            setError(true);
            // Show an error message or perform any other action
            return;
        }
        else {
            console.log('Proceed with address:', selectedAddress);
            navigation.navigate('CreateBooking_Parent', {
                createBooking: JSON.stringify({
                    name: `${profiledetailsdata?.userDetails?.first_name} ${profiledetailsdata?.userDetails?.last_name}`,
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

    console.log("new Date(bookingDate)====>", new Date(JSON.parse(bookingDate)))
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
                            <View style={styles.whiteBox}>
                                <Text style={[styles.text, { marginBottom: 0, ...Fonts.larMedium }]}> {`$ ${profiledetailsdata?.userDetails?.hour_price}/Hr`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.lowerContainer}>
                        <Text style={styles.text}>
                            {profiledetailsdata?.userDetails?.description}
                        </Text>
                        <Text>
                            <Text style={styles.subheading}>Favorited: </Text>
                            <Text style={[styles.text, Fonts.medMedium]}>{profiledetailsdata?.userDetails?.no_of_favourite} times</Text>
                        </Text>
                        {/* <Text>
                            <Text style={styles.subheading}>Age of children: </Text>
                            <Text style={styles.text}>Baby</Text>
                        </Text> */}
                        <Text style={styles.warningtitle}>Warning: </Text>
                        <Text style={[styles.warning, Fonts.smMedium]}>
                            For your own safety and protection, only communicate through this app.
                            Never pay for anything and don't share personal information like ID documents and bank details with someone you have never met.
                        </Text>
                        {/* <Text style={styles.textneedbabysittertitle}>Availability</Text> */}
                        <Divider style={styles.divider} />
                        <Text style={styles.mainHeading}>Booking Summary :</Text>
                        {/* <CustomDateTimePicker
                            minimumDate={new Date()}
                            alignSelf='flex-end'
                            style={styles.datePicker}
                            value={slotsDate}
                            onChangeAndroid={onChangeAndroidPicker}
                            onChangeIos={onChangeIosPicker}
                        /> */}
                        {/* {profiledetailsdata?.userSlots?.length == 0
                            ?
                            <Text style={styles.errorText}>No slots are available for this date</Text>
                            :
                            <SegmentedButtons
                                style={styles.segment}
                                value={serviceFilterId}
                                onValueChange={(t) => setServiceFilterId(prev => prev == t ? null : t)}
                                buttons={[
                                    {
                                        value: '1',
                                        icon: () => <TagIcon name="baby-carriage" label="Babysit" fontawesome={true} style={styles.tag} />,
                                    },
                                    {
                                        value: '3',
                                        icon: () => <TagIcon name="home" label="Homesit" style={styles.tag} />,
                                    },
                                    {
                                        value: '2',
                                        icon: () => <TagIcon name="paw" label="Petsit" style={styles.tag} />,
                                    },
                                ]}
                            />
                        } */}
                        {/* {profiledetailsdata?.userSlots?.map((section, index) => {
                            if (section?.service?.includes(Number.parseInt(serviceFilterId, 10)) || serviceFilterId == null) {
                                return (
                                    <View key={index}>
                                        <DateSection section={section} />
                                        {section?.times?.map((time) => {
                                            if (time?.service_id == serviceFilterId || serviceFilterId == null) {
                                                return (<SlotItem key={time.id} item={time} />)
                                            }
                                        })}
                                    </View>)
                            }
                        })} */}
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
                            <Text style={styles.bookingSpecs}>
                                $ {price}
                            </Text>
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
                            <TouchableOpacity
                                onPress={() => navigation.navigate('AddAddress')}
                                style={styles.smallButton}>
                                <Text style={styles.whiteText}><AntDesign name="pluscircle" /> Add</Text>
                            </TouchableOpacity>
                        </View>

                        {
                            addressdata?.data?.map((item, index) => renderAddressItem(item, index))
                        }
                        {error && <Text style={{ color: 'red' }}>Please select an address</Text>}
                    </View>
                    <CustomButton
                        onPressButton={onPressProceed}
                        title={"Proceed to Payment"} />
                </ScrollView>
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
    profilePic:
    {
        width: 100,
        height: 100,
        borderRadius: 100 / 3,
        marginRight: Spaces.sm,
        borderWidth: 0.6,
        borderColor: Colors.black
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
}) 