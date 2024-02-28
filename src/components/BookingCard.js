import React, { useState } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, Modal, Alert, Touchable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import { Shadows, convertTimeRangeTo12HourFormat, formatDate, formatDateWithTime, formatDate_mmddyyyy, handlePostRequest } from '../helper/Utils';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Fonts from '../helper/Fonts';
import SmallButtonSecondary from './SmallButtonSecondary';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import TextInputComponent from './TextInputComponent';

const BookingCard = ({ booking, profileURL, getDataForRefresh }) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [rating, setRating] = useState(0)
    const [submitLoader, setSubmitLoader] = useState(false)
    const [comment, setComment] = useState('')
    const [tipModal, setTipModal] = useState(false)
    const [tipAmount, setTipAmount] = useState('')


    const W = useWindowDimensions().width
    const navigation = useNavigation()

    console.log('booking?.is_rate', booking?.is_rate)

    const handleRatingSubmit = (data) => {
        // Handle the submission of rating and review data here
        console.log(data);
    };

    const onPressTipSubmit = () =>{
        navigation.navigate()
    }

    const onPressSubmitFeedback = () => {
        setModalVisible(prev => !prev);
    }

    const onPressSubmit = async () => {
        setSubmitLoader(true)
        var formdata = new FormData()
        formdata.append('rating', rating)
        formdata.append('booking_id', booking?.booking_id)
        formdata.append('user_id', booking?.book_userId)
        formdata.append('comment', comment)
        const result = await handlePostRequest('rating', formdata)
        if (result?.status == '200') {
            Alert.alert('Success', `${result?.message}`)
            setModalVisible(prev => !prev)
            setTipModal(prev=>!prev)
        }
        else {
            Alert.alert(`${result?.message}`)
        }
        setSubmitLoader(false)
        getDataForRefresh()
    }

    const styles = makeStyles(W)
    return (
        <View style={[styles.cardContainer, { backgroundColor: Colors.white }]}>
            <Modal
                visible={isModalVisible}
                transparent={true} >
                <TouchableWithoutFeedback onPress={() => setModalVisible(prev => !prev)}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.ratingBox}>
                                <Text style={styles.rateTextName}>Tell us how was your experience with {booking?.first_name}?</Text>
                                <Rating
                                    showRating
                                    onFinishRating={(t) => setRating(t)}
                                    style={{ paddingVertical: 10 }}
                                />
                                <TextInputComponent
                                style={{
                                    alignSelf:'center',
                                    marginBottom:15,
                                    width:200
                                }}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder={'Comments'}
                                    value={comment}
                                    onChangeText={setComment}
                                />
                                <SmallButtonSecondary
                                    onPressSmallButton={onPressSubmit}
                                    loader={submitLoader}
                                    title={'Submit'}
                                    style={styles.ratingButton}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Modal
                visible={tipModal}
                transparent={true} >
                <TouchableWithoutFeedback onPress={() => setTipModal(prev => !prev)}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.ratingBox}>
                                <Text style={styles.rateTextName}>Do you want to add a tip for {booking?.first_name}?</Text>
                                
                                <TextInputComponent
                                style={{
                                    alignSelf:'center',
                                    marginBottom:15,
                                    width:200
                                }}
                                    multiline={true}
                                    placeholder={'Comments'}
                                    value={tip}
                                    onChangeText={setComment}
                                />
                                <SmallButtonSecondary
                                    onPressSmallButton={onPressTipSubmit}
                                    loader={submitLoader}
                                    title={'Yes'}
                                    style={styles.ratingButton}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            {
                booking?.is_replace == '1'
                &&
                <View style={styles.replaceContainer}>
                    <Text style={styles.replaceText}>Replacement booking</Text>
                    <Image source={require('../assets/images/alter.png')}
                        style={styles.replaceIcon}
                    />
                </View>

            }
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={() => { navigation.navigate('ViewPicture', { imageUrl: `${profileURL}${booking?.picture}` }) }}>
                    <Image
                        source={{ uri: `${profileURL}${booking?.picture}` }} // Replace with your actual image path
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={styles.bookingLabel2}>Booking ID:  </Text>
                    <Text style={styles.bookingValue}>#{booking?.booking_id}</Text>
                </View>
                <View>
                    <Text style={styles.bookingLabel2}>Transaction ID:  </Text>
                    <Text style={styles.bookingValue}>{booking?.transaction_id}</Text>
                </View>
                {/* <AntDesign name={booking?.icon} color={booking?.b_color} /> */}
                <AntDesign name={booking?.b_icon} color={booking?.b_color} size={Spaces.lar} style={{ marginTop: Spaces.sm }} />
                <Text style={styles.bookingValue2}>{booking?.booking_status}</Text>
                {
                    booking?.is_rapid == '1'
                    &&
                    <View style={styles.blitzcareFlag}>
                        <Image source={require('../assets/images/lightning.png')}
                            style={styles.light}
                        />
                        <Text style={{ color: '#fff' }}>BlitzCare</Text>
                    </View>
                }

                <Text style={styles.createdAt}>{formatDateWithTime(booking?.created_at)}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.detailsContainer}>
                <View style={styles.detail}>
                    <Text style={styles.label}>Name:  </Text>
                    <Text style={styles.value}>{booking?.first_name} {booking?.last_name}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Rating:  </Text>
                    <Text style={styles.value}>{booking?.rating}/5.0 <AntDesign name='star' color={Colors.golden} size={Spaces.lar} /></Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Slot Date:  </Text>
                    <Text style={styles.value}>{formatDate_mmddyyyy(booking?.slot_date)}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Slot Time:  </Text>
                    <Text style={styles.value}>{convertTimeRangeTo12HourFormat(booking?.slot_id)}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Service:  </Text>
                    <Text style={styles.value}>{booking?.booked_service_name}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Duration:  </Text>
                    <Text style={styles.value}>{booking?.time_difference}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Price:  </Text>
                    <Text style={styles.value}>${booking?.amount}</Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Payment:  </Text>
                    <Text style={[styles.value, { color: booking?.p_color }]}>
                        {booking?.payment}
                    </Text>
                </View>
                <View style={styles.detail}>
                    <Text style={styles.label}>Address:  </Text>
                    <Text style={styles.value}>{booking?.address}</Text>
                </View>
                {
                    booking?.is_rate == '0'
                    &&
                    <SmallButtonSecondary
                        onPressSmallButton={onPressSubmitFeedback}
                        title={'Submit Feedback'}
                        style={styles.ratingButton2} />
                }
            </View>
        </View>
    );
};

