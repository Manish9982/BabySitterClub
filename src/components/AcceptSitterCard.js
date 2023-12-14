import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';
import TagIcon from './TagIcon';

const AcceptSitterCard = ({ profilePicture, name, description, priceOffered, isFavourite, onPressFavourite, onPressItemSelected, rating = 0, serviceIds, onAccept, onReject }) => {

    const W = useWindowDimensions().width
    const styles = makeStyles(W)

    const services = serviceIds?.split(",").map(Number)
    const handleAccept = () => {
        onAccept(name); // Pass the name of the babysitter to the parent component on accept
    };

    const handleReject = () => {
        onReject(name); // Pass the name of the babysitter to the parent component on reject
    };
    return (
        <TouchableOpacity
            onPress={onPressItemSelected}
            style={styles.container}>
            <Image
                defaultSource={require('../assets/images/mother.png')}
                source={{ uri: profilePicture }}
                style={styles.profilePic} />
            <View
                style={styles.card}>
                <Text style={[styles.name, Fonts.larSemiBold]}>{name}</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        services?.includes(1)
                        &&
                        <TagIcon name="baby-carriage" label="Babysit" fontawesome={true} style={styles.tag} color={Colors.Secondary} />
                    }
                    {
                        services?.includes(2)
                        &&
                        <TagIcon name="paw" label="Petsit" style={styles.tag} color={Colors.Secondary} />
                    }
                    {
                        services?.includes(3)
                        &&
                        <TagIcon name="home" label="Homesit" style={styles.tag} color={Colors.Secondary} />
                    }

                </View>
                <Text
                    ellipsizeMode='tail'
                    numberOfLines={3}
                    style={[styles.description, Fonts.smMedium]}>{description}

                </Text>
                <Text>Rating: {rating}/5.0 <AntDesign name="star" size={16} color={Colors.golden} /></Text>
                <Text style={[styles.price, Fonts.medMedium]}>Price offered: ${priceOffered}</Text>
                <Text>Accept: </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity onPress={handleAccept} style={{ backgroundColor: 'green', height: 40, width: 40, borderRadius: 40 / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text><AntDesign name={'check'} color={Colors.white} /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleReject} style={{ backgroundColor: 'red', height: 40, width: 40, borderRadius: 40 / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text><AntDesign name={'close'} color={Colors.white} /></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default AcceptSitterCard;

const makeStyles = (W) => StyleSheet.create({
    container:
    {
        flexDirection: 'row',
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
        width: 75,
        height: 75,
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

    },
    price:
    {

    },
    description:
    {
        color: Colors.gray,
        width: W * 0.65,
    },
    tag:
    {
        marginHorizontal: Spaces.sm,
        marginVertical: Spaces.vsm,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
