import React, { useState, useEffect } from 'react';
import { Image, Platform, Alert, StyleSheet, View, TouchableOpacity, Modal, useWindowDimensions, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import TextInputComponent from '../components/TextInputComponent';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Shadows, handleGetRequest, handlePostRequest } from '../helper/Utils';
import CustomButton from '../components/Button';
import { launchImageLibrary } from 'react-native-image-picker';
import Loader from '../components/Loader';
import { Picker, PickerIOS } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import CloseButton from '../components/CloseButton';

const intervals = [
    { label: '1 hour', value: '1' },
    { label: '2 hours', value: '2' },
    { label: '3 hours', value: '3' },
    { label: '4 hours', value: '4' },
]

const MyProfile_Sitter = () => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    const [userdata, setUserdata] = useState(null)
    const [loader, setLoader] = useState(true)
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [about, setAbout] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [dob, setDob] = useState('')
    const [children, setChildren] = useState('')
    const [image, setImage] = useState({})
    const [loaderButton, setLoaderButton] = useState(false)
    const [showSlots, setShowSlots] = useState(false)
    const [showPickerOptions, setShowPickerOptions] = useState(false)
    /////////////////////////////////////////////////////////////////
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [slots, setSlots] = useState([


        // Add more slots as needed
    ]);

    useEffect(() => {
        getUserProfileData()
    }, [])


    const onPressButton = () => {
        if (price?.length == '0') {

        } else {
            updateUserProfileData()
        }

    }

    const pickImage = async () => {
        try {
            const image = await launchImageLibrary({ quality: 0 })
            setImage({
                uri: image?.assets?.[0]?.uri,
                name: image?.assets?.[0]?.fileName,
                type: image?.assets?.[0]?.type
            })
            console.log("Image", image)
        } catch (error) {
            Alert.alert(error)
        }
    }

    const renderSlots = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.slot}>
                <Text>{item.slot}</Text>
            </TouchableOpacity>
        )
    }

    const toggleModal = (slots) => {
        setShowSlots(prev => !prev)
        //setSlots(slots)
    }

    const updateUserProfileData = async () => {
        setLoaderButton(true)
        var formdata = new FormData()
        //  formdata.append('service_id', route?.params?.services?.id);
        formdata.append('firstName', name);
        formdata.append('lastName', lastname);
        formdata.append('hourPrice', price);
        formdata.append('noOfChildren', children);
        formdata.append('comfirtableWith', "Cooking");
        formdata.append('experience', "I smoke");
        formdata.append('address', address);
        formdata.append('dob', "2000-01-10");
        formdata.append('description', about);
        formdata.append('picture', image);
        const result = await handlePostRequest('profile_update', formdata)
        if (result?.status == '200') {
            Alert.alert("Success", result?.message)
        } else {
            Alert.alert("Error", result?.message)
        }
        setLoaderButton(false)
    }

    const getUserProfileData = async () => {
        const result = await handleGetRequest('profile')
        setName(result?.userDetails?.first_name)
        setLastName(result?.userDetails?.last_name)
        setAbout(result?.userDetails?.description)
        setAddress(result?.userDetails?.address)
        setChildren(JSON.stringify(result?.userDetails?.no_of_children))
        setPrice(JSON.stringify(result?.userDetails?.hour_price))
        setImage({ uri: `${result?.url}${result?.userDetails?.picture}` })
        setUserdata(result)
        console.log("RESULT==========>", result)
        setLoader(false)
    }

    const DateSection = ({ section }) => (
        <View style={styles.datesection}>
            <Text style={{ ...Fonts.medBold }}>{section.date}</Text>
        </View>
    );

    const SlotItem = ({ item }) => (
        <View style={styles.slotItem}>
            <Text>{item.duration}</Text>
            <Text>{item.status === 0 ? 'Available' : 'Booked'}</Text>
        </View>
    );

    const handleDateChange = (event, selected) => {
        if (event.type === 'set') {
            setSelectedDate(selected || selectedDate);
            setShowDatePicker(false);
        } else {
            setShowDatePicker(false);
        }
    };

    const handleTimeChange = (event, selected) => {
        if (event.type === 'set') {
            setSelectedTime(selected || selectedTime);
            setShowTimePicker(false);
        } else {
            setShowTimePicker(false);
        }
    };

    const onPressClose = () => {
        setShowSlots(false)
    }

    return (
        loader
            ?
            <Loader />
            :
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                style={styles.container}>
                <Modal
                    visible={showSlots}
                    transparent={true}

                >
                    <TouchableWithoutFeedback onPress={() => { }}>
                        {/* <TouchableWithoutFeedback onPress={() => setShowSlots(false)}> */}
                        <View style={styles.modalContainer}>
                            <View style={styles.secondaryModalcontainer}>
                                <CloseButton
                                    onPress={onPressClose}
                                />
                                <Text style={styles.text3}>Pick Date:</Text>
                                <TouchableOpacity style={styles.pickerContainer} onPress={() => setShowDatePicker(true)}>
                                    {/* <Text>Date: {selectedDate.toDateString()}</Text> */}
                                    {/* {showDatePicker && ( */}
                                    {(
                                        <RNDateTimePicker
                                            value={selectedDate}
                                            mode="date"
                                            onChange={handleDateChange}
                                        />
                                    )}
                                </TouchableOpacity>

                                <View style={styles.pickerContainer}>
                                    <Text style={styles.text3}>Pick Interval:</Text>
                                    <DropDownPicker
                                        value={selectedSlot}
                                        placeholder='Select duration of your slot'
                                        labelStyle={{ ...Fonts.smMedium }}
                                        open={showPickerOptions}
                                        onPress={() => setShowPickerOptions(true)}
                                        closeOnBackPressed={true}
                                        items={intervals}
                                        itemStyle={styles.itemStyleDropdown}
                                        onSelectItem={item => {
                                            setShowPickerOptions(false)
                                            setSelectedSlot(item.value)
                                        }}
                                    />

                                </View>
                                {/* <ScrollView style={styles.slotContainer}>
                                    {slots.map((slot, index) => (
                                        <Text key={index} style={styles.slotItem}>
                                            {slot}
                                        </Text>
                                    ))}
                                </ScrollView> */}

                                {showTimePicker && (
                                    <RNDateTimePicker
                                        value={selectedTime}
                                        mode="time"
                                        onChange={handleTimeChange}
                                    />
                                )}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <Text style={styles.sectionHeader}>Profile Photo</Text>
                <TouchableOpacity
                    onPress={pickImage}
                    style={styles.profilePictureContainer}>
                    {/* <View style={styles.profilePicturePlaceholder} /> */}
                    <Image defaultSource={require('../assets/images/profile-user.png')}
                        //source={require('../assets/images/profile-user.png')}
                        source={{ uri: image?.uri }}
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
                    value={address}
                    onChangeText={(text) => {
                        setAddress(text)
                    }}
                    placeholder={'Address'} style={styles.input} />
                <Text style={styles.guidingText}>
                    Your address will never be shared with anyone. We will show your approximate location on profile.
                </Text>
                <Text style={styles.sectionHeader}>Hourly Rate (Per Hour)</Text>
                <TextInputComponent
                    keyboardType='numeric'
                    value={price}
                    onChangeText={(text) => {
                        setPrice(text)
                    }}
                    placeholder={"USD ($)"}
                    style={styles.input} />
                <Text style={styles.sectionHeader}>No of children</Text>
                <TextInputComponent
                    keyboardType='numeric'
                    value={children}
                    onChangeText={(text) => {
                        setChildren(text)
                    }}
                    placeholder={"No of children"}
                    style={styles.input} />
                <Text style={styles.sectionHeader}>Date of birth</Text>
                {
                    Platform.OS == "ios"
                    &&
                    <RNDateTimePicker
                        style={{
                            alignSelf: 'flex-start'
                        }}
                        value={new Date()}
                    />
                }
                <Text style={styles.guidingText}>
                    Ask for permission from your parents if you are under 18 years old. Babysitters must be 16 years or older.
                </Text>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.sectionHeader}>Availability</Text>
                    <TouchableOpacity
                        onPress={toggleModal}
                        style={styles.smallButton}>
                        <Text style={styles.whiteText}><AntDesign name="pluscircle" /> Add</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
                    {userdata?.userSlots?.map((section, index) => (
                        <View key={index}>
                            <DateSection section={section} />
                            {section.times.map((time) => (
                                <SlotItem key={time.id} item={time} />
                            ))}
                        </View>
                    ))}
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
        padding: Spaces.med,
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
    slotItem: {
        marginBottom: Spaces.med,
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
    },
    profilePicturePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    updateButton:
    {
        marginVertical: Spaces.xxl
    },
    slot:
    {
        width: W * 0.17,
        borderColor: Colors.black,
        borderWidth: 0.2,
        paddingVertical: Spaces.med,
        borderRadius: 8,
        borderColor: Colors.PRIMARY_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Spaces.sm
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
        backgroundColor: Colors.PRIMARY_BLUE,
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
        borderColor: Colors.PRIMARY_BLUE
    },
    whiteText:
    {
        color: Colors.white
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
        backgroundColor: Colors.PRIMARY_BLUE,
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
    }

});

export default MyProfile_Sitter;