import { Alert, FlatList, Image, ImageBackground, Modal, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Text } from 'react-native-paper'
import { Regexes, handleGetRequest, handlePostRequest } from '../helper/Utils'
import Colors from '../helper/Colors'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Fonts from '../helper/Fonts'
import Spaces from '../helper/Spaces'
import TextInputComponent from '../components/TextInputComponent'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import CustomButton from '../components/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import { setDefaultAdress, setDefaultAdressModalVisible, setIsRequestActive } from '../redux/GlobalSlice'
import RenderOptions from '../components/RenderOptions'
import Loader from '../components/Loader'
import { useIsFocused } from '@react-navigation/native'
import { addEvent } from '../helper/CalendarEvent'

const duration = [
    // {
    //     hours: '1 Hr',
    // },
    // {
    //     hours: '2 Hrs',
    // },
    // {
    //     hours: '3 Hrs',
    // },
    {
        hours: '4 Hrs',
    },
    {
        hours: '5 Hrs',
    },
    {
        hours: '6 Hrs',
    },
    {
        hours: '7 Hrs',
    },
    {
        hours: '8 Hrs',
    },
    {
        hours: '9 Hrs',
    },
]

const RapidSearch_Parent = ({ navigation }) => {
    const [addressdata, setAddressdata] = useState(null)
    const [loader, setLoader] = useState(true)
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [error, setError] = useState(false);
    const [services, setServices] = useState(null)
    const [baseUrl, setBaseUrl] = useState('')
    const [selectedService, setSelectedService] = useState(null)
    const [selectedDuration, setSelectedDuration] = useState('4 Hrs')
    const [price, setPrice] = useState('')
    const [priceModalVisible, setPriceModalVisible] = useState(false)
    const [durationModalVisible, setDurationModalVisible] = useState(false)
    const [addresses, setAddresses] = useState([])
    const [showWarning, setShowWarning] = useState(true)
    const [comments, setComments] = useState('')
    const isFocused = useIsFocused()
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const dispatch = useDispatch()
    const defaultAdressModalVisible = useSelector((state) => state.global.defaultAdressModalVisible)

    useEffect(() => {
        getAddress()
        getServices()
        addEvent()
    }, [])
    useEffect(() => {
        if (isFocused) {
            getStatusForActiveRequest()
        }
    }, [isFocused])

    const styles = makeStyles(H, W)

    const getServices = async () => {
        setLoader(true)
        const result = await handleGetRequest('get_services')
        console.log('result', result)
        setServices(result)
        setSelectedService(result?.services[0])
        setBaseUrl(result?.url)
        setLoader(false)
    }

    const getAddress = async () => {
        const result = await handleGetRequest('address_get')
        setAddresses(result?.data)
        setSelectedAddress(result?.data[0])
        dispatch(setDefaultAdress(result?.data[0]))
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
        }
        else {
            Alert.alert('Info', result?.message)
        }
        setLoader(false)
    }

    const handleAddressSelection = (address) => {
        setSelectedAddress(address?.address);
        setError(false);
    };
    const handleDurationSelection = (duration) => {
        setSelectedDuration(duration?.hours);
        setDurationModalVisible(prev => !prev)
    };

    const onCloseDurationModal = () => {
        setDurationModalVisible(prev => !prev)
    }

    const renderAddressItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => onPressAddressItem(item)}
                style={styles.addressItem}>
                <View style={styles.addressDetails}>
                    <Text>
                        <Ionicons name="location-outline" size={Spaces.lar} color={Colors.Secondary} />
                        <Text style={styles.title}> {item.title}</Text>
                        {
                            item?.default == 1
                            &&
                            <Text> (Primary)  <AntDesign name='checkcircle' size={Spaces.xl} color={Colors.MUTED_GREEN} /></Text>
                        }

                    </Text>
                    <Text>{item.address}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // const renderAddressItem = (item, index) => (
    //     <TouchableOpacity
    //         key={index}
    //         onPress={() => handleAddressSelection(item)}>
    //         <View style={styles.addressItem}>
    //             <Checkbox.Android
    //                 theme={{ colors: { accent: Colors.Secondary } }}
    //                 value={item}
    //                 status={selectedAddress && selectedAddress === item?.address ? 'checked' : 'unchecked'}
    //                 onPress={() => handleAddressSelection(item)}
    //             />
    //             <Text style={styles.addressText}>{item?.address}</Text>
    //         </View>
    //     </TouchableOpacity>
    // );
    const renderDurationItem = ({ item, index }) => (
        <TouchableOpacity
            style={styles.durationItem}
            key={index}
        //onPress={() => handleDurationSelection(item)}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox.Android
                    theme={{ colors: { accent: Colors.Secondary } }}
                    value={item}
                    status={selectedDuration && selectedDuration === item?.hours ? 'checked' : 'unchecked'}
                    onPress={() => handleDurationSelection(item)}
                />
                <Text>{item?.hours}</Text>
            </View>
        </TouchableOpacity>
    );

    const onClose = () => {
        dispatch(setDefaultAdressModalVisible(false))
    }

    const updateAddress = async (ID) => {
        setLoader(true)
        var formdata = new FormData()
        formdata.append('address_id', ID)
        const result = await handlePostRequest('make_address_default', formdata)
        console.log("result", result)
        if (result?.status == '200') {
            getAddress()
        }
        else {
            Alert.alert("Info", result?.message)
        }
        setLoader(false)
    }

    const handleServicePress = (service) => {
        console.log(service)
        setSelectedService(service)
    }

    const handleGoButton = async () => {
        //Hit API for generating Request and after 200 response navigate
        setLoader(true)
        var formdata = new FormData()
        formdata.append('service', selectedService?.id)
        formdata.append('price', price)
        formdata.append('duration', Number.parseInt(selectedDuration, 10))
        formdata.append('comment', comments)
        const result = await handlePostRequest('rapid_request', formdata)
        if (result?.status == '200') {
            dispatch(setIsRequestActive(true))
        }
        else {
            Alert.alert('Info', result?.message)
        }
        setLoader(false)
    }

    const renderServices = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => handleServicePress(item)}
                style={[
                    styles.serviceListItem,
                    selectedService?.service_name == item?.service_name && styles.selectedServiceListItem,
                ]}>
                <Image
                    style={[styles.imageOptions, { tintColor: selectedService?.service_name == item?.service_name ? Colors.DEEP_GRAY : Colors.DEEP_GRAY }]}
                    source={{ uri: `${baseUrl}${item?.picture}` }}
                />
                <Text style={[styles.itemText, selectedService?.service_name == item?.service_name && styles.selectedItemText]}>
                    {item?.service_name}
                </Text>
                {
                    selectedService?.service_name == item?.service_name
                    &&
                    <View style={styles.checkIconBox}>
                        <AntDesign name='checkcircle' size={Spaces.xl} color={Colors.MUTED_GREEN} />
                    </View>
                }
            </TouchableOpacity>
        )
    }

    const handleDurationButtonPress = () => {
        setDurationModalVisible(prev => !prev)
    }

    const handlePriceButtonPress = () => {
        setPriceModalVisible(prev => !prev)
    }

    const handlePriceChange = (t) => {
        setPrice(t)
        if (Regexes.PRICE_REGEX.test(t)) {
            setShowWarning(false)
        }
        else {
            setShowWarning(true)
        }
    }

    const handleSetPriceButton = () => {
        setPriceModalVisible(prev => !prev)
    }

    const onPressAddressItem = (address) => {
        dispatch(setDefaultAdressModalVisible(false))
        updateAddress(address?.id)
    }

    const onClosePrice = () => {
        setPriceModalVisible(prev => !prev)
    }

    return (
        loader
            ?
            <Loader />
            :
            <ImageBackground
                style={styles.primaryContainer}
                source={require('../assets/images/background.png')}>


                <KeyboardAwareScrollView
                    contentContainerStyle={styles.container}
                >
                    {/* <Modal
                    transparent={true}
                    visible={durationModalVisible}>
                    <View style={styles.durationListOverlay}>
                        <View style={styles.durationList}>
                            {
                                duration?.map((item, index) => renderDurationItem(item, index))
                            }
                        </View>
                    </View>
                </Modal> */}
                    <RenderOptions
                        renderItem={renderDurationItem}
                        data={duration}
                        visible={durationModalVisible}
                        onClose={onCloseDurationModal}
                        onValueChange={handleDurationSelection}
                    />
                    <Modal
                        transparent={true}
                        visible={priceModalVisible}>
                        <TouchableWithoutFeedback onPress={onClosePrice}>
                            <View style={styles.priceModal}>
                                <TouchableWithoutFeedback>
                                    <View style={styles.popUp}>
                                        <TouchableOpacity onPress={onClosePrice} style={styles.closeButton}>
                                            <Text style={styles.closeButtonText}><AntDesign name={"close"} size={18} color="red" /></Text>
                                        </TouchableOpacity>
                                        <TextInputComponent
                                            value={price}
                                            onChangeText={handlePriceChange}
                                            placeholder={'Enter Your Price Here($)'} />
                                        {
                                            showWarning
                                            &&
                                            <Text style={styles.warningText}>Price is not valid</Text>
                                        }

                                        <CustomButton
                                            disabled={showWarning}
                                            //btnColor={showWarning ? 'gray' : null}
                                            onPressButton={handleSetPriceButton}
                                            title={'Set Price'} />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal >
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={defaultAdressModalVisible}
                        onRequestClose={onClose}
                    >
                        <View style={styles.modal}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalHeading}>Choose Address</Text>
                                <FlatList
                                    data={addresses}
                                    renderItem={renderAddressItem}
                                    keyExtractor={(item, index) => `${index}`}
                                />
                                {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                        <Text style={styles.closeText}>Close</Text>
                                    </TouchableOpacity> */}
                            </View>
                        </View>
                    </Modal>
                    {/* <Text style={styles.heading}>Choose Address :</Text>
            {
                addressdata?.data?.map((item, index) => renderAddressItem(item, index))
            } */}
                    <Text style={styles.heading}>Choose Service :</Text>
                    <FlatList
                        //columnWrapperStyle={styles.columnWrapperStyle}
                        removeClippedSubviews={false}
                        contentContainerStyle={styles.flatlist}
                        showsHorizontalScrollIndicator={true}
                        alwaysBounceHorizontal
                        persistentScrollbar={true}
                        horizontal={true}
                        data={services?.services}
                        renderItem={renderServices}
                        keyExtractor={(item, index) => `${index}`}
                    />
                    <Text style={styles.warningText}>
                        Service Starts Immediately Within Next 1 Hr
                    </Text>
                    <View style={styles.horizontal}>
                        <Text style={styles.heading}>Duration : </Text>
                        <Button
                            style={styles.button}
                            onPress={handleDurationButtonPress}>{selectedDuration || 'Choose Duration'}</Button>
                    </View>
                    <View style={styles.horizontal}>
                        <Text style={styles.heading}>Hourly Price($) : </Text>
                        <Button
                            style={styles.button}
                            onPress={handlePriceButtonPress}>{price == '' ? 'Enter Hourly Price' : `$ ${price}`}</Button>
                    </View>
                    <View style={styles.horizontal}>
                        <Text style={styles.heading}>Comments : </Text>
                        <TextInputComponent
                            value={comments}
                            onChangeText={setComments}
                            multiline={true}
                            numberOflines={3}
                            maxlength={400}
                            style={styles.inputText} />
                        <Text style={styles.guidingText}>Feel free to include specific requests for sitters in the comments. You can mention the number of children, your pet's breed, or provide directions to your location if needed.</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.goButtonStyle}
                        onPress={() => handleGoButton()}>
                        <AntDesign name={'arrowright'} size={15} color={Colors.Secondary} />
                    </TouchableOpacity>
                    <Text style={styles.goText}>Request Sitters Now</Text>
                </KeyboardAwareScrollView  >
            </ImageBackground>
    )
}

