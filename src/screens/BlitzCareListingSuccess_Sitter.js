import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, Image, StyleSheet, ImageBackground, Platform, Alert } from 'react-native';
import { Switch, Text, TextInput } from 'react-native-paper';
import Fonts from '../helper/Fonts';
import Spaces from '../helper/Spaces';
import CustomButton from '../components/Button';
import Colors from '../helper/Colors';
import { handlePostRequest } from '../helper/Utils';

const BlitzCareListingSuccess_Sitter = ({ navigation }) => {
    const [visibility, setVisibility] = useState(true);

    const onPressReturn = () => {
        navigation.navigate("Home")
        //navigation.navigate("JobPostings_Sitter")
        //navigation.navigate("SearchBabySitter_Parent")
    }

    const updateStatusInApi = async () => {
        var formdata = new FormData()
        formdata.append('status', '0')
        const result = await handlePostRequest('rapid_feature', formdata)
        if (result?.status == '200') {
            //Alert.alert("Update Staus in API")
            setVisibility(prev => !prev)
            navigation.goBack()
        }
        else {
            Alert.alert('Error', result?.message)
        }
    }

    const onPressNewJobs = () => {
        navigation.navigate("JobPostings_Sitter")
    }

    const onToggleSwitch = () => {
        Alert.alert('Turn Off Visibility', 'You will no longer be visible to parents looking for job. Are you sure?',
            [
                {
                    'text': 'Yes',
                    'onPress': () => {
                        updateStatusInApi()
                    }
                },
                {
                    'text': 'No',
                }

            ]
        )
    }

    return (
        <ImageBackground
            style={styles.container}
            source={require('../assets/images/background.png')}>
            {/* <Image
                style={styles.checkImage}
                source={require('../assets/images/checklist.png')} /> */}
            <View style={styles.switchContainer}>
                <Text style={[styles.greeting1, { width: null }]}>Visibility: </Text>
                <Switch
                    color={Colors.Secondary}
                    value={visibility}
                    onValueChange={onToggleSwitch}
                />
            </View>
            <Text style={styles.guidingText}>When this is 'ON' you will be visible to those looking for bookings today instantly.{"\n"}You'll be notified about new bookings and you can also check New Jobs section </Text>

            <CustomButton title={"Return to Dashboard"}
                style={styles.button}
                onPressButton={onPressReturn}
            />
            <CustomButton title={"New Jobs"}
                //style={styles.button}
                onPressButton={onPressNewJobs}
            />
            <Text style={[styles.greeting1, styles.noteText]}>{`\n`}Note: If you receive a booking, it's crucial to complete it to maintain your rating.</Text>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center"
    },
    greeting1:
    {
        //textAlign: 'center',
        ...Fonts.larSemiBold,
        alignSelf: 'center',
        width: "93%",
    },
    checkImage:
    {
        alignSelf: 'center',
        height: '40%',
        aspectRatio: 1,
        resizeMode: Platform.OS == "ios" ? "cover" : "contain",
    },
    button:
    {
        marginTop: '10%'
    },
    switchContainer:
    {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        margin: Spaces.med,
        marginBottom: 0,
        marginTop: '20%',
    },
    guidingText: {
        ...Fonts.sm,
        color: Colors.gray,
        marginBottom: Spaces.sm,
        padding: Spaces.med,
        paddingTop: Spaces.sm
    },
    noteText:
    {
        color: 'red',
        position: 'absolute',
        bottom: Spaces.med,
        textAlign: 'center'
    }
});

export default BlitzCareListingSuccess_Sitter;
