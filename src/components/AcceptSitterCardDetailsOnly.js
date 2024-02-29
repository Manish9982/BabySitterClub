import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';
import TagIcon from './TagIcon';

const AcceptSitterCardDetailsOnly = ({ profilePicture, name, description, priceOffered, isFavourite, onPressFavourite, onPressItemSelected, rating = 0, serviceIds, onAccept, onReject, onClose, flag = 0, baseUrl }) => {

    const W = useWindowDimensions().width
    const styles = makeStyles(W)

    const services = flag == 0 ? serviceIds?.split(",").map(Number) : [1, 2, 3]
    const handleAccept = () => {
        onAccept(name); // Pass the name of the babysitter to the parent component on accept
    };

    const handleReject = () => {
        onReject(name); // Pass the name of the babysitter to the parent component on reject
    };

    const handleCloseButton = () => {
        onClose()
    }

    return (
        <View
            //onPress={onPressItemSelected}
            style={styles.container}>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseButton}>
                <AntDesign name="close" size={Spaces.xxl} color="red" />
            </TouchableOpacity>
            <Image
                defaultSource={require('../assets/images/mother.png')}
                source={{ uri: `${profilePicture}` }}
                style={styles.profilePic} />
            <View
                style={styles.card}>
                <Text style={[styles.name, Fonts.larSemiBold]}>{name}</Text>
                <View style={styles.profileBadgesContainer}>
                    {
                        (services?.includes(1) && flag == 0)
                        &&
                        <TagIcon name="baby-carriage" label="Babysit" fontawesome={true} style={styles.tag} color={Colors.Secondary} />
                    }
                    {
                        (services?.includes(2) && flag == 0)
                        &&
                        <TagIcon name="paw" label="Petsit" style={styles.tag} color={Colors.Secondary} />
                    }
                    {
                        (services?.includes(3) && flag == 0)
                        &&
                        <TagIcon name="home" label="Homesit" style={styles.tag} color={Colors.Secondary} />
                    }
                </View>
                <Text
                    //ellipsizeMode='tail'
                    //numberOfLines={3}
                    style={[styles.description, Fonts.smMedium]}>{description}
                </Text>
                <Text>Rating: {rating}/5.0 <AntDesign name="star" size={16} color={Colors.golden} /></Text>
                <Text style={[styles.price, Fonts.medMedium]}>Price offered: ${priceOffered}/Hr</Text>
            </View>
        </View>
    );
};

export default AcceptSitterCardDetailsOnly;

const makeStyles = (W) => StyleSheet.create({
    container:
    {
        //flexDirection: 'row',
        alignItems: 'center',
        padding: Spaces.lar,
        backgroundColor: Colors.white,
        margin: Spaces.sm,
        borderColor: Colors.Secondary,
        borderWidth: 0.6,
        borderRadius: 10
    },
    profilePic:
    {
        width: 150,
        height: 150,
        borderRadius: 20,
        marginRight: Spaces.sm,
        borderWidth: 0.6,
        borderColor: Colors.black
    },
    card:
    {

    },
    name:
    {
        alignSelf: 'center',
        marginVertical: Spaces.sm
    },
    price:
    {
        marginVertical: Spaces.med
    },
    description:
    {
        marginVertical: Spaces.med,
        color: Colors.gray,
        width: W * 0.65,
    },
    tag:
    {
        marginHorizontal: Spaces.sm,
        marginVertical: Spaces.vsm,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileBadgesContainer:
    {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    closeButton:
    {
        position: 'absolute',
        right: 4,
        top: 4,
    }
})
