import React, { useState, useEffect } from 'react';
import { Image, Platform, Alert, StyleSheet, View, TouchableOpacity, Modal, useWindowDimensions, FlatList } from 'react-native';
import { Chip, DataTable, Text } from 'react-native-paper';
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
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';

const Profile = () => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    const SlotsData = {
        days: [
            {
                day: 'Monday',
                available: true,
                slots:
                    [
                        {
                            id: 1,
                            slot: '09:00',
                            active: true,
                            isSelected: true
                        },
                        {
                            id: 2,
                            slot: '10:00',
                            active: true,
                            isSelected: false
                        },
                        {
                            id: 3,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 4,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 5,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 6,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 7,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                    ]
            },
            {
                day: 'Tuesday',
                available: false,
                slots:
                    [
                        {
                            id: 1,
                            slot: '09:00',
                            active: true,
                            isSelected: true
                        },
                        {
                            id: 2,
                            slot: '10:00',
                            active: true,
                            isSelected: false
                        },
                        {
                            id: 3,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 4,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 5,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 6,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 7,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                    ]
            },
            {
                day: 'Wednesday',
                available: true,
                slots:
                    [
                        {
                            id: 1,
                            slot: '09:00',
                            active: true,
                            isSelected: true
                        },
                        {
                            id: 2,
                            slot: '10:00',
                            active: true,
                            isSelected: false
                        },
                        {
                            id: 3,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 4,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 5,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 6,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 7,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                    ]
            },
            {
                day: 'Thursday',
                available: true,
                slots:
                    [
                        {
                            id: 1,
                            slot: '09:00',
                            active: true,
                            isSelected: true
                        },
                        {
                            id: 2,
                            slot: '10:00',
                            active: true,
                            isSelected: false
                        },
                        {
                            id: 3,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 4,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 5,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 6,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 7,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                    ]
            },
            {
                day: 'Friday',
                available: false,
                slots:
                    [
                        {
                            id: 1,
                            slot: '09:00',
                            active: true,
                            isSelected: true
                        },
                        {
                            id: 2,
                            slot: '10:00',
                            active: true,
                            isSelected: false
                        },
                        {
                            id: 3,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 4,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 5,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 6,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 7,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                    ]
            },
            {
                day: 'Saturday',
                available: true,
                slots:
                    [
                        {
                            id: 1,
                            slot: '09:00',
                            active: true,
                            isSelected: true
                        },
                        {
                            id: 2,
                            slot: '10:00',
                            active: true,
                            isSelected: false
                        },
                        {
                            id: 3,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 4,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 5,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 6,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 7,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                    ]
            },
            {
                day: 'Sunday',
                available: true,
                slots:
                    [
                        {
                            id: 1,
                            slot: '09:00',
                            active: true,
                            isSelected: true
                        },
                        {
                            id: 2,
                            slot: '10:00',
                            active: true,
                            isSelected: false
                        },
                        {
                            id: 3,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 4,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 5,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 6,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                        {
                            id: 7,
                            slot: '11:00',
                            active: false,
                            isSelected: false
                        },
                    ]
            },
        ]

    }


    const [userdata, setUserdata] = useState(null)
    const [loader, setLoader] = useState(true)
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [about, setAbout] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [dob, setDob] = useState('')
    const [image, setImage] = useState({})
    const [loaderButton, setLoaderButton] = useState(false)
    const [showSlots, setShowSlots] = useState(true)

    useEffect(() => {
        getUserProfileData()
    }, [])


    const onPressButton = () => {
        updateUserProfileData()
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
            <View style={styles.slot}>
                <Text>{item.slot}</Text>
            </View>
        )
    }

    const renderDays = (item, index) => {
        return (
            <TouchableOpacity
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
        formdata.append('noOfChildren', "2");
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
                style={styles.container}>
                <Modal
                    //visible={showSlots}
                    visible={finalPropsSelectorFactory}
                    transparent={true}

                >
                    <View style={styles.modalContainer}>
                        <View style={styles.popup}>
                            <Text style={styles.text}>Slots:</Text>
                            <Text style={styles.text2}>(Monday)</Text>
                            <FlatList
                                // horizontal
                                numColumns={3}
                                data={SlotsData?.slots}
                                renderItem={renderSlots}
                                keyExtractor={(item, index) => `${item?.id}`}
                                columnWrapperStyle={styles.columnWrapperStyle}
                            />
                        </View>
                    </View>
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
                    value={`$ ${price}`}
                    onChangeText={(text) => {
                        setPrice(text)
                    }}
                    placeholder={"USD"}
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
                {/* <Text style={styles.sectionHeader}>Experience</Text>
                <View style={styles.chipContainer}>
                    <Chip
                        selected={true}
                        style={styles.chip} selectedColor={Colors.blue} onPress={() => { }}>

                        I have first aid certification
                    </Chip>
                    <Chip
                        style={styles.chip} selectedColor={Colors.blue} onPress={() => { }}>
                        I smoke
                    </Chip>
                    <Chip
                        style={styles.chip} selectedColor={Colors.blue} onPress={() => { }}>
                        I have children
                    </Chip>
                    <Chip
                        style={styles.chip} selectedColor={Colors.blue} onPress={() => { }}>
                        I have a driving license
                    </Chip>
                </View> */}
                {/* <Text style={styles.sectionHeader}>I'm Comforatble with</Text>
                <View style={styles.chipContainer}>
                    <Chip selected style={styles.chip} selectedColor={Colors.blue} onPress={() => { }}>
                        Pets
                    </Chip>
                    <Chip
                        style={styles.chip} selectedColor={Colors.blue} onPress={() => { }}>
                        Cooking
                    </Chip>
                    <Chip
                        style={styles.chip} selectedColor={Colors.blue} onPress={() => { }}>
                        Chores
                    </Chip>
                    <Chip
                        selected
                        style={styles.chip} selectedColor={Colors.blue} onPress={() => { }}>
                        Homework assistance
                    </Chip>
                </View> */}
                <Text style={styles.sectionHeader}>Availability</Text>

                {/* <DataTable>
                    <DataTable.Header>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title>Mo</DataTable.Title>
                        <DataTable.Title>Tu</DataTable.Title>
                        <DataTable.Title>We</DataTable.Title>
                        <DataTable.Title>Th</DataTable.Title>
                        <DataTable.Title>Fr</DataTable.Title>
                        <DataTable.Title>Sa</DataTable.Title>
                        <DataTable.Title>Su</DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                        <DataTable.Title>Morning</DataTable.Title>
                        <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Title>Afternoon</DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                        <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Title>Evening</DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                        <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Title textStyle={{ fontSize: 10 }}>Night</DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                        <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                        <DataTable.Title><AntDesign name="checkcircle" /></DataTable.Title>
                        <DataTable.Title></DataTable.Title>
                    </DataTable.Row>
                </DataTable> */}
                <View style={styles.weekContainer}>
                    {SlotsData?.days?.map((item, index) => renderDays(item, index))}
                </View>

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
        borderWidth:0.2,
        borderColor:Colors.PRIMARY_BLUE
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

export default Profile;