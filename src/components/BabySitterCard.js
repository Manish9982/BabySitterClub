import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';

const BabySitterCard = ({ profilePicture, name, description, hourlyPrice, isFavourite, onPressFavourite }) => {
    return (
        <View style={styles.container}>
            <Image
                defaultSource={require('../assets/images/mother.png')}
                source={{ uri: profilePicture }}
                style={styles.profilePicture} />
            <View style={styles.card}>
                <Text style={[styles.name, Fonts.larSemiBold]}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>Hourly Price: ${hourlyPrice}</Text>
            </View>
            <TouchableOpacity
                style={styles.favButton}
                onPress={onPressFavourite}>
                <Text>{isFavourite ? <AntDesign name="star" size={20} color={Colors.blue} /> : <AntDesign name="staro" size={20} />}</Text>
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
    profilePicture:
    {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: Spaces.med,
        borderWidth:0.6,
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
        color: Colors.gray
    },
    favButton:
    {
        alignSelf: 'flex-start'
    }
})