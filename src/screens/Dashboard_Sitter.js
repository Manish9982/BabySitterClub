import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, useWindowDimensions, ScrollView, ImageBackground, Alert } from 'react-native';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import { Shadows, convertTimeRangeTo12HourFormat, formatDateProfilePageDate, handleGetRequest } from '../helper/Utils';
import { SegmentedButtons, Text } from 'react-native-paper';
import TagIcon from '../components/TagIcon';
import CloseButton from '../components/CloseButton';
import Loader from '../components/Loader';
import { useIsFocused } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    const [dashboardData, setDashboardData] = useState(null)
    const [serviceFilterId, setServiceFilterId] = useState(null)
    const [loader, setLoader] = useState(true)

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            getDashboardData()
        }
    }, [isFocused])

    const getDashboardData = async () => {
        const result = await handleGetRequest('dashboard')
        if (result?.status == '200') {
            setDashboardData(result)
        }
        else {
            Alert.alert('Error', result?.message)
        }
        setLoader(false)
    }

    const DateSection = ({ section }) => (
        <View style={styles.datesection}>
            <Text style={{ ...Fonts.medBold }}>{formatDateProfilePageDate(section.date)}</Text>
        </View>
    );

    const SlotItem = ({ item }) => (
        <View style={styles.slotItem}>
            <Text>
                {convertTimeRangeTo12HourFormat(item?.duration)}
                <Text> (
                    {item?.service_id == 1 && <TagIcon name="baby-carriage" label="Babysit" fontawesome={true} style={styles.tag} />}
                    {item?.service_id == 2 && <TagIcon name="paw-outline" label="Petsit" style={styles.tag} />}
                    {item?.service_id == 3 && <TagIcon name="home-outline" label="Homesit" style={styles.tag} />}
                    )
                </Text>
            </Text>
            {item?.status === 0 ? <>
                <Text>
                    Available
                </Text>
                <CloseButton id={item?.id} callBack={getDashboardData} /></> : <Text>Booked</Text>}
        </View>
    );



    const onPressAddAvailability = () => {
        navigation.navigate('AddAvailability_Sitter')
    }

    const onPressBell = () => {
        navigation.navigate('NotificationsScreen')
    }

    const onPressStatTotal = () => {
        navigation.navigate('Bookings')
    }
    const onPressStatCancelled = () => {
        navigation.navigate('CancelledBookingDisplay_Sitter')
    }
    const onPressStatCompleted = () => {
        navigation.navigate('Bookings')
    }
    const onPressStatPending = () => {
        navigation.navigate('Bookings')
    }

    const onPressUserProfile = () => {
        navigation.navigate('MyProfile_Sitter')
    }

    const styles = makeStyles(H, W)
    return (
        <ImageBackground
            style={styles.container}
            source={require('../assets/images/background.png')}
        >
            {
                loader
                    ?
                    <Loader />
                    :
                    <ScrollView>
                        <View style={[styles.horizontalContainer, styles.headerContainer]}>
                            <Text style={{ ...Fonts.xlSemiBold }}>Hello, {dashboardData?.userDetails?.first_name}</Text>
                            <View style={styles.horizontalContainer}>
                                <TouchableOpacity onPress={onPressBell}>
                                    {
                                        !(dashboardData?.userDetails?.notification_count == '0')
                                        &&
                                        <View style={styles.notificationBadge}>
                                            <Text style={{
                                                color: 'white'
                                            }}>{dashboardData?.userDetails?.notification_count}</Text>
                                        </View>
                                    }
                                    <Image source={require('../assets/images/bell.png')}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={onPressUserProfile}>
                                    <Image source={require('../assets/images/account.png')}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.greetings}>Here are your Bookings Stats:</Text>
                        <View style={styles.statsContainer}>
                            <StatButton title="Total" count={dashboardData?.userDetails?.total_booking} onPressStat={onPressStatTotal} />
                            <StatButton title="Completed" count={dashboardData?.userDetails?.total_complete_booking} onPressStat={onPressStatCompleted} />
                            <StatButton title="Pending" count={dashboardData?.userDetails?.total_pending_booking} onPressStat={onPressStatPending} />
                            <StatButton title="Cancelled" count={dashboardData?.userDetails?.total_cancel_booking} onPressStat={onPressStatCancelled} />
                        </View>
                        <Text style={styles.greetings}>Your Availability:</Text>
                        <View style={styles.boxAvailability}>

                            {
                                dashboardData?.slots?.length == 0
                                    ?
                                    <Text style={styles.text}>
                                        You have not added your availability yet. Tap <Text
                                            onPress={onPressAddAvailability}
                                            style={styles.blueText}>here</Text> to add.
                                    </Text>
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
                                                icon: () => <TagIcon name="home-outline" label="Homesit" style={styles.tag} />,
                                            },
                                            {
                                                value: '2',
                                                icon: () => <TagIcon name="paw-outline" label="Petsit" style={styles.tag} />,
                                            },
                                        ]}
                                    />
                            }

                            {dashboardData?.slots?.map((section, index) => {
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
            }
        </ImageBackground>
    );
};

