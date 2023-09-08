import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider, SegmentedButtons, Text } from 'react-native-paper'
import Spaces from '../helper/Spaces'
import Fonts from '../helper/Fonts'
import Colors from '../helper/Colors'
import Loader from '../components/Loader'
import { handlePostRequest } from '../helper/Utils'
import TagIcon from '../components/TagIcon'
import RNDateTimePicker from '@react-native-community/datetimepicker'


const ProfileOfSitterDuringBooking_Parent = ({ navigation, route }) => {

    console.log("UserID =    ", route?.params?.userID)

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const [profiledetailsdata, setProfiledetailsdata] = useState()
    const [loader, setLoader] = useState(true)
    const [slotsDate, setSlotsDate] = useState(new Date())
    const [serviceFilterId, setServiceFilterId] = useState(null);

    useEffect(() => {
        getUsersProfileDetails()
    }, [])

    const onPressBookNow = () => {
        navigation.navigate('BookingConfirmation_Parent')
    }

    const getUsersProfileDetails = async () => {
        const formdata = new FormData()
        formdata.append('userId', route?.params?.userID)
        const result = await handlePostRequest('user_details', formdata)

        if (result?.status == '200') {
            setProfiledetailsdata(result)
        } else if (result?.status == '201') {
            Alert.alert("Error", result?.message)
            navigation.goBack()
        }
        setLoader(false)
    }

    const DateSection = ({ section }) => (
        <View style={styles.datesection}>
            <Text style={{ ...Fonts.medBold }}>{section.date}</Text>
        </View>
    );

    const SlotItem = ({ item }) => (
        <View style={styles.slotItem}>
            <Text>
                {item?.duration}
                <Text> (
                    {item?.service_id == 1 && <TagIcon name="baby-carriage" label="Babysit" fontawesome={true} style={styles.tag} />}
                    {item?.service_id == 2 && <TagIcon name="paw-outline" label="Petsit" style={styles.tag} />}
                    {item?.service_id == 3 && <TagIcon name="home-outline" label="Homesit" style={styles.tag} />}
                    )
                </Text>
            </Text>
            {
                item?.status === 0 ?
                    <TouchableOpacity onPress={onPressBookNow}>
                        <Text style={{ textDecorationLine: 'underline', color: Colors.blue }}>
                            Book Now
                        </Text>
                    </TouchableOpacity>
                    :
                    <Text style={{ color: 'red' }}>
                        Booked
                    </Text>
            }
        </View>
    );


    const styles = makeStyles(H, W)
    return (
        loader
            ?
            <Loader />
            :
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.contentContainerStyle}
                    style={styles.container}>
                    <View style={styles.upperContainer}>
                        <View>
                            <Image
                                source={{ uri: `${profiledetailsdata?.url}${profiledetailsdata?.userDetails?.picture}` }}
                                defaultSource={require('../assets/images/profile-user.png')}
                                style={styles.profilePic}
                            />
                        </View>
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
                        {/* <Text style={styles.text}>
                            Characteristics of the children
                            <Text style={styles.text}>Curious, Funny, Intelligent</Text>
                        </Text> */}
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
                        {profiledetailsdata?.userSlots?.length == 0
                            ?
                            <Text>You have not added your availability</Text>
                            :
                            <View>
                                <RNDateTimePicker
                                value={slotsDate}
                                />
                            <SegmentedButtons
                                style={styles.segment}
                                value={serviceFilterId}
                                onValueChange={(t) => setServiceFilterId(prev => prev == t ? null : t)}
                                buttons={[
                                    {
                                        value: '1',
                                        label: <TagIcon name="baby-carriage" label="Babysit" fontawesome={true} style={styles.tag} />,

                                    },
                                    {
                                        value: '3',
                                        label: <TagIcon name="home-outline" label="Homesit" style={styles.tag} />,
                                    },
                                    {
                                        value: '2',
                                        label: <TagIcon name="paw-outline" label="Petsit" style={styles.tag} />,
                                    },
                                ]}
                            />
                            </View>
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
                {/* <View style={styles.floatingView}>
                    <View style={styles.secondaryFloatingView}>
                        <Text style={[styles.text, styles.floatText,

                        { ...Fonts.larBold }]}>{`$${profiledetailsdata?.userDetails?.hour_price}/hrs`}</Text>

                        <Text style={[styles.subheading, styles.floatText]}>Total Price</Text>
                    </View>
                    <View style={styles.secondaryFloatingView}>
                        <SmallWhiteButton title={`Contact ${profiledetailsdata?.userDetails?.first_name}`} />
                    </View>
                </View> */}
            </View>
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
        marginBottom: Spaces.med,
        color: "white"
    },
    textneedbabysittertitle: {
        ...Fonts.larMedium,
        color: "black",
        marginTop: H * 0.025
    },
    subheading: {
        ...Fonts.medBold,
        marginBottom: Spaces.med,
    },
    text: {
        marginBottom: Spaces.med,
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: Spaces.med,
    },
    contentContainerStyle:
    {

    },
    textSecondary:
    {
        ...Fonts.sm,
        color: Colors.white,
        marginBottom: Spaces.med,
        width: W * 0.7
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
        padding: Spaces.med,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spaces.med
    },
    profilePic:
    {
        height: H * 0.13,
        width: H * 0.13,
        borderRadius: H * 0.13 / 2,
        marginRight: Spaces.med
    },
    lowerContainer:
    {
        padding: Spaces.med
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
        padding: Spaces.xl,
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
        padding: Spaces.med,
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
    }
}) 