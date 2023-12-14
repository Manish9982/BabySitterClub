import { FlatList, Image, Modal, ScrollView, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, RadioButton, Text } from 'react-native-paper'
import { handleGetRequest } from '../helper/Utils'
import Colors from '../helper/Colors'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Fonts from '../helper/Fonts'
import Spaces from '../helper/Spaces'
import TextInputComponent from '../components/TextInputComponent'
import CustomButton from '../components/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const RapidSearch_Parent = ({ navigation }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

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

    const [addressdata, setAddressdata] = useState(null)
    const [loader, setLoader] = useState(true)
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [error, setError] = useState(false);
    const [services, setServices] = useState(null)
    const [baseUrl, setBaseUrl] = useState('')
    const [selectedService, setSelectedService] = useState(null)
    const [selectedDuration, setSelectedDuration] = useState(null)
    const [price, setPrice] = useState('')
    const [priceModalVisible, setPriceModalVisible] = useState(false)
    const [durationModalVisible, setDurationModalVisible] = useState(false)

    useEffect(() => {
        getAddress()
        getServices()
    }, [])

    const getServices = async () => {
        setLoader(true)
        const result = await handleGetRequest('get_services')
        console.log('result', result)
        setServices(result)
        setBaseUrl(result?.url)
        setLoader(false)
    }

    const getAddress = async () => {
        const result = await handleGetRequest('address_list')
        setAddressdata(result)
        console.log(result)
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

    const renderAddressItem = (item, index) => (
        <TouchableOpacity
            key={index}
            onPress={() => handleAddressSelection(item)}>
            <View style={styles.addressItem}>
                <RadioButton.Android
                    theme={{ colors: { accent: Colors.Secondary } }}
                    value={item}
                    status={selectedAddress && selectedAddress === item?.address ? 'checked' : 'unchecked'}
                    onPress={() => handleAddressSelection(item)}
                />
                <Text style={styles.addressText}>{item?.address}</Text>
            </View>
        </TouchableOpacity>
    );
    const renderDurationItem = (item, index) => (
        <TouchableOpacity
            style={styles.durationItem}
            key={index}
            onPress={() => handleDurationSelection(item)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton.Android
                    theme={{ colors: { accent: Colors.Secondary } }}
                    value={item}
                    status={selectedDuration && selectedDuration === item?.hours ? 'checked' : 'unchecked'}
                    onPress={() => handleDurationSelection(item)}
                />
                <Text>{item?.hours}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleServicePress = (service) => {
        console.log(service)
        setSelectedService(service)
    }

    const handleGoButton = () => {
        navigation.navigate('Radar_Parent')
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
    }

    const handleSetPriceButton = () => {
        setPriceModalVisible(prev => !prev)
    }


    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
        >
            <Modal
                transparent={true}
                visible={durationModalVisible}>
                <View style={styles.durationListOverlay}>
                    <View style={styles.durationList}>
                        {
                            duration?.map((item, index) => renderDurationItem(item, index))
                        }
                    </View>
                </View>
            </Modal>
            <Modal
                transparent={true}
                visible={priceModalVisible}>
                <View style={styles.priceModal}>
                    <View style={styles.popUp}>
                        <TextInputComponent
                            value={price}
                            onChangeText={handlePriceChange}
                            placeholder={'Enter Your Price Here($)'} />
                        <Text style={styles.warningText}>Price is not valid</Text>
                        <CustomButton
                            onPressButton={handleSetPriceButton}
                            title={'Set Price'} />
                    </View>
                </View>
            </Modal >
            <Text style={styles.heading}>Choose Address :</Text>
            {
                addressdata?.data?.map((item, index) => renderAddressItem(item, index))
            }
            <Text style={styles.heading}>Choose Service :</Text>
            <FlatList
                //columnWrapperStyle={styles.columnWrapperStyle}
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
                <Text style={styles.heading}>Price : </Text>
                <Button
                    style={styles.button}
                    onPress={handlePriceButtonPress}>{price == '' ? 'Enter Price' : `$ ${price}`}</Button>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.heading}>Comments : </Text>
                <TextInputComponent
                    multiline={true}
                    numberOflines={3}
                    style={styles.inputText} />
            </View>
            <TouchableOpacity
                style={styles.goButtonStyle}
                onPress={() => handleGoButton()}>
                <AntDesign name={'arrowright'} size={15} color={Colors.Secondary} />
            </TouchableOpacity>
            <Text style={styles.goText}>Request Sitters Now</Text>
        </KeyboardAwareScrollView  >
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
        width: W * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: H * 0.02,
        margin: W * 0.01
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
    selectedServiceListItem: {
        borderColor: Colors.DEEP_GRAY,
        backgroundColor: Colors.PRIMARY,
    },
    selectedItemText: {
        color: Colors.DEEP_GRAY,
    },
})