const StatButton = ({ title, count, onPressStat }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    return (
        <TouchableOpacity
            onPress={onPressStat}
            style={styles.statButton}>
            <Text style={styles.statTitle}>{title}</Text>
            <Text style={[styles.statCount, Fonts.xlSemiBold]}>{count}</Text>
        </TouchableOpacity>
    );
};


const makeStyles = (H, W) => StyleSheet.create({
    container: {
        flex: 1
    },
    cardContainer: {
        flexWrap: 'wrap',
        backgroundColor: 'white',
        padding: Spaces.lar,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: Spaces.sm,
    },
    profileImage: {
        width: H * 0.14,
        height: H * 0.14,
        borderRadius: H * 0.14 / 2,
        //marginBottom: 10,
        borderWidth: 0.6,
        borderColor: Colors.blue
    },
    name: {
        ...Fonts.larBold,
    },
    address: {
        marginBottom: 5,
    },
    hourlyPrice: {
        marginBottom: 5,
    },
    tags: {
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: '#3498db',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'center',
        marginVertical: H * 0.01
    },
    editButtonText: {
        color: 'white',
    },
    about: {
        marginTop: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    statButton: {
        height: H * 0.17,
        width: W * 0.4,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Spaces.sm,
    },
    statTitle: {
        color: 'black',
        fontSize: 14,
    },
    statCount: {
        color: 'black',
        marginTop: 5,
    },
    tagIconContainer: {
        ...Shadows,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
        borderWidth: 0.2,
        borderRadius: 8,
        backgroundColor: Colors.white,
        padding: 2,
        borderColor: Colors.DEEP_GRAY,
        //flexWrap: 'wrap',
    },
    tagLabel: {
        marginLeft: 5,
        color: Colors.blue,
        fontSize: 14,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: Spaces.vsm,
        // width: W * 0.54,
    },
    headingText:
    {
        ...Fonts.medBold,
    },
    detailsCard:
    {
        marginHorizontal: Spaces.sm,
        width: W * 0.55,
    },
    texts:
    {
        marginVertical: H * 0.002
    },
    blueText:
    {
        color: Colors.blue,
        textDecorationLine: 'underline'
    },
    text:
    {
        alignSelf: 'center',
        marginVertical: H * 0.1,
        marginHorizontal: W * 0.01
    },
    boxAvailability:
    {
        borderWidth: 0.4,
        borderRadius: 8,
        margin: Spaces.sm,
        borderColor: Colors.blue,
        padding: Spaces.sm
    },
    horizontalContainer:
    {
        flexDirection: 'row'
    },
    icon:
    {
        height: H * 0.04,
        width: H * 0.04,
        marginHorizontal: W * 0.015
    },
    headerContainer:
    {
        justifyContent: 'space-between',
        padding: Spaces.sm
    },
    greetings:
    {
        padding: Spaces.sm
    },
    segment:
    {
        margin: Spaces.sm
    },
    datesection:
    {
        backgroundColor: Colors.grayTransparent,
        padding: Spaces.sm,
        borderRadius: 10,
    },
    slotItem:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spaces.sm
    },
    tag:
    {
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationBadge:
    {
        position: 'absolute',
        zIndex: 2,
        left: W * 0.06,
        backgroundColor: 'red',
        height: H * 0.025,
        width: H * 0.025,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});

export default ProfileScreen;
