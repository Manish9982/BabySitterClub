import React, { useState, useEffect } from 'react';
import { Image, Platform, Alert, StyleSheet, View, TouchableOpacity, Modal, useWindowDimensions, TouchableWithoutFeedback, ScrollView, FlatList } from 'react-native';
import { Text, SegmentedButtons } from 'react-native-paper';
import TextInputComponent from '../components/TextInputComponent';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Shadows, convertTimeRangeTo12HourFormat, convertTo12HourFormat, formatDateProfilePageDate, handleGetRequest, handlePostRequest } from '../helper/Utils';
import CustomButton from '../components/Button';
// import { launchImageLibrary } from 'react-native-image-picker';
import Loader from '../components/Loader';
import CloseButton from '../components/CloseButton';
import { useIsFocused } from '@react-navigation/native';
import TagIcon from '../components/TagIcon';
import { setIsProfileCompleted } from '../redux/GlobalSlice';
import { useDispatch } from 'react-redux';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import ImageCropPicker from 'react-native-image-crop-picker';
import { logout } from '../redux/AuthSlice';


const MyProfile_Sitter = ({ navigation }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    const [userdata, setUserdata] = useState(null)
    const [loader, setLoader] = useState(true)
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [about, setAbout] = useState('')
    const [address, setAddress] = useState('')
    const [dob, setDob] = useState('')
    const [children, setChildren] = useState('')
    const [image, setImage] = useState(null)
    const [loaderButton, setLoaderButton] = useState(false)
    const [serviceFilterId, setServiceFilterId] = useState(null);
    const [slots, setSlots] = useState([])

    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isFocused) {
            getSlots()
        }
    }, [isFocused])

    useEffect(() => {
        getUserProfileData()
    }, [])



    const onPressButton = () => {
        updateUserProfileData()
    }

    const getSlots = async () => {
        const result = await handleGetRequest('get_slot')
        if (result?.status == '200') {
            setSlots(result?.userSlots)
        }
    }

    const pickImage = async () => {
        try {

            const image = await ImageCropPicker.openPicker({
                //multiple: true
                //width: 300,
                //height: 400,
                compressImageQuality: 0.4,
                cropping: true
            })
            setImage({
                uri: image?.path,
                name: Platform.OS == 'android' ? image?.modificationDate : image?.filename,
                type: image?.mime
            })
            console.log("Image", image)
        } catch (error) {
            Alert.alert(error?.message)
        }
        // ImagePicker.openCropper({
        //     width: 300,
        //     height: 400,
        //     cropping: true,
        //   }).then(image => {
        //     console.log(image);
        //   });
    }

    const toggleModal = (slots) => {
        // getSlots()
        // setShowSlots(prev => !prev)
        navigation.navigate('AddAvailability_Sitter')
    }

    const updateUserProfileData = async () => {
        setLoaderButton(true)
        var formdata = new FormData()
        //  formdata.append('service_id', route?.params?.services?.id);
        formdata.append('firstName', name);
        formdata.append('lastName', lastname);
        // formdata.append('hourPrice', price);
        formdata.append('noOfChildren', children);
        formdata.append('comfirtableWith', "Cooking");
        formdata.append('experience', "I smoke");
        formdata.append('address', address);
        formdata.append('dob', "2000-01-10");
        formdata.append('description', about);
        {
            image &&
                formdata.append('picture', image);
        }
        const result = await handlePostRequest('profile_update', formdata)
        if (result?.status == '200') {
            Alert.alert("Success", result?.message)
            dispatch(setIsProfileCompleted(true))
        } else {
            Alert.alert("Error", result?.message)
        }
        setLoaderButton(false)
    }

    const getUserProfileData = async () => {
        const result = await handleGetRequest('profile')
        if (result?.status == '200') {
            setName(result?.userDetails?.first_name)
            setLastName(result?.userDetails?.last_name)
            setAbout(result?.userDetails?.description)
            setAddress(result?.userDetails?.address)
            setChildren(JSON.stringify(result?.userDetails?.no_of_children))
            //setPrice(JSON.stringify(result?.userDetails?.hour_price))
            //setImage({ uri: `${result?.url}${result?.userDetails?.picture}` })
            setUserdata(result)
        }

        console.log("RESULT==========>", result)
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
                <CloseButton id={item?.id} callBack={getSlots} /></> : <Text>Booked</Text>}
        </View>
    );

    const onPressLogoutButton = () => {

        Alert.alert('Logout', 'Are you sure you want to logout?', [
            {
                text: 'Yes',
                onPress: () => dispatch(logout())
            },
            {
                text: 'No'
            }
        ])
    }

    console.log('image displayed at profile====>', image?.uri)
    return (
        loader
            ?
            <Loader />
            :
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                style={styles.container}>
                <Text style={styles.sectionHeader}>Profile Photo</Text>
                <TouchableOpacity
                    onPress={onPressLogoutButton}
                    style={styles.logoutIconContainer}>
                    <Image source={require('../assets/images/logout.png')}
                        style={styles.logoutIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={pickImage}
                    style={styles.profilePictureContainer}>
                    {/* <View style={styles.profilePicturePlaceholder} /> */}
                    <Image defaultSource={require('../assets/images/profile-user.png')}
                        //source={require('../assets/images/profile-user.png')}
                        source={{ uri: image?.uri || `${userdata?.url}${userdata?.userDetails?.picture}` }}
                        style={styles.profilePicturePlaceholder}
                    />
                </TouchableOpacity>
                <View style={styles.availabilityContainer}></View>
                <TextInputComponent
                    placeholder={"First Name"}
                    value={name}
                    onChangeText={(text) => {
                        setName(text)
                    }}
                    style={styles.input} />

                <TextInputComponent
                    placeholder={"Last Name"}
                    value={lastname}
                    onChangeText={(text) => {
                        setLastName(text)
                    }}
                    style={styles.input} />

                <Text style={styles.sectionHeader}>About Me</Text>

                <Text style={styles.description}>
                    Tell a little about yourself, so families can get to know you.
                </Text>
                <TextInputComponent
                    value={about}
                    multiline={true}
                    onChangeText={(text) => {
                        setAbout(text)
                    }}
                    placeholder={"About Me"}
                    style={styles.input} />

                <Text style={styles.guidingText}>
                    Only communicate through the App, do not include contact details. Minimum 200 characters.
                </Text>
                <TextInputComponent
                    multiline
                    value={address}
                    onChangeText={(text) => {
                        setAddress(text)
                    }}
                    placeholder={'Address'} style={styles.input} />
                <Text style={styles.guidingText}>
                    Your address will never be shared with anyone. We will show your approximate location on profile.
                </Text>

                {/* <Text style={styles.sectionHeader}>No of children</Text>
                <TextInputComponent
                    keyboardType='numeric'
                    value={children}
                    onChangeText={(text) => {
                        setChildren(text)
                    }}
                    placeholder={"No of children"}
                    style={styles.input} /> */}
                {/* <Text style={styles.sectionHeader}>Date of birth</Text> */}
                {/* {
                    Platform.OS == "ios"
                    &&
                    <RNDateTimePicker
                        style={{
                            alignSelf: 'flex-start'
                        }}
                        value={new Date()}
                    />
                } */}
                {/* <CustomDateTimePicker
                            alignSelf='flex-start'
                            style={styles.datePicker}
                            value={slotsDate}
                            onChangeAndroid={onChangeAndroidPicker}
                            onChangeIos={onChangeIosPicker}
                        /> */}
                {/* <Text style={styles.guidingText}>
                    Ask for permission from your parents if you are under 18 years old. Babysitters must be 16 years or older.
                </Text> */}
                <View style={styles.horizontalContainer}>
                    <Text style={styles.sectionHeader}>Availability</Text>
                    <TouchableOpacity
                        onPress={toggleModal}
                        style={styles.smallButton}>
                        <Text style={styles.whiteText}><AntDesign name="pluscircle" /> Add</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
                    {slots?.length == 0
                        ?
                        <Text>You have not added your availability</Text>
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
                    {slots?.map((section, index) => {
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
                        else if ((section?.service?.includes(Number.parseInt(serviceFilterId, 10)))) {
                            console.log('Hi')
                        }
                    })}
                </ScrollView>

                <CustomButton
                    style={styles.updateButton}
                    loader={loaderButton}
                    onPressButton={onPressButton}
                    title={'Update'}
                />
            </KeyboardAwareScrollView>
    );
}

const makeStyles = (H, W) => StyleSheet.create({
    container: {
        paddingBottom: Spaces.xxl,
        padding: Spaces.sm,
        backgroundColor: 'white',
    },
    popup:
    {
        ...Shadows,
        alignSelf: 'center',
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        height: H * 0.5
    },
    contentContainerStyle:
    {
        flex: 1
    },
    modalContainer:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.BlackTransparent
    },
    secondaryModalcontainer:
    {
        //height: H * 0.7,
        width: W * 0.8,
        backgroundColor: Colors.white,
        alignItems: 'center',
        borderRadius: 8,
        padding: Spaces.xl
    },
    pickerContainer: {
        marginBottom: Spaces.lar,
    },
    slotContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: Spaces.med,
    },
    sectionHeader: {
        ...Fonts.larBold,
        marginTop: Spaces.sm,
        marginBottom: Spaces.sm,
    },
    description: {
        marginBottom: Spaces.sm,
    },
    input: {
        marginBottom: Spaces.sm,
    },
    guidingText: {
        ...Fonts.sm,
        color: Colors.gray,
        marginBottom: Spaces.sm,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: Spaces.sm,
    },
    chip: {
        marginRight: Spaces.sm,
        marginBottom: Spaces.sm,
    },
    dayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: Spaces.sm,
    },
    availabilityContainer: {
        justifyContent: 'space-between',
    },
    calendar: {
        color: Colors.blue,
        marginBottom: Spaces.sm,
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginBottom: Spaces.sm,
        alignSelf: 'center'
    },
    profilePicturePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 100 / 3,
        marginRight: Spaces.med,
        borderWidth: 0.6,
        borderColor: Colors.black
    },
    updateButton:
    {
        marginVertical: Spaces.xxl
    },

    columnWrapperStyle:
    {
        //justifyContent: 'center',
        alignItems: 'center',
        margin: Spaces.sm
    },
    text:
    {
        ...Fonts.larBold,
        marginTop: Spaces.lar
    },
    text2:
    {
        ...Fonts.larBold,
        marginBottom: Spaces.lar
    },
    weekButton:
    {
        backgroundColor: Colors.PRIMARY,
        paddingHorizontal: Spaces.lar,
        marginHorizontal: Spaces.vsm,
        borderRadius: 8,
        paddingVertical: Spaces.sm,
        width: W * 0.18,
        marginVertical: Spaces.vsm,
        alignItems: 'center'
    },
    weekButtonUnavailable:
    {
        backgroundColor: Colors.white,
        paddingHorizontal: Spaces.lar,
        marginHorizontal: Spaces.vsm,
        borderRadius: 8,
        paddingVertical: Spaces.sm,
        width: W * 0.18,
        marginVertical: Spaces.vsm,
        alignItems: 'center',
        borderWidth: 0.2,
        borderColor: Colors.PRIMARY
    },
    whiteText:
    {
        color: Colors.black
    },
    weekContainer:
    {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    datesection:
    {
        backgroundColor: Colors.grayTransparent,
        padding: Spaces.med,
        borderRadius: 10,
    },
    slotItem:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spaces.sm
    },
    horizontalContainer:
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
    itemStyleDropdown:
    {
        justifyContent: 'flex-start'
    },
    text3:
    {
        ...Fonts.larBold,
        marginVertical: Spaces.sm
    },
    slotList:
    {
        padding: Spaces.med,
        height: H * 0.2,
        borderWidth: 0.6,
        borderRadius: 8,
        width: '98%',
        borderColor: Colors.blue
    },
    slot:
    {
        borderWidth: 0.8,
        alignSelf: 'center',
        width: W * 0.18,
        alignItems: 'center',
        paddingVertical: H * 0.007,
        borderRadius: 8,
        borderColor: Colors.PRIMARY,
        marginHorizontal: W * 0.012
    },
    redSlot:
    {
        borderWidth: 0.8,
        alignSelf: 'center',
        width: W * 0.18,
        alignItems: 'center',
        paddingVertical: H * 0.007,
        borderRadius: 8,
        borderColor: 'red',
        marginHorizontal: W * 0.012
    },
    columnSlots:
    {
        // justifyContent: 'space-evenly',
        marginVertical: H * 0.005,
    },
    slotChoiceBox:
    {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: H * 0.03,
    },
    infoText:
    {
        ...Fonts.medBold,
        textDecorationLine: 'underline'
    },
    tag:
    {
        justifyContent: 'center',
        alignItems: 'center',

    },
    segment:
    {
        margin: Spaces.sm
    },
    logoutIcon: {
        height: 40,
        width: 40,
        borderRadius: 5,
        backgroundColor: Colors.PRIMARY,
    },
    logoutIconContainer:
    {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: H * 0.01,
    }

});

export default MyProfile_Sitter;