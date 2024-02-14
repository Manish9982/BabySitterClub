
import { Alert, Modal, FlatList, ImageBackground, StyleSheet, TouchableOpacity, View, useWindowDimensions, Image } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { Button, Searchbar, Text, TextInput } from 'react-native-paper'
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
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultAdress, setDefaultAdressModalVisible } from '../redux/GlobalSlice';
import RenderOptions from '../components/RenderOptions';
import CustomButton from '../components/Button';

//Home
const DATA = {
    'status': '200',
    'data':
    {
        user_stats:
        {
            my_sitters: "8",
            my_friends: "3",
            friends_sitters: "51",
        },
        friends_favorite: {
            title: `Your Friends' Favorite Sitters`,
            data: [
                { id: '1', name: 'Item 1', profile_image: 'https://images.pexels.com/photos/19947356/pexels-photo-19947356/free-photo-of-man-holding-baby-boy-and-vintage-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
                { id: '2', name: 'Item 2', profile_image: 'https://images.pexels.com/photos/8910045/pexels-photo-8910045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
                // Add more items as needed
            ],
        },
        favorite: {
            title: `Your Favorite Sitters`,
            data: [
                { id: '1', name: 'Item 1', profile_image: 'https://images.pexels.com/photos/19947356/pexels-photo-19947356/free-photo-of-man-holding-baby-boy-and-vintage-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
                { id: '2', name: 'Item 2', profile_image: 'https://images.pexels.com/photos/8910045/pexels-photo-8910045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
                // Add more items as needed
            ],
        },
    }


}

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
    const [selectedAddress, setSelectedAddress] = useState('')
    const [addresses, setAddresses] = useState([])
    const [dashboardApiData, setDashboardApiData] = useState(null)

    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            getDashboardData()
            getAddress()
        }
    }, [isFocused])

    const defaultAdressModalVisible = useSelector((state) => state.global.defaultAdressModalVisible)
    const defaultAddress = useSelector((state) => state.global.defaultAddress)

    const getDashboardData = async () => {
        const result = await handleGetRequest('new_dashboard')
        if (result?.status == '200') {
            setDashboardApiData(result)
        }
        else {
            Alert.alert(result?.msg_title, result?.msg_body)
        }
    }

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setModalVisible(false);
        // Do something with the selected option
        // For example, you can trigger an action or update state
    };

    const onClose = () => {
        dispatch(setDefaultAdressModalVisible(false))
    }

    const getServices = async () => {
        setLoader(true)
        const result = await handleGetRequest('get_services')
        console.log('result', result)
        setServices(result?.services)
        setSelectedOption(result?.services[0])
        setBaseUrl(result?.url)
        setLoader(false)
    }
    const getAddress = async () => {
        setLoader(true)
        const result = await handleGetRequest('address_get')
        console.log('result', result)
        if (result?.status == '200') {
            setAddresses(result?.data)
            setSelectedAddress(result?.data[0])
            dispatch(setDefaultAdress(result?.data[0]))
            //dispatch(setDefaultAdress("hello"))
            console.log("result?.data[0]", result?.data[0])
        }
        else {
            Alert.alert(result?.message)
        }
        setLoader(false)
    }

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

    const renderItem1 = ({ item }) => (
        <TouchableOpacity
        onPress={onPressFriendsFavSitter}
        style={{}}>
            <Image source={{ uri: item?.profile }}
                style={styles.profilePic}
            />
        </TouchableOpacity>
    );

    const renderItem2 = ({ item }) => (
        <TouchableOpacity 
        onPress={onPressFavSitters}
        style={{}}>
            <Image source={{ uri: item?.profile }}
                style={styles.profilePic}
            />
        </TouchableOpacity>
    );

    const renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
            <TouchableOpacity>
                <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
        </View>
    );

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

    const onPressAddressItem = (address) => {
        dispatch(setDefaultAdressModalVisible(false))
        updateAddress(address?.id)
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

    const onPressFriendsFavSitterAll = () => {
        navigation.navigate('ProfileOfSitterDuringBooking_Parent')
    }

    const onPressFavSittersAll = () => {
        navigation.navigate('ProfileOfSitterDuringBooking_Parent')
    }
    const onPressFriendsFavSitter = () => {
        navigation.navigate('ProfileOfSitterDuringBooking_Parent')
    }

    const onPressFavSitters = () => {
        navigation.navigate('ProfileOfSitterDuringBooking_Parent')
    }
    const onFocusSearch = () => {
        navigation.navigate('SearchScreen_Parent')
    }

    const onPressMySitters = () => {
        navigation.navigate('Favourite_Parent')
    }

    const onPressMyFriends = () => {
        navigation.navigate('MyFriends_Parent')
    }
    const onPressRequestSitter = () => {
        navigation.navigate('RequestSitter_Parent')
    }
    const onPressFriendsSitter = () => {
        navigation.navigate('FriendsSittersListing_Parent')
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
    console.log('dashboardApiData?.data?.favorite?.data?.length', dashboardApiData?.data?.favorite?.data)
    return (
        loader
            ?
            <Loader />
            :
            <ImageBackground
                source={require('../assets/images/background.png')}
                style={{ flex: 1, }}>
                <View style={{}}>
                    <Searchbar
                        onFocus={onFocusSearch}
                        onPressIn={onFocusSearch}
                        style={styles.searchBar}
                        placeholder='Search for friends or sitters.. '
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <RenderOptions
                        renderItem={renderAddressItem}
                        data={addresses}
                        visible={defaultAdressModalVisible}
                        onClose={onClose}
                        onValueChange={onPressAddressItem}
                    />
                    <View style={styles.statsTableContainer}>
                        <TouchableOpacity
                            onPress={onPressMySitters}
                            style={styles.statsTableBlock}>
                            <Text style={styles.infoText}>{dashboardApiData?.data?.user_stats?.my_sitters}</Text>
                            <Text>My Sitters</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onPressMyFriends}
                            style={styles.statsTableBlock}>
                            <Text style={styles.infoText}>{dashboardApiData?.data?.user_stats?.my_friends}</Text>
                            <Text>My Friends</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onPressFriendsSitter}
                            style={styles.statsTableBlock}>
                            <Text style={styles.infoText}>{dashboardApiData?.data?.user_stats?.friends_sitters}</Text>
                            <Text>Friends' Sitters</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        dashboardApiData?.data?.friends_favorite?.data?.length == 0
                            ?
                            null
                            :
                            <View>
                                <View style={styles.viewAllContainer}>
                                    <Text>{dashboardApiData?.data?.friends_favorite?.title}</Text>
                                    <Text
                                        onPress={onPressFriendsFavSitterAll}
                                        style={styles.viewAllText}>View All</Text>
                                </View>
                                <FlatList
                                    horizontal
                                    data={dashboardApiData?.data?.friends_favorite?.data}
                                    keyExtractor={(item, index) => `${index}`}
                                    renderItem={renderItem1}
                                />
                            </View>
                    }

                    {
                        dashboardApiData?.data?.favorite?.data?.length == 0
                            ?
                            null
                            :
                            <View>
                                <View style={styles.viewAllContainer}>
                                    <Text>{dashboardApiData?.data?.favorite?.title}</Text>
                                    <Text
                                        onPress={onPressFavSittersAll}
                                        style={styles.viewAllText}>View All</Text>
                                </View>
                                <FlatList
                                    horizontal
                                    data={dashboardApiData?.data?.favorite?.data}
                                    keyExtractor={(item, index) => `${index}`}
                                    renderItem={renderItem2}
                                />
                            </View>
                    }
                </View>
                <CustomButton
                    title={"Request Sitter"}
                    onPressButton={onPressRequestSitter}
                    style={styles.customButton}
                />
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
    addressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },

    addressDetails: {

    },
    title: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    closeText: {
        color: 'white',
        textAlign: 'center',
    },
    modalHeading:
    {
        ...Fonts.medBold,
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    searchBar: {
        margin: Spaces.med
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    listHeader: {
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    viewAllButton: {
        color: 'blue',
    },
    itemContainer: {

    },
    profilePic:
    {
        height: 70,
        aspectRatio: 1,
        borderRadius: 70 / 2,
        margin: Spaces.sm
    },
    viewAllContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: Spaces.med
    },
    viewAllText:
    {
        color: Colors.Secondary,
        textDecorationLine: 'underline',
    },
    customButton:
    {
        bottom: 0,
        position: 'absolute'
    },
    statsTableContainer:
    {
        flexDirection: 'row',
        width: W,
    },
    statsTableBlock:
    {
        height: 66,
        width: W / 3,
        borderWidth: 0.5,
        borderColor: Colors.gray,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    infoText:
    {
        color: Colors.Secondary,
        ...Fonts.xlSemiBold
    },
    locationBox:
    {
        borderWidth: 1,
        borderRadius: 8,
        padding: Spaces.sm,
        margin: Spaces.sm,
        justifyContent: 'center',
        //alignItems:'center'
    },
    locationText:
    {
        maxWidth: W * 0.35,
    },
})
