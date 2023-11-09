import { Alert, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider, SegmentedButtons, Text } from 'react-native-paper'
import Spaces from '../helper/Spaces'
import Fonts from '../helper/Fonts'
import Colors from '../helper/Colors'
import Loader from '../components/Loader'
import { convertTimeRangeTo12HourFormat, formatDate, formatDateProfilePageDate, handlePostRequest } from '../helper/Utils'
import TagIcon from '../components/TagIcon'
import CustomDateTimePicker from '../components/CustomDateTimePicker'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'

const ProfileOfSitterDuringBooking_Parent = ({ navigation, route }) => {

    const { userID, bookingDate } = route.params

    console.log("bookingDate ====>", bookingDate)

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const [profiledetailsdata, setProfiledetailsdata] = useState()
    const [loader, setLoader] = useState(true)
    const [slotsDate, setSlotsDate] = useState(JSON.parse(bookingDate)?.startDate ? new Date(JSON.parse(bookingDate)?.startDate) : new Date(JSON.parse(bookingDate)))
    const [serviceFilterId, setServiceFilterId] = useState(null);

    useEffect(() => {
        getUsersProfileDetails()
    }, [slotsDate])

    const onPressBookNow = (time, amount, slotId, price) => {
        navigation.navigate('BookingConfirmation_Parent', {
            bookingDetails: JSON.stringify({
                name: `${profiledetailsdata?.userDetails?.first_name} ${profiledetailsdata?.userDetails?.last_name}`,
                date: slotsDate,
                time: time,
                price: amount,
                slot_id: slotId,
                amount: price,
                user_id: userID,
                profile_pic: `${profiledetailsdata?.url}${profiledetailsdata?.userDetails?.picture}`
            })
        })
    }

    const getUsersProfileDetails = async () => {
        const formdata = new FormData()
        formdata.append('userId', userID)
        {
            JSON.parse(bookingDate)?.startDate ?
                formdata.append('date', formatDate(slotsDate, true))
                :
                formdata.append('date', formatDate(slotsDate))
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
                                <Text style={[styles.text, { marginBottom: 0, ...Fonts.larMedium }]}> {`$ ${profiledetailsdata?.userDetails?.hour_price}/hrs`}</Text>
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
                        <Text style={styles.textneedbabysittertitle}>Availability</Text>
                        <Divider style={styles.divider} />
                        <CustomDateTimePicker
                            minimumDate={new Date()}
                            alignSelf='flex-end'
                            style={styles.datePicker}
                            value={slotsDate}
                            onChangeAndroid={onChangeAndroidPicker}
                            onChangeIos={onChangeIosPicker}
                        />
                        {profiledetailsdata?.userSlots?.length == 0
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
                        }
                        {profiledetailsdata?.userSlots?.map((section, index) => {
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
                        })}
                    </View>
                </ScrollView>
            </ImageBackground>
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
        marginBottom: Spaces.sm,
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
    }
}) 