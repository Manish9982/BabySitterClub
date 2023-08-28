import { Image, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { Shadows } from '../helper/Utils'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Ionicons from 'react-native-vector-icons/dist/Ionicons'
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6'

const ProfileOfSitter = ({ imageUrl, name, roles, location, price, about }) => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)

    return (
        <View style={styles.cardContainer}>
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Image source={require('../assets/images/client.png')} style={styles.profileImage} />
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}><AntDesign name="edit" /> Edit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.detailsCard}>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.tagsContainer}>
                        <TagIcon name="home-outline" label="Homesit" />
                        <TagIcon name="baby-carriage" label="Babysit" fontawesome={true} />
                        <TagIcon name="paw-outline" label="Petsit" />
                    </View>
                    {/* <Text style={styles.address}>123 Main St, City, Country</Text> */}
                    <Text style={styles.texts}>
                        <Text style={styles.headingText}>Location: </Text>
                        <Text>{location}</Text>
                    </Text>
                    <Text style={styles.texts}>
                        <Text style={styles.headingText}>
                            Hourly Price: </Text>
                        <Text>
                           {price}
                        </Text>
                    </Text>
                    <Text style={styles.texts}>
                        <Text style={styles.headingText}>
                            About: </Text>
                        <Text>
                            {about}
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

const TagIcon = ({ name, label, fontawesome = false }) => {
    const H = useWindowDimensions().height
    const W = useWindowDimensions().width
    const styles = makeStyles(H, W)
    return (
        <View style={styles.tagIconContainer}>
            {
                fontawesome ?
                    <FontAwesome6 name={name} size={Spaces.lar} color={Colors.blue} />
                    :
                    <Ionicons name={name} size={Spaces.lar} color={Colors.blue} />
            }

            {/* <Text style={styles.tagLabel}>{label}</Text> */}
        </View>
    );
};

export default ProfileOfSitter

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
        backgroundColor: Colors.PRIMARY_BLUE,
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