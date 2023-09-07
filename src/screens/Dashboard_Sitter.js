import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import { Shadows } from '../helper/Utils';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import { Text } from 'react-native-paper';
import ProfileOfSitter from '../components/ProfileOfSitter';

const ProfileScreen = () => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ProfileOfSitter 
            name={'John Doe'}
            location={'Dallas, Texas'}
            price={'$ 15'}
            about={'Lorem ipsum'}
            />
            <View style={styles.statsContainer}>
                <StatButton title="Total Bookings" count={20} />
                <StatButton title="Completed Bookings" count={15} />
                <StatButton title="Pending Bookings" count={5} />
            </View>
            <Text style={{ ...Fonts.larBold }}>My Availability:</Text>
            <View style={styles.boxAvailability}>
                <Text style={styles.text}>
                    You have not added your availability yet. Tap <Text style={styles.blueText}>here</Text> to add.
                </Text>
            </View>
        </ScrollView>
    );
};

const StatButton = ({ title, count }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    return (
        <TouchableOpacity style={styles.statButton}>
            <Text style={styles.statTitle}>{title}</Text>
            <Text style={styles.statCount}>{count}</Text>
        </TouchableOpacity>
    );
};


const makeStyles = (H, W) => StyleSheet.create({
    container: {
        padding: Spaces.med,
    },
    cardContainer: {
        flexWrap: 'wrap',
        backgroundColor: 'white',
        padding: Spaces.lar,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: Spaces.med,
    },
    profileImage: {
        width: H * 0.14,
        height: H * 0.14,
        borderRadius: H * 0.14 / 2,
        //marginBottom: 10,
        borderWidth: 0.6,
        borderColor: Colors.blue
    },
    name: {
        ...Fonts.larBold,
    },
    address: {
        marginBottom: 5,
    },
    hourlyPrice: {
        marginBottom: 5,
    },
    tags: {
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: '#3498db',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'center',
        marginVertical: H * 0.01
    },
    editButtonText: {
        color: 'white',
    },
    about: {
        marginTop: 10,
    },
    statsContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // marginTop: Spaces.med,
    },
    statButton: {
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        padding: 10,
        alignItems: 'center',
        //flex: 1,
        marginVertical: Spaces.sm,
    },
    statTitle: {
        color: 'white',
        fontSize: 14,
    },
    statCount: {
        color: 'white',
        fontSize: Spaces.med,
        fontWeight: 'bold',
        marginTop: 5,
    },
    tagIconContainer: {
        ...Shadows,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
        borderWidth: 0.2,
        borderRadius: 8,
        backgroundColor: Colors.white,
        padding: 2,
        borderColor: Colors.DEEP_GRAY,
        //flexWrap: 'wrap',
    },
    tagLabel: {
        marginLeft: 5,
        color: Colors.blue,
        fontSize: 14,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: Spaces.vsm,
        // width: W * 0.54,
    },
    headingText:
    {
        ...Fonts.medBold,
    },
    detailsCard:
    {
        marginHorizontal: Spaces.med,
        width: W * 0.55,
    },
    texts:
    {
        marginVertical: H * 0.002
    },
    blueText:
    {
        color: Colors.blue,
        textDecorationLine: 'underline'
    },
    text:
    {
        alignSelf: 'center',
        marginVertical: H * 0.1
    },
    boxAvailability:
    {
        borderWidth: 0.4,
        borderRadius: 8,
        margin: Spaces.sm,
        borderColor: Colors.blue
    }
});

export default ProfileScreen;
