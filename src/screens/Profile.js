import React, { } from 'react';
import { Image, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Chip, DataTable, Text } from 'react-native-paper';
import TextInputComponent from '../components/TextInputComponent';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import RNDateTimePicker from '@react-native-community/datetimepicker';

const Profile = () => {

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            style={styles.container}>
            <Text style={styles.sectionHeader}>Profile Photo</Text>
            <View style={styles.profilePictureContainer}>
                {/* <View style={styles.profilePicturePlaceholder} /> */}
                <Image defaultSource={require('../assets/images/profile-user.png')}
                    source={require('../assets/images/profile-user.png')}
                    style={styles.profilePicturePlaceholder}
                />
            </View>
            <View style={styles.availabilityContainer}></View>
            <TextInputComponent placeholder={"Name"} style={styles.input} />
            <Text style={styles.sectionHeader}>About Me</Text>
            <Text style={styles.description}>
                Tell a little about yourself, so families can get to know you.
            </Text>
            <TextInputComponent placeholder={"About Me"} style={styles.input} />
            <Text style={styles.guidingText}>
                Only communicate through the App, do not include contact details. Minimum 200 characters.
            </Text>
            <TextInputComponent placeholder={'Address'} style={styles.input} />
            <Text style={styles.guidingText}>
                Your address will never be shared with anyone. We will show your approximate location on profile.
            </Text>
            <Text style={styles.sectionHeader}>Hourly Rate (Per Hour)</Text>
            <TextInputComponent placeholder={"INR"} style={styles.input} />
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
                <Chip selected style={styles.chip} selectedColor={Colors.blue} onPress={() => console.log('Pressed')}>
                    I have first aid certification
                </Chip>
                <Chip
                    style={styles.chip} selectedColor={Colors.blue} onPress={() => console.log('Pressed')}>
                    I smoke
                </Chip>
                <Chip
                    style={styles.chip} selectedColor={Colors.blue} onPress={() => console.log('Pressed')}>
                    I have children
                </Chip>
                <Chip
                    style={styles.chip} selectedColor={Colors.blue} onPress={() => console.log('Pressed')}>
                    I have a driving license
                </Chip>
            </View>
            <Text style={styles.sectionHeader}>I'm Comforatble with</Text>
            <View style={styles.chipContainer}>
                <Chip selected style={styles.chip} selectedColor={Colors.blue} onPress={() => console.log('Pressed')}>
                    Pets
                </Chip>
                <Chip
                    style={styles.chip} selectedColor={Colors.blue} onPress={() => console.log('Pressed')}>
                    Cooking
                </Chip>
                <Chip
                    style={styles.chip} selectedColor={Colors.blue} onPress={() => console.log('Pressed')}>
                    Chores
                </Chip>
                <Chip
                    selected
                    style={styles.chip} selectedColor={Colors.blue} onPress={() => console.log('Pressed')}>
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
        </ScrollView>
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
