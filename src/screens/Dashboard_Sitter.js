import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6'
import Colors from '../helper/Colors';
import Spaces from '../helper/Spaces';
import Fonts from '../helper/Fonts';
import { Shadows } from '../helper/Utils';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../assets/images/client.png')} style={styles.profileImage} />
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>John Holmes</Text>
                <Text style={styles.address}>123 Main St, City, Country</Text>
                <Text style={styles.hourlyPrice}>Hourly Price: $15</Text>
                <View style={styles.tagsContainer}>
                    <TagIcon name="home-outline" label="Homesitting" />
                    <TagIcon name="baby-carriage" label="Babysitting" fontawesome={true} />
                    <TagIcon name="paw-outline" label="Petsitting" />
                </View>
                <Text style={styles.about}>
                    <Text style={styles.headingText}>
                        About: </Text>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                </Text>
            </View>

            <View style={styles.statsContainer}>
                <StatButton title="Total Bookings" count={20} />
                <StatButton title="Completed Bookings" count={15} />
                <StatButton title="Pending Bookings" count={5} />
            </View>
        </View>
    );
};

const StatButton = ({ title, count }) => {
    return (
        <TouchableOpacity style={styles.statButton}>
            <Text style={styles.statTitle}>{title}</Text>
            <Text style={styles.statCount}>{count}</Text>
        </TouchableOpacity>
    );
};

const TagIcon = ({ name, label, fontawesome = false }) => {
    return (
        <View style={styles.tagIconContainer}>
            {
                fontawesome ?
                    <FontAwesome6 name={name} size={20} color={Colors.blue} />
                    :
                    <Ionicons name={name} size={20} color={Colors.blue} />
            }

            <Text style={styles.tagLabel}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    cardContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 0.6,
        borderColor: Colors.blue
    },
    name: {
        ...Fonts.larBold,
        marginVertical: Spaces.sm
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
        left: 180,
        alignSelf: 'baseline'
        // alignSelf: 'flex-end',
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
        // marginTop: 20,
    },
    statButton: {
        backgroundColor: '#e74c3c',
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
        fontSize: 20,
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
        borderColor: Colors.DEEP_GRAY
    },
    tagLabel: {
        marginLeft: 5,
        color: Colors.blue,
        fontSize: 14,
    },
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spaces.vsm,
    },
    headingText:
    {
        ...Fonts.medBold
    }
});

export default ProfileScreen;
