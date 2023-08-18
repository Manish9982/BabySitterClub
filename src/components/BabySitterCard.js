import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';

const BabySitterCard = ({ profilePicture, name, description, hourlyPrice, isFavourite, onPressFavourite, onPressItemSelected, }) => {
    return (
        <View style={styles.container}

        >
            <Image
                defaultSource={require('../assets/images/mother.png')}
                source={{ uri: profilePicture }}
                style={styles.profilePic} />
            <TouchableOpacity
                onPress={onPressItemSelected}

                style={styles.card}>
                <Text style={[styles.name, Fonts.larSemiBold]}>{name}</Text>
                <Text numberOfLines={2}
                    ellipsizeMode='tail'

                    style={[styles.description, Fonts.smMedium]}>{description}

                </Text>
                <Text style={[styles.price, Fonts.medMedium]}>Hourly Price: ${hourlyPrice}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.favButton}
                onPress={onPressFavourite}>
                <Text>{isFavourite == 1 ? <AntDesign name="star" size={20} color={Colors.blue} />
                    : <AntDesign name="staro" size={20} />}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BabySitterCard;

const styles = StyleSheet.create({
    container:
    {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spaces.lar,
        backgroundColor: Colors.white,
        margin: Spaces.sm,
        borderColor: Colors.blue,
        borderWidth: 0.6,
        borderRadius: 10
    },
    profilePic:
    {
        width: 75,
        height: 75,
        borderRadius: 20,
        marginRight: Spaces.med,
        borderWidth: 0.6,
        borderColor: Colors.black
    },
    card:
    {
        flex: 1,
    },
    name:
    {

    },
    price:
    {
        marginTop: 8
    },
    description:
    {
        color: Colors.gray,

    },
    favButton:
    {
        alignSelf: 'flex-start'
    }
})