import { Image, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { Shadows } from '../helper/Utils'
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import TagIcon from './TagIcon'

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
                        <TagIcon name="home" label="Homesit" />
                        <TagIcon name="baby-carriage" label="Babysit" fontawesome={true} />
                        <TagIcon name="paw" label="Petsit" />
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

export default ProfileOfSitter

const makeStyles = (H, W) => StyleSheet.create({
    container: {
        padding: Spaces.sm,
    },
    cardContainer: {
        flexWrap: 'wrap',
        padding: Spaces.lar,
        borderRadius: 10,
        marginBottom: Spaces.sm,
    },
    profileImage:{
        width: 100,
        height: 100,
        borderRadius: 100/3,
        marginRight: Spaces.sm,
        borderWidth: 0.6,
        borderColor: Colors.black
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
        // marginTop: Spaces.sm,
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
        fontSize: Spaces.sm,
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
        marginHorizontal: Spaces.sm,
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