export default RapidSearch_Parent

const makeStyles = (H, W) => StyleSheet.create({
    imageOptions:
    {
        height: 20,
        width: 20,
        alignSelf: 'center',
        //tintColor: Colors.Secondary,
    },
    serviceListItem:
    {
        //borderColor: Colors.Secondary,
        borderWidth: 2,
        borderRadius: 8,
        //backgroundColor: Colors.DEEP_GRAY,
        width: W * 0.28,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: H * 0.02,
        margin: W * 0.01,
        height: H * 0.1,
    },
    selectedServiceListItem: {
        borderColor: Colors.DEEP_GRAY,
        backgroundColor: Colors.PRIMARY,
    },
    itemText:
    {
        //color: Colors.Secondary
    },
    columnWrapperStyle:
    {
        justifyContent: 'space-evenly'
    },
    goText: {
        alignSelf: 'center'
    },
    goButtonStyle:
    {
        backgroundColor: Colors.DEEP_GRAY,
        borderRadius: 60 / 2,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Spaces.sm,
        alignSelf: 'center'
    },
    heading:
    {
        ...Fonts.larBold,
        margin: Spaces.sm,
        flex: 1
    },
    durationListOverlay:
    {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    durationList:
    {
        backgroundColor: Colors.white,
        padding: Spaces.xxl,
        borderRadius: 8,
    },
    durationItem:
    {

    },
    contentContainerStyle:
    {

    },
    button: {
        borderColor: Colors.Secondary,
        borderWidth: 1,
        flex: 1,
        marginRight: Spaces.med,
        alignSelf: 'flex-start'
    },
    horizontal:
    {
        // flexDirection: 'row',
        // alignItems: 'center',
        // marginVertical: Spaces.vsm,
        // width: W
    },
    warningText:
    {
        color: 'red',
        alignSelf: 'center',
        marginVertical: H * 0.01
    },
    inputText:
    {

    },
    priceModal:
    {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popUp:
    {
        width: W * 0.9,
        padding: Spaces.med,
        backgroundColor: Colors.white,
        // borderBottomLeftRadius: 8,
        // borderBottomRightRadius: 8,
        borderRadius: 8,
    },
    container: {
        paddingHorizontal: Spaces.med,
        paddingVertical: Spaces.lg,
    },
    primaryContainer:
    {
        flex: 1
    },
    // Add styles for clearer address items
    addressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Spaces.sm,
    },
    addressText: {
        marginLeft: Spaces.sm,
        fontSize: Fonts.med.fontSize,
        color: Colors.black,
    },
    // Update service list item styles for better selection indication
    selectedItemText: {
        color: Colors.DEEP_GRAY,
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalContainer: {
        backgroundColor: Colors.white,
        width: W * 0.8,
        borderRadius: 8,
        padding: Spaces.med
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: 20,
    },
    modalHeading:
    {
        ...Fonts.medBold,
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    checkIconBox:
    {
        position: 'absolute',
        right: 1,
        top: 1,
    },
    flatlist:
    {
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spaces.med
    },
    guidingText: {
        ...Fonts.sm,
        color: Colors.gray,
        margin: Spaces.sm,
        marginTop: 0,
    },
    closeButton: {
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'red'
    },

})