import React, { useState, useEffect } from 'react';
import { Image, Platform, Alert, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Chip, DataTable, Text } from 'react-native-paper';
import TextInputComponent from '../components/TextInputComponent';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { handleGetRequest, handlePostRequest } from '../helper/Utils';
import CustomButton from '../components/Button';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Profile = () => {

    const [userdata, setUserdata] = useState([])
    const [loader, setLoader] = useState(false)
    const [name, setName] = useState('')
    const [lastname, setLastName] = useState('')
    const [about, setAbout] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [dob, setDob] = useState('')
    const [image, setImage] = useState({})

    useEffect(() => {
        getUserProfileData()
    }, [])


    const onPressButton = () => {
        updateUserProfileData()
    }

    const pickImage = async () => {
        try {
            const image = await launchImageLibrary()
            setImage((prev) => {
                return {
                    ...prev,
                    uri: image?.assets?.[0]?.uri,
                    name: image?.assets?.[0]?.fileName,
                    type: image?.assets?.[0]?.type
                }
            })
            console.log("Image", image)
        } catch (error) {
            Alert.alert(error)
        }

    }

    const updateUserProfileData = async () => {
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
            Alert.alert("Alert", result?.message)
        } else {
            Alert.alert("Alert", result?.message)
        }
        setLoader(false)
    }
    
    const getUserProfileData = async () => {
        const result = await handleGetRequest('profile')
        setName(result?.userDetails?.first_name)
        setAbout(result?.userDetails?.description)
        setAddress(result?.userDetails?.address)
        setPrice(JSON.stringify(result?.userDetails?.hour_price))

        console.log("RESULT===========   ", result)
        setLoader(false)
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            style={styles.container}>
            <Text style={styles.sectionHeader}>Profile Photo</Text>
            <TouchableOpacity
                onPress={pickImage}
                style={styles.profilePictureContainer}>
                {/* <View style={styles.profilePicturePlaceholder} /> */}
                <Image defaultSource={require('../assets/images/profile-user.png')}
                    source={require('../assets/images/profile-user.png')}
                    style={styles.profilePicturePlaceholder}
                />
            </TouchableOpacity>
            <View style={styles.availabilityContainer}></View>
            <TextInputComponent
                placeholder={"Name"}
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
            <Text style={styles.sectionHeader}>Experience</Text>
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
            </View>
            <Text style={styles.sectionHeader}>I'm Comforatble with</Text>
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
            </View>
            <Text style={styles.sectionHeader}>Availability</Text>

            <DataTable>
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
            </DataTable>




            <CustomButton
                // loader={loader}
                onPressButton={onPressButton}
                title={'Update'}
            />
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: Spaces.xxl,
        padding: Spaces.med,
        backgroundColor: 'white',
    },
    contentContainerStyle:
    {
        flex: 1
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
        tintColor: Colors.blue
    },
});

export default Profile;