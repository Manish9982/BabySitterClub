import React, { useState, useEffect } from 'react';
import { Image, Platform, Alert, StyleSheet, View, TouchableOpacity, Modal, useWindowDimensions, FlatList, TouchableWithoutFeedback, ImageBackground } from 'react-native';
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
// import { launchImageLibrary } from 'react-native-image-picker';
import Loader from '../components/Loader';
import { setIsProfileCompleted } from '../redux/GlobalSlice';
import { useDispatch } from 'react-redux';

const MyProfile_Parent = () => {

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
    const [slots, setSlots] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        getUserProfileData()
    }, [])

    const onPressButton = () => {
        if (price?.length == '0') {
            Alert.alert("Warning", "Hourly price must be more than 0")

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
        setSlots(slots)
    }

    const renderDays = (item, index) => {
        return (
            <TouchableOpacity
                onPress={() => toggleModal(item?.slots)}
                key={index}
                style={item?.available ? styles.weekButton : styles.weekButtonUnavailable}
            >
                <Text style={item?.available && styles.whiteText}>{item?.day?.substr(0, 3)}</Text></TouchableOpacity>
        )

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
            dispatch(setIsProfileCompleted(true))
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

    return (
        loader
            ?
            <Loader />
            :

            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
            >
                <ImageBackground
                    style={{ flex: 1 }}
                    source={require('../assets/images/background.png')}
                >
                    <Modal
                        visible={showSlots}
                        transparent={true}

                    >
                        <TouchableWithoutFeedback onPress={() => setShowSlots(false)}>
                            <View style={styles.modalContainer}>
                                <View style={styles.popup}>
                                    <Text style={styles.text}>Slots:</Text>
                                    <Text style={styles.text2}>(Monday)</Text>
                                    <FlatList
                                        // horizontal
                                        numColumns={3}
                                        data={slots}
                                        renderItem={renderSlots}
                                        keyExtractor={(item, index) => `${item?.id}`}
                                        columnWrapperStyle={styles.columnWrapperStyle}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
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
                        Tell a little about yourself, so Sitters can get to know you.
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
                    <Text style={styles.sectionHeader}>Hourly rate for babysitting</Text>
                    <TextInputComponent
                        keyboardType='numeric'
                        maxlength={3}

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

                    <CustomButton
                        style={styles.updateButton}
                        loader={loaderButton}
                        onPressButton={onPressButton}
                        title={'Update'}
                    />
                </ImageBackground>
            </KeyboardAwareScrollView>
    );
}

const makeStyles = (H, W) => StyleSheet.create({
    container: {
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
    sectionHeader: {
        ...Fonts.larBold,
        margin: Spaces.sm,
        marginBottom: Spaces.sm,
    },
    description: {
        margin: Spaces.sm,
    },
    input: {
        marginBottom: Spaces.sm,
    },
    guidingText: {
        ...Fonts.sm,
        color: Colors.gray,
        margin: Spaces.sm,
        marginTop: 0,
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
        borderColor: Colors.PRIMARY,
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
        color: Colors.white
    },
    weekContainer:
    {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }

});

export default MyProfile_Parent;