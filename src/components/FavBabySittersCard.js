import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Spaces from '../helper/Spaces';
import Colors from '../helper/Colors';
import Fonts from '../helper/Fonts';
import AntDesign from 'react-native-vector-icons/dist/AntDesign'


const FavBabySittersCard = ({ profilePicture, name, description, hourlyPrice, onPressFavourite, isFavourite, onPressItemSelected, rating = 2 }) => {
    return (
        <TouchableOpacity
            onPress={onPressItemSelected}
            style={styles.container}>
            <Image
                defaultSource={require('../assets/images/mother.png')}
                source={{ uri: profilePicture }}
                style={styles.profilePicture} />
            <View style={styles.card}>
                <Text style={[styles.name, Fonts.larSemiBold]}>{name}</Text>
                <Text
                    numberOfLines={3}
                    style={styles.description}>{description}</Text>
                <Text >{rating}/5.0 Rating <AntDesign name="star" size={16} color={Colors.golden} /></Text>
                <Text style={[styles.price, Fonts.medMedium]}>Hourly Price: ${hourlyPrice}</Text>
            </View>

            <TouchableOpacity
                style={styles.favButton}
                onPress={onPressFavourite}>
                <Text>{
                    isFavourite == 1
                        ?
                        <AntDesign name="star" size={20} color={Colors.Secondary} />
                        :
                        <AntDesign name="staro" size={20} />
                }</Text>
            </TouchableOpacity>

        </TouchableOpacity>
    );
};

export default FavBabySittersCard;

const styles = StyleSheet.create({
    container:
    {
        flexDirection: 'row',
        //alignItems: 'center',
        padding: Spaces.lar,
        backgroundColor: Colors.white,
        marginTop: Spaces.sm,
        marginHorizontal: Spaces.sm,
        borderColor: Colors.Secondary,
        borderWidth: 0.6,
        borderRadius: 10,
        paddingBottom: Spaces.sm
    },
    profilePicture:
    {
        width: 100,
        height: 100,
        borderRadius: 100/3,
        marginRight: Spaces.sm,
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

    description:
    {
        color: Colors.gray
    },

})