const makeStyles = (W) => StyleSheet.create({
    cardContainer: {
        borderColor: Colors.PRIMARY,
        borderWidth: 2,
        flexDirection: 'row',
        width: W * 0.96,
        marginVertical: Spaces.sm,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        padding: Spaces.sm,
        ...Shadows
    },
    profileContainer: {
        //justifyContent: 'space-evenly',
        alignItems: 'center',
        //margin: Spaces.sm,
        marginRight: 0
    },
    profileImage:
    {
        width: 75,
        height: 75,
        borderRadius: 20,
        marginRight: Spaces.sm,
        borderWidth: 0.6,
        borderColor: Colors.black
    },
    detailsContainer: {

    },
    detail: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        //justifyContent: 'space-between',
        marginBottom: Spaces.sm,
    },
    label: {
        ...Fonts.sm,
        width: W * 0.16,
    },
    value: {
        ...Fonts.smBold,
        width: W * 0.37,
        //backgroundColor:'purple'
    },
    paymentDone: {
        color: 'green'
    },
    paymentPending:
    {
        color: 'red'
    },
    ratingButton:
    {
        backgroundColor: Colors.PRIMARY,
        height: W * 0.08,
        //alignSelf:'flex-start',
        width: W * 0.4,
    },
    ratingButton2:
    {
        backgroundColor: Colors.PRIMARY,
        //alignSelf:'flex-start',
    },
    divider: {
        height: '100%',
        width: 1,
        backgroundColor: Colors.golden,
        marginHorizontal: Spaces.sm
    },
    bookingLabel:
    {
        alignSelf: 'flex-start',
        ...Fonts.sm,
    },
    bookingLabel2:
    {
        //alignSelf: 'flex-start',
        ...Fonts.sm,
        marginTop: Spaces.sm,
        textAlign: 'center'
    },
    bookingValue:
    {
        ...Fonts.smBold,
        width: W * 0.33,
        alignSelf: 'center',
        textAlign: 'center'
    },
    bookingValue2:
    {
        ...Fonts.smBold,
        width: W * 0.33,
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: Spaces.sm
    },
    createdAt: {
        //position: 'absolute',
        bottom: -6,
        left: -5,
        color: Colors.gray,
        ...Fonts.vsm
    },
    modalContainer:
    {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.grayTransparent
    },
    ratingBox:
    {
        backgroundColor: Colors.white,
        padding: Spaces.lar,
        borderRadius: 8,
    },
    rateTextName:
    {
        textAlign: 'center'
    },
    replaceIcon:
    {
        height: 20,
        width: 20,
        marginLeft: 2
    },
    replaceContainer:
    {
        position: 'absolute',
        zIndex: 5,
        opacity: 0.3,
        bottom: 5,
        right: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    replaceText:
    {
        ...Fonts.vsm
    },
    light: {
        height: 30,
        width: 30,
    },
    blitzcareFlag:
    {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.selectedcolor,
        borderRadius: 8,
        padding: 1
    }
});

export default BookingCard;
