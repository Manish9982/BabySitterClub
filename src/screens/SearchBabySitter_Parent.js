
import { Alert, Modal, FlatList, ImageBackground, StyleSheet, TouchableOpacity, View, useWindowDimensions, Image } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { Button, Text } from 'react-native-paper'
import BabySitterCard from '../components/BabySitterCard';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';
import Loader from '../components/Loader';
import { convertTo12HourFormat, convertTo24HourFormat, formatDate, formatDate_mmddyyyy, handleGetRequest, handlePostRequest } from '../helper/Utils';
import { useIsFocused } from '@react-navigation/native';
import { DatePickerModal } from 'react-native-paper-dates';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'

const SearchBabySitter_Parent = ({ navigation }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    const defaultStartTime = new Date();
    const defaultEndTime = new Date(defaultStartTime.getTime() + 60 * 60 * 1000); // Adding 1 hour to start time

    const [startTime, setStartTime] = useState(defaultStartTime);
    const [endTime, setEndTime] = useState(defaultEndTime);
    const [filterdata, setFilterdata] = useState([])
    const [babySittersData, setBabySittersData] = useState(null)
    const [loader, setLoader] = useState(false)
    const [users, setUsers] = useState([])
    const [searchText, setSearchText] = useState("")
    const [open, setOpen] = useState(false);
    const [dates, setDates] = useState(null);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false)
    const [showEndTimePicker, setShowEndTimePicker] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [searchFormVisible, setSearchFormVisible] = useState(true)
    const [services, setServices] = useState([])
    const [baseUrl, setBaseUrl] = useState('')

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setModalVisible(false);
        // Do something with the selected option
        // For example, you can trigger an action or update state
    };

    const getServices = async () => {
        setLoader(true)
        const result = await handleGetRequest('get_services')
        console.log('result', result)
        setServices(result?.services)
        setBaseUrl(result?.url)
        setLoader(false)
    }

    const isFocused = useIsFocused()



    useEffect(() => {
        if (isFocused) {
            getServices()
        }
    }, [isFocused])

    const onDismiss = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirm = useCallback((params) => {
        console.log("Params", params)
        setOpen(false);
        setDates(params.dates);
        //getUsers(params.dates)
        console.log("params.dates", params.dates)
        console.log('[on-change-multi]', params);
    }, []);

    const handleStartTimeChange = (selectedTime) => {
        setShowStartTimePicker(false)
        setStartTime(selectedTime);
        //Ensure end time is always greater than start time
        if (endTime <= selectedTime) {
            const newEndTime = new Date(selectedTime);
            newEndTime.setHours(selectedTime.getHours() + 1); // Ensuring at least a minute difference
            setEndTime(newEndTime);
        }
    };

    const handleEndTimeChange = (selectedTime) => {
        setShowEndTimePicker(false)
        // Ensure end time is always greater than start time
        if (selectedTime <= startTime) {
            const newStartTime = new Date(selectedTime);
            newStartTime.setHours(selectedTime.getHours() - 1); // Ensuring at least a minute difference
            setStartTime(newStartTime);
        }
        setEndTime(selectedTime);
    };

    const getUsers = async (multiDate) => {
        if (true) {
            const datesToUse = multiDate === undefined ? dates : multiDate;
            const finalDate = datesToUse?.map(item => formatDate(item, true))
            console.log('multiDate', finalDate)
            setLoader(true)
            var formdata = new FormData()
            formdata.append('dates', finalDate?.join(','))
            formdata.append('start_time', convertTo24HourFormat(startTime))
            formdata.append('end_time', convertTo24HourFormat(endTime))
            formdata.append('services', `${selectedOption?.id}`)
            const result = await handlePostRequest('filter_users', formdata)
            console.log("result", result)
            if (result?.status == '200') {
                setBabySittersData(result)
                setUsers(result?.users)
            }
            else {
                setUsers([])
                Alert.alert("Info", result?.message)
            }
            setLoader(false)
        }
        else {
            //Alert.alert("Info", "Please choose a service first")
        }
    }

    const handleGoButton = () => {
        setSearchFormVisible(prev => !prev)
        getUsers()
    }

    const handleFavourite = async (Id) => {
        const formdata = new FormData()
        formdata.append('userId', Id)
        const result = await handlePostRequest('add_fav', formdata)
        if (result?.status == '200') {
            getUsers()
        } else if (result?.status == '201') {
            Alert.alert("Info", result?.message)
        }
    };

    const handleNavigation = (userid, roleid) => {
        navigation.navigate("ProfileOfSitterDuringBooking_Parent", { 'userID': userid, 'bookingDate': JSON.stringify(dates), 'startTime': JSON.stringify(startTime), 'endTime': JSON.stringify(endTime), 'service': selectedOption })
    }

    const throwChipSelection = (name) => {
        if (filterdata?.includes(name)) {
            return true
        }
    }

    const onPressChip = (name) => {
        if (filterdata?.includes(name)) {
            setFilterdata(prev => prev?.filter(item => item !== name))
        }
        else {
            setFilterdata(prev => [...prev, name])
        }
    }

    function haveCommonElements(arr1, arr2) {
        for (let i = 0; i < arr1?.length; i++) {
            for (let j = 0; j < arr2?.length; j++) {
                if (arr1[i] === arr2[j]) {
                    return true;
                }
            }
        }
        return false;
    }

    const renderBabysitterCard = ({ item }) => {
        if ((haveCommonElements(filterdata, item?.service) || filterdata?.length == 0) && (item?.name?.toLowerCase()?.includes(searchText?.toLowerCase()))) {
            return (
                <BabySitterCard
                    rating={item?.rating}
                    profilePicture={`${babySittersData?.url}${item?.profilePicture}`}
                    name={item?.name}
                    description={item?.description}
                    hourlyPrice={item?.hourlyPrice}
                    isFavourite={item?.isFavourite}
                    onPressFavourite={() => handleFavourite(item?.Id)}
                    onPressItemSelected={() => handleNavigation(item?.Id)}
                    serviceIds={item?.service_id}
                />
            )
        }
    }

    const returnTextForButton = () => {
        if (dates?.length == 1) {
            return `${formatDate_mmddyyyy(dates[0], true)}`
        }
        else if (dates?.length > 1) {
            return `${formatDate_mmddyyyy(dates[0], true)} (+ ${dates?.length - 1} more)`
        }
        else {
            return "Pick Dates"
        }
    }

    return (
        loader
            ?
            <Loader />
            :
            <ImageBackground
                source={require('../assets/images/background.png')}
                style={{ flex: 1 }}>
                <View style={styles.upperconatiner}>
                    <View style={styles.horizontal}>
                        <Text style={[styles.textQuery, Fonts.medMedium]}>Discover Your Perfect Sitter Today!</Text>
                        {
                            searchFormVisible
                                ?
                                <TouchableOpacity
                                    style={styles.findButtonStyle}
                                    onPress={() => setSearchFormVisible(prev => !prev)}>
                                    <AntDesign name={'caretup'} size={15} color={Colors.Secondary} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    style={styles.findButtonStyle}
                                    onPress={() => setSearchFormVisible(prev => !prev)}>
                                    <AntDesign name={'caretdown'} size={15} color={Colors.Secondary} />
                                </TouchableOpacity>
                        }

                    </View>
                    {/* <Text >Hello, James</Text> */}
                    {
                        searchFormVisible
                        &&
                        <View>
                            <Button style={styles.button} onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                                {
                                    returnTextForButton()
                                }
                                {/* {(range?.startDate && range?.endDate) ? `${formatDate_mmddyyyy(range.startDate, true)} - ${formatDate_mmddyyyy(range.endDate)}` : 'Pick Start and End Date'} */}
                            </Button>


                            <DatePickerModal
                                validRange={{ startDate: new Date() }}
                                locale="en"
                                mode="multiple"
                                visible={open}
                                onDismiss={onDismiss}
                                dates={dates}
                                onConfirm={onConfirm}
                            />

                            <View style={styles.durationContainer}>
                                <View style={styles.durationPicker}>
                                    <Text style={[styles.headingText, { marginBottom: Spaces.vsm }]}>Start Time</Text>

                                    {
                                        Platform.OS == "android"
                                        &&
                                        <TouchableOpacity
                                            style={styles.timetext}

                                            onPress={() => setShowStartTimePicker(prev => !prev)}>
                                            <Text
                                                numberOfLines={1}
                                                style={[Fonts.lar]}>{convertTo12HourFormat(convertTo24HourFormat(startTime))}</Text>
                                        </TouchableOpacity>
                                    }

                                    {
                                        Platform.OS == 'android'
                                            ?
                                            showStartTimePicker
                                            &&
                                            <DateTimePicker
                                                themeVariant='light'
                                                style={styles.timePicker}
                                                value={startTime}
                                                mode="time"
                                                onChange={(event, selectedTime) => handleStartTimeChange(selectedTime)}
                                            />
                                            :
                                            <DateTimePicker
                                                themeVariant='light'
                                                style={styles.timePicker}
                                                value={startTime}
                                                mode="time"
                                                onChange={(event, selectedTime) => handleStartTimeChange(selectedTime)}
                                            />
                                    }

                                </View>
                                <View style={styles.dashContainer}>
                                    <Text style={{ ...Fonts.larBold, alignSelf: 'center' }}>-</Text>
                                </View>
                                <View style={styles.durationPicker}>
                                    <Text style={[styles.headingText, { marginBottom: Spaces.vsm }]}>End Time</Text>

                                    {
                                        Platform.OS == "android"
                                        &&
                                        <TouchableOpacity
                                            style={[styles.timetext]}
                                            onPress={() => setShowEndTimePicker(prev => !prev)}>
                                            <Text
                                                numberOfLines={1}
                                                style={[Fonts.lar]}>{convertTo12HourFormat(convertTo24HourFormat(endTime))}</Text>
                                        </TouchableOpacity>
                                    }

                                    {
                                        Platform.OS == 'android'
                                            ?
                                            showEndTimePicker
                                            &&
                                            <DateTimePicker
                                                minimumDate={new Date(startTime)}
                                                themeVariant='light'
                                                style={styles.timePicker}
                                                value={endTime}
                                                mode="time"
                                                onChange={(event, selectedTime) => handleEndTimeChange(selectedTime)}
                                            />
                                            :
                                            <DateTimePicker
                                                minimumDate={new Date(startTime)}
                                                themeVariant='light'
                                                style={styles.timePicker}
                                                value={endTime}
                                                mode="time"
                                                onChange={(event, selectedTime) => handleEndTimeChange(selectedTime)}
                                            />
                                    }

                                </View>
                            </View>
                            <Text style={[styles.services, Fonts.medMedium]}>Choose Service</Text>
                            <Button style={styles.button} onPress={() => setModalVisible(true)} uppercase={false} mode="outlined">
                                {selectedOption?.service_name || "Pick a service"}
                                {/* {(range?.startDate && range?.endDate) ? `${formatDate_mmddyyyy(range.startDate, true)} - ${formatDate_mmddyyyy(range.endDate)}` : 'Pick Start and End Date'} */}
                            </Button>
                            <TouchableOpacity
                                style={styles.goButtonStyle}
                                onPress={() => handleGoButton()}>
                                <AntDesign name={'arrowright'} size={15} color={Colors.Secondary} />
                            </TouchableOpacity>
                            <Text style={styles.goText}>Let's Go!</Text>
                        </View>
                    }

                    {/* modal container */}
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={styles.selectButton}>Select an Option</Text>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            visible={modalVisible}
                            onDismiss={() => setModalVisible(false)}
                        >
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.modal}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.heading}>Select a service:</Text>
                                    {services.map((option, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.optionButton}
                                            onPress={() => handleOptionSelect(option)}
                                        >
                                            <Text style={{}}>{option?.service_name}</Text>
                                            <Image
                                                style={styles.imageOptions}
                                                source={{ uri: `${baseUrl}${option?.picture}` }}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </TouchableOpacity>

                        </Modal>
                    </View>

                </View>
                {
                    babySittersData
                        ?
                        (
                            babySittersData?.users?.length == 0
                                ?
                                <Text style={[styles.nothingToShow, { marginTop: searchFormVisible ? H * 0.2 : H * 0.33 }]}>
                                    <Text style={styles.nothingToShow}>{babySittersData?.alert} </Text>
                                    <Text onPress={() => setSearchFormVisible(prev => !prev)} style={styles.hyperlink}>{babySittersData?.hyperlink}</Text>
                                    <Text style={styles.nothingToShow}> {babySittersData?.alert2}</Text>
                                </Text>
                                :
                                <FlatList
                                    data={users}
                                    renderItem={renderBabysitterCard}
                                    keyExtractor={(item) => item.Id}
                                />
                        )
                        :
                        <Text style={[styles.nothingToShow, { marginTop: searchFormVisible ? H * 0.2 : H * 0.33 }]}>Explore Top Sitters Here!</Text>

                }

            </ImageBackground>
    );
};

export default SearchBabySitter_Parent

const makeStyles = (H, W) => StyleSheet.create({

    upperconatiner: {
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY,
        alignItems: 'center',
        padding: Spaces.vsm,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        paddingBottom: Spaces.med,
    },
    uppercontainer2: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: Spaces.sm,

    },
    searchBar:
    {
        width: W * 0.9,
        height: H * 0.07,
        marginVertical: Spaces.sm
    },
    filterBox:
    {
        borderWidth: 0.6,
        borderColor: Colors.buttoncolor,
        alignSelf: 'flex-end',
        margin: Spaces.sm,
        padding: Spaces.sm,
        borderRadius: 8,
        backgroundColor: Colors.white,
    },
    text:
    {
        ...Fonts.medBold
    },
    nothingToShow:
    {
        alignSelf: 'center',
        textAlign: 'center',
        marginHorizontal: W * 0.05,
    },
    horizontal:
    {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    textQuery:
    {
        marginTop: Spaces.sm,
        color: Colors.black
    },
    datePicker:
    {
        marginBottom: Spaces.sm
    },
    chip:
    {
        // margin:5
    },
    button:
    {
        backgroundColor: Colors.white
    },
    durationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: Spaces.vsm,
        borderWidth: 0.6,
        padding: Spaces.vsm,
        borderRadius: 8,
        borderColor: Colors.PRIMARY
    },
    durationPicker: {
        //backgroundColor: Colors.PRIMARY,
        borderRadius: 8,
        alignItems: "center"
    },
    dashContainer:
    {
        justifyContent: 'center',
        // marginTop:H*0.017,
        width: W * 0.3
    },
    timetext: {
        borderColor: Colors.LIGHT_SILVER,
        backgroundColor: Colors.LIGHT_SILVER,
        borderWidth: 1,
        //width: W * 0.25,
        borderRadius: 5,
        marginHorizontal: W * 0.03,
        textAlign: 'center',
        alignItems: 'center',
        paddingHorizontal: Spaces.sm,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectButton: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '80%',
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spaces.sm,
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        paddingHorizontal: Spaces.sm,
    },
    optionText: {
        fontSize: 16,
    },
    selectedOptionText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    findButtonStyle:
    {
        backgroundColor: Colors.DEEP_GRAY,
        borderRadius: 20 / 2,
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: W * 0.02
    },
    goButtonStyle:
    {
        backgroundColor: Colors.DEEP_GRAY,
        borderRadius: 40 / 2,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Spaces.sm,
        alignSelf: 'center'
    },
    heading:
    {
        ...Fonts.larSemiBold,
        alignSelf: 'center',
        marginVertical: H * 0.02

    },
    imageOptions:
    {
        height: 20,
        width: 20,
        marginHorizontal: W * 0.02
    },
    services:
    {
        alignSelf: 'center',
        marginVertical: Spaces.vsm
    },
    goText: {
        alignSelf: 'center'
    },
    hyperlink:
    {
        color: Colors.Secondary,
        textDecorationLine: 'underline'
    }